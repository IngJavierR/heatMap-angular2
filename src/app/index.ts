import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {routing, RootComponent} from './routes';
import {NguiMapModule} from '@ngui/map';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdSelectModule,
        MdButtonModule,
        MdToolbarModule,
        MdSidenavModule,
        MdListModule} from '@angular/material';


import {MainComponent} from './main/main';
import {HeatMapComponent} from './heatmap/heatmap';
import {TempoComponent} from './tempo/tempo';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    BrowserAnimationsModule,
    MdSelectModule,
    MdButtonModule,
    MdToolbarModule,
    MdSidenavModule,
    MdListModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?v=3.exp&libraries=visualization'})
  ],
  exports: [
    MdToolbarModule,
    MdSidenavModule,
    MdSelectModule,
    MdButtonModule,
    MdListModule
  ],
  declarations: [
    RootComponent,
    MainComponent,
    HeatMapComponent,
    TempoComponent
  ],
  bootstrap: [RootComponent]
})
export class AppModule {}
