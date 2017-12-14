import { Component, OnInit, Input } from '@angular/core';
import { Http, Response } from '@angular/http';

import { ChannelService, ChannelEvent } from '../channel.service';

class StatusEvent {
  State: string;
  PercentComplete: number;
}

@Component({
  selector: 'task',
  templateUrl: './task.component.html'
})

export class TaskComponent implements OnInit {
  @Input() eventName: string;
  @Input() apiUrl: string;

  cssName  = "green";
  messages = "";
  
  private channel = "tasks";

  constructor(
    private http: Http,
    private channelService: ChannelService
  ) {

  }

  ngOnInit() {
    this.channelService.sub(this.channel).subscribe(
        (x: ChannelEvent) => {
            switch (x.Name) {
                case this.eventName: { this.appendStatusUpdate(x); }
            }
        },
        (error: any) => {
            console.warn("Attempt to join channel failed!", error);
        }
    )
  }

  private appendStatusUpdate(ev:ChannelEvent): void {
    
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

        console.log(`${date.toLocaleTimeString()} : ` + ev.Data.State +'\n' + this.messages);
    }
}

callApi() {
    
    this.http.get('http://localhost:55341/tasks/long')
        .map((res: Response) => res.json())
        .subscribe((message: string) => { console.log(message); });
}

}
