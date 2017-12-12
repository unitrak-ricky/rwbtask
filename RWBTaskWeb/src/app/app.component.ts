import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { RwbtaskService } from './rwbtask.service';
import { RwbsignalrService, ConnectionState } from './rwbsignalr.service';

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
      private rwbSignalrService: RwbsignalrService
    ){

      
    }

    ngOnInit() {
      // Start the connection up!
      //
      console.log("Starting the channel service");

      this.rwbSignalrService.start();
  }
}


