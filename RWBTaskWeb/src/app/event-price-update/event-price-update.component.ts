import { Component, OnInit, Input } from '@angular/core';
import { Http, Response } from '@angular/http';

import { RwbsignalrService, RWBTaskEvent } from '../rwbsignalr.service';

class StatusEvent {
  State: string;
  PercentComplete: number;
}

@Component({
  selector: 'price-indicator',
  template: '<i class="glyphicon glyphicon-bell {{cssName}}"></i>'
})

export class EventPriceUpdateComponent implements OnInit {
  @Input() eventName: string;
  @Input() apiUrl: string;

  taskEvent: any;
  cssName  = "green";
  messages = "";

  private channel = "tasks";

  constructor(
    private http: Http,
    private rwbSignalrService: RwbsignalrService
  ) {

  }

  ngOnInit() {
    this.rwbSignalrService.sub(this.channel).subscribe(
      (x: RWBTaskEvent) => {
          debugger;
          switch (x.Name) {
              case this.eventName: { this.appendStatusUpdate(x); }
          }
      },
      (error: any) => {
          console.warn("Attempt to join channel failed!", error);
      }
    )

    this.callApi();
  }

  private appendStatusUpdate(ev:RWBTaskEvent): void {
    
    let date = new Date();
    switch (ev.Data.State) {
        case "starting": {
            this.messages = `${date.toLocaleTimeString()} : starting\n` + this.messages;
            break;
        }

        case "complete": {
            this.messages = `${date.toLocaleTimeString()} : complete\n` + this.messages;
            break;
        }

        default: {
            this.messages = `${date.toLocaleTimeString()} : ${ev.Data.State} : ${ev.Data.PercentComplete} % complete\n` + this.messages;
        }
    }
}

callApi() {
    this.http.get(this.apiUrl)
        .map((res: Response) => res.json())
        .subscribe((message: string) => { console.log(message); });
}

}
