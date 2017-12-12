import { Injectable , Inject} from '@angular/core';
import {Subject} from "rxjs/Subject";  
import {Observable} from "rxjs/Observable";

export class SignalrWindow extends Window {  
  $: any;
}

export enum ConnectionState {  
  Connecting = 1,
  Connected = 2,
  Reconnecting = 3,
  Disconnected = 4
}

export class RWBTaskConfig {  
  url: string;
  hubName: string;
  channel: string;
}

export class RWBTaskEvent {  
  Name: string;
  ChannelName: string;
  Timestamp: Date;
  Data: any;
  Json: string;

  constructor() {
      this.Timestamp = new Date();
  }
}

class RWBTaskSubject {  
  subject: Subject<RWBTaskEvent>;
  channel: string;
}

@Injectable() export class RwbsignalrService {

  starting$: Observable<any>;
  connectionState$: Observable<ConnectionState>;
  error$: Observable<string>;

  private connectionStateSubject = new Subject<ConnectionState>();
  private startingSubject = new Subject<any>();
  private errorSubject = new Subject<any>();

  private hubConnection: any;
  private hubProxy: any;

  private subjects = new Array<RWBTaskSubject>();

  constructor(
    @Inject(SignalrWindow) private window: SignalrWindow,
    @Inject("rwbsignalr.config") private rwbsignalrConfig: RWBTaskConfig
  ) { 

    if (this.window.$ === undefined || this.window.$.hubConnection === undefined) {
      throw new Error("Variable '$' or .hubConnection() not defined.Missing jquery/SignalR scripts");
    }

    this.connectionState$ = this.connectionStateSubject.asObservable();
    this.error$ = this.errorSubject.asObservable();
    this.starting$ = this.startingSubject.asObservable();

    this.hubConnection = this.window.$.hubConnection();
    this.hubConnection.url = rwbsignalrConfig.url;
    this.hubProxy = this.hubConnection.createHubProxy(rwbsignalrConfig.hubName);


    this.hubConnection.stateChanged((state: any) => {
      let newState = ConnectionState.Connecting;
      debugger;
      switch (state.newState) {
          case this.window.$.signalR.connectionState.connecting:
              newState = ConnectionState.Connecting;
              break;
          case this.window.$.signalR.connectionState.connected:
              newState = ConnectionState.Connected;
              break;
          case this.window.$.signalR.connectionState.reconnecting:
              newState = ConnectionState.Reconnecting;
              break;
          case this.window.$.signalR.connectionState.disconnected:
              newState = ConnectionState.Disconnected;
              break;
      }

      this.connectionStateSubject.next(newState);
    });

    this.hubConnection.error((error: any) => {
      debugger;
      this.errorSubject.next(error);
    });

    this.hubProxy.on('hello', () => {
        debugger;
        console.log('hello world from web api');
    });

    this.hubProxy.on("onEvent", (channel: string, ev: RWBTaskEvent) => {
      debugger;
      //console.log(`onEvent - ${channel} channel`, ev);

      // This method acts like a broker for incoming messages. We 
      //  check the interal array of subjects to see if one exists
      //  for the channel this came in on, and then emit the event
      //  on it. Otherwise we ignore the message.
      //
      let channelSub = this.subjects.find((x: RWBTaskSubject) => {
          return x.channel === channel;
      }) as RWBTaskSubject;

      // If we found a subject then emit the event on it
      //
      if (channelSub !== undefined) {
          return channelSub.subject.next(ev);
      }
    });



  } //end of constructor

  start(): void {
    // Now we only want the connection started once, so we have a special
    //  starting$ observable that clients can subscribe to know know if
    //  if the startup sequence is done.
    //
    // If we just mapped the start() promise to an observable, then any time
    //  a client subscried to it the start sequence would be triggered
    //  again since it's a cold observable.
    //
    this.hubConnection.start()
        .done(() => {
          debugger;
          this.startingSubject.next();
        })
        .fail((error: any) => {
            this.startingSubject.error(error);
        });

    
  } //end of start

  sub(channel: string): Observable<RWBTaskEvent> {
    
            // Try to find an observable that we already created for the requested 
            //  channel
            //
            let channelSub = this.subjects.find((x: RWBTaskSubject) => {
                return x.channel === channel;
            }) as RWBTaskSubject;
    
            // If we already have one for this event, then just return it
            //
            if (channelSub !== undefined) {
                console.log(`Found existing observable for ${channel} channel`)
                return channelSub.subject.asObservable();
            }
    
            //
            // If we're here then we don't already have the observable to provide the
            //  caller, so we need to call the server method to join the channel 
            //  and then create an observable that the caller can use to received
            //  messages.
            //
    
            // Now we just create our internal object so we can track this subject
            //  in case someone else wants it too
            //
            channelSub = new RWBTaskSubject();
            channelSub.channel = channel;
            channelSub.subject = new Subject<RWBTaskEvent>();
            this.subjects.push(channelSub);
    
            // Now SignalR is asynchronous, so we need to ensure the connection is
            //  established before we call any server methods. So we'll subscribe to 
            //  the starting$ stream since that won't emit a value until the connection
            //  is ready
            //
            this.starting$.subscribe(() => {
                this.hubProxy.invoke("Subscribe", channel)
                    .done(() => {
                        console.log(`Successfully subscribed to ${channel} channel`);
                    })
                    .fail((error: any) => {
                        channelSub.subject.error(error);
                    });
            },
                (error: any) => {
                    channelSub.subject.error(error);
                });
    
            return channelSub.subject.asObservable();
    } // end of sub

    publish(ev: RWBTaskEvent): void {
      this.hubProxy.invoke("Publish", ev);
    }




}
