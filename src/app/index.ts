import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {routing, RootComponent} from './routes';
import {NguiMapModule} from '@ngui/map';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk';
import {MdSelectModule,
        MdButtonModule,
        MdToolbarModule,
        MdSidenavModule,
        MdListModule,
        MdIconModule,
        MdTableModule,
        MdGridListModule,
        MdProgressBarModule} from '@angular/material';


import {MainComponent} from './main/main';
import {HeatMapComponent} from './heatmap/heatmap';

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
    MdIconModule,
    MdTableModule,
    CdkTableModule,
    MdGridListModule,
    MdProgressBarModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?v=3.exp&libraries=visualization'})
  ],
  exports: [
    MdToolbarModule,
    MdSidenavModule,
    MdSelectModule,
    MdButtonModule,
    MdListModule,
    MdIconModule,
    MdTableModule,
    CdkTableModule,
    MdGridListModule,
    MdProgressBarModule
  ],
  declarations: [
    RootComponent,
    MainComponent,
    HeatMapComponent,
  ],
  bootstrap: [RootComponent]
})
export class AppModule {}
