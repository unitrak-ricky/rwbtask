import { Component } from '@angular/core';
import { RwbtaskService } from './rwbtask.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'RWB Task';

    constructor( private rwbtastService: RwbtaskService){}
}
