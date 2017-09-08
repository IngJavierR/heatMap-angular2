import {Component, OnInit} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main/main';
import {DataService} from './services/data.service';
import {HeatMapService} from './services/heatmap.service';
import {MdSnackBar} from '@angular/material';
import {APP_PROVIDERS} from './app.providers';

@Component({
  selector: 'fountain-root',
  template: require('./routes.html'),
  providers: APP_PROVIDERS
})
export class RootComponent implements OnInit {
  initDate: string = '2017-06-01';
  initTime: string = '12:51';
  endDate: string = '2017-08-28';
  endTime: string = '15:39';
  maxDate: string = new Date().toJSON().split('T')[0];

  public coloniaComandanciaSelected: string;
  public coloniaIphSelected: string;
  tipoEventoComandanciaSelected: string;
  tipoEventoIphSelected: string;

  coloniasComandancia: any[] = [];
  coloniasIph: any[] = [];
  tipoEventoComandancia: any[] = [];
  tipoEventoIph: any[] = [];

  isLoading: boolean = true;

  constructor(private _heatMapService: HeatMapService,
              private _data: DataService,
              private _snackBar: MdSnackBar) {}

  ngOnInit() {
    this._heatMapService
      .getCatalogos()
      .subscribe((response) => {
        this.coloniasComandancia = response.comandancia.colonias;
        this.tipoEventoComandancia = response.comandancia.tipoEvento;
        this.coloniasIph = response.iph.colonias;
        this.tipoEventoIph = response.iph.tipoEvento;
        this.isLoading = false;
    }, (err) => {
      this._snackBar.open('Ocurrión un error al obtener los catálogos', 'Ok', {
        duration: 3000,
      });
      this.isLoading = false;
      console.log(err);
    });
  }

  sendRequest() {
    let coloniaIphSel = this.coloniaIphSelected;
    let coloniaComSel = this.coloniaComandanciaSelected;

    let colIphName = this.coloniasIph
    .filter(function(col: any){
      return (coloniaIphSel === col.id);
    });
    let colComName = this.coloniasComandancia
    .filter(function(col: any){
      return (coloniaComSel === col.id);
    });

    let msg = {
      'initDate': this.initDate,
      'initTime': this.initTime,
      'endDate': this.endDate,
      'endTime': this.endTime,
      'iph': {
        'colonia': this.coloniaIphSelected || '',
        'coloniaName': colIphName,
        'tipoEvento': this.tipoEventoIphSelected || '',
      },
      'comandancia': {
        'colonia': this.coloniaComandanciaSelected || '',
        'coloniaName': colComName,
        'tipoEvento': this.tipoEventoComandanciaSelected || '',
      }
    };
    this._data.setMessage(msg);
  }
}

export const routes: Routes = [
  {
    path: '',
    component: MainComponent
  }
];

export const routing = RouterModule.forRoot(routes);
