import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {routing, RootComponent} from './routes';
import {NguiMapModule} from '@ngui/map';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CdkTableModule} from '@angular/cdk';
import {ChartsModule} from 'ng2-charts';
import {MdSelectModule,
        MdButtonModule,
        MdToolbarModule,
        MdSidenavModule,
        MdListModule,
        MdIconModule,
        MdTableModule,
        MdGridListModule,
        MdProgressBarModule,
        MdCardModule,
        MdInputModule,
        MdTooltipModule,
        MdNativeDateModule,
        MdDatepickerModule,
        MdSnackBarModule} from '@angular/material';

import {MainComponent} from './main/main';
import {HeatMapComponent} from './heatmap/heatmap';

const MATERIAL_MODULES = [
  MdSelectModule,
  MdButtonModule,
  MdToolbarModule,
  MdSidenavModule,
  MdListModule,
  MdIconModule,
  MdTableModule,
  MdGridListModule,
  MdProgressBarModule,
  MdCardModule,
  MdInputModule,
  MdTooltipModule,
  MdNativeDateModule,
  MdDatepickerModule,
  MdSnackBarModule
  ];

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    BrowserAnimationsModule,
    CdkTableModule,
    FormsModule,
    ChartsModule,
    MATERIAL_MODULES,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?v=3.exp&libraries=visualization&key=AIzaSyCzxa1KQr83JhsC7MU5ATTlwM6C5hkzIDA'})
  ],
  exports: [
    CdkTableModule,
    MATERIAL_MODULES,
  ],
  declarations: [
    RootComponent,
    MainComponent,
    HeatMapComponent,
  ],
  bootstrap: [RootComponent]
})
export class AppModule {}
