import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RwbtaskService } from '../rwbtask.service';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html'
 
})



export class EventListComponent implements OnInit {

    taskEvents: Array<any> = [];
    errorMessage: any;

    constructor(
        private _rwbtaskService: RwbtaskService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.getTaskEvents();
    }

    getTaskEvents() {
        this._rwbtaskService.getEvents().subscribe(
            data => {
                console.log(data),
                this.taskEvents = data
            },
            error => {
                debugger;
                this.errorMessage = error
            }
        )
    }

}
