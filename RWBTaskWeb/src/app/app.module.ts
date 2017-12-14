import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';

import "rxjs/add/operator/map";

import { AppComponent } from './app.component';
import { EventListComponent } from './event-list/event-list.component';



import { RwbtaskService } from './rwbtask.service';
import { ChannelService,ChannelConfig, SignalrWindow } from './channel.service';


@Pipe({
  name: 'keyValues'
})
export class KeysPipe implements PipeTransform {
  transform(value: any, args: any[] = null): any {
    return Object.keys(value).map(key => value[key]);
  }
}

let channelConfig = new ChannelConfig();  
channelConfig.url = 'http://localhost:55341/signalr';
channelConfig.hubName = "EventHub";

@NgModule({
  declarations: [
    AppComponent,
    EventListComponent
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
    ChannelService,
    {provide: SignalrWindow, useValue: window},
    {provide: "channel.config", useValue: channelConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
