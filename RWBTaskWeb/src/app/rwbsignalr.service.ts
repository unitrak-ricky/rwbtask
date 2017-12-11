import { Injectable } from '@angular/core';
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

export class RwbsignalrConfig {  
  url: string;
  hubName: string;
  channel: string;
}

export class RwbsignalrEvent {  
  Name: string;
  Timestamp: Date;
  Json: string;
  ChannelName: string;
  constructor() {
      this.Timestamp = new Date();
  }
}

class RwbsignalrSubject {  
  subject: Subject<RwbsignalrEvent>;
  channel: string;
}

@Injectable()
export class RwbsignalrService {

  starting$: Observable<any>;
  connectionState$: Observable<ConnectionState>;
  error$: Observable<string>;

  private connectionStateSubject = new Subject<ConnectionState>();
  private startingSubject = new Subject<any>();
  private errorSubject = new Subject<any>();

  private hubConnection: any;
  private hubProxy: any;

  private subjects = new Array<RwbsignalrSubject>();

  constructor(
    @Inject(SignalrWindow) private window: SignalrWindow,
    @Inject("rwbsignalr.config") private rwbsignalrConfig: RwbsignalrConfig
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
      this.errorSubject.next(error);
    });

    this.hubProxy.on('hello', () => {
        debugger;
        console.log('hello world from web api');
    });

    this.hubProxy.on("onEvent", (channel: string, ev: RwbsignalrEvent) => {
      debugger;
      //console.log(`onEvent - ${channel} channel`, ev);

      // This method acts like a broker for incoming messages. We 
      //  check the interal array of subjects to see if one exists
      //  for the channel this came in on, and then emit the event
      //  on it. Otherwise we ignore the message.
      //
      let channelSub = this.subjects.find((x: RwbsignalrSubject) => {
          return x.channel === channel;
      }) as RwbsignalrSubject;

      // If we found a subject then emit the event on it
      //
      if (channelSub !== undefined) {
          return channelSub.subject.next(ev);
      }
  });




  }

}
