import { Component, OnInit } from '@angular/core';
import { RwbtaskService } from '../rwbtask.service';


@Component({
  selector: 'rwb-event-list',
  templateUrl: './event-list.component.html'
 
})

export class EventListComponent implements OnInit {

    rwbEvents: Array<any> = [];
    errorMessage: any;

    constructor(
        private _rwbtaskService: RwbtaskService,
    ) { }

    ngOnInit() {
        this.getTaskEvents();
    }

    getTaskEvents() {
        this._rwbtaskService.getEvents().subscribe(
            data => {
                console.log(data),
                this.rwbEvents = data
            },
            error => {
                debugger;
                this.errorMessage = error
            }
        )
    }

}
