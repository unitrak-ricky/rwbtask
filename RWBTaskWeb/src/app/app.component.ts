import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RwbtaskService } from './rwbtask.service';
import { ChannelService, ConnectionState } from './channel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    title = 'RWB Test Task';
    connectionState$: Observable<string>

    constructor( 
      private rwbTastService: RwbtaskService,
      private channelService: ChannelService
    ){
      // Wire up signalr observables
      //
      this.connectionState$ = this.channelService.connectionState$
          .map((state: ConnectionState) => { return ConnectionState[state]; });

      this.channelService.error$.subscribe(
          (error: any) => { console.warn(error); },
          (error: any) => { console.error("errors$ error", error); }
      );

      // Wire up a handler for the starting$ observable to log the
      //  success/fail result
      //
      this.channelService.starting$.subscribe(
          () => { console.log("signalr service has been started"); },
          () => { console.warn("signalr service failed to start!"); }
      );
      
    }

    ngOnInit() {
      // Start the connection up!
      //
      console.log("Starting the channel service");
      this.channelService.start();
  }
}


