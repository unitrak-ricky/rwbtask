import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';

import { AppComponent } from './app.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventPriceUpdateComponent } from './event-price-update/event-price-update.component';

import { RwbtaskService } from './rwbtask.service';
import { RwbsignalrService,RWBTaskConfig, SignalrWindow } from './rwbsignalr.service';


@Pipe({
  name: 'keyValues'
})
export class KeysPipe implements PipeTransform {
  transform(value: any, args: any[] = null): any {
    return Object.keys(value).map(key => value[key]);
  }
}


let channelConfig = new RWBTaskConfig();  
channelConfig.url = 'http://localhost:55341/api/values';
channelConfig.hubName = "EventHub";

@NgModule({
  declarations: [
    AppComponent,
    EventListComponent,
    KeysPipe,
    EventPriceUpdateComponent
  ],
  imports: [
      BrowserModule,
      HttpModule,
      RouterModule.forRoot([
          { path: "", redirectTo: "", pathMatch: 'full' }
      ])
  ],
  providers: [
    RwbtaskService,
    RwbsignalrService,
    {provide: SignalrWindow, useValue: window},
    {provide: "rwbsignalr.config", useValue: channelConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
