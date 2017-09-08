import {Component, ViewChild, OnInit} from '@angular/core';
import {HeatmapLayer} from '@ngui/map';
import {Observable} from 'rxjs/Rx';
import {DataSource} from '@angular/cdk';
import {HeatMapService} from '../services/heatmap.service';
import {DataService} from '../services/data.service';
import {ChartsModule} from 'ng2-charts';
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'heat-map',
  template: require('./heatmap.html')
})

export class HeatMapComponent implements OnInit {
  @ViewChild(HeatmapLayer) heatmapLayer: HeatmapLayer;
  @ViewChild('baseChart') baseChart: ChartsModule;
  heatmap: google.maps.visualization.HeatmapLayer;
  map: google.maps.Map;
  pointsIph: any[] = [];
  pointsCom: any[] = [];
  centerpoint = '29.073269, -110.959484';
  pointsResponse: Observable<any[]>;
  isLoading: boolean = true;
  doughnutChartLabelsIph: string[] = [];
  doughnutChartDataIph: number[] = [];
  doughnutChartLabelsCom: string[] = [];
  doughnutChartDataCom: number[] = [];
  doughnutChartColors: any[] = [];
  doughnutChartType: string = 'pie';
  dataSourceCounts;
  dataSourceColoniesIph;
  dataSourceColoniesCom;
  displayedColumnsCounts = ['name', 'numberOfEvents'];
  displayedColumnsColonies = ['name', 'colony', 'numberOfEvents'];
  queryIph: string;
  queryComandancia: string;
  private backgroundColors: string[] = [];

  constructor(private _heatMapService: HeatMapService,
              private _data: DataService,
              private _snackBar: MdSnackBar) { }

  ngOnInit() {
    this.pointsIph = [];
    this.pointsCom = [];
    this.heatmapLayer
      .initialized$
      .subscribe(heatmap => {
        this.heatmap = heatmap;
        this.map = this.heatmap.getMap();
    });
    this._data
      .getMessage()
      .subscribe(x => {
        let init = (x.initDate + 'T' + x.initTime + ':00');
        let end = (x.endDate + 'T' + x.endTime + ':00');

        let requestParams = Object
                          .assign({'initDate': init},
                            {'endDate': end},
                            {'iph': x.iph},
                            {'comandancia': x.comandancia});

        this.printQuery(requestParams);
        this.getPoints(requestParams);
    });
    this.isLoading = false;
  }

  private printQuery(params: any) {

    this.queryComandancia = `Fecha Inicial: [${params.initDate}]
                             Fecha Final: [${params.endDate}]
                             Colonia: [${params.comandancia.coloniaName.length > 0 ? params.comandancia.coloniaName[0].colonia : 'Todas'}]
                             Tipo Evento: [${params.comandancia.tipoEvento || 'Todos'}]`;

    this.queryIph = `Fecha Inicial: [${params.initDate}]
                     Fecha Final: [${params.endDate}]
                     Colonia: [${params.iph.coloniaName.length > 0 ? params.iph.coloniaName[0].colonia : 'Todas'}]
                     Tipo Evento: [${params.iph.tipoEvento || 'Todos'}]`;
  }

  private getPoints = function (requestParams: any) {
    this.isLoading = true;

    this.pointsIph = [];
    this.pointsCom = [];
    this._heatMapService.getPoints(requestParams)
      .subscribe(
      (response) => {

        this.backgroundColors = [];
        if (response.iph.eventCounts.length > response.comandancia.eventCounts.length) {
          Observable
            .from(response.iph.eventCounts)
            .subscribe(_ => this.backgroundColors.push(this.getRandomColor()));
        } else {
          Observable
            .from(response.comandancia.eventCounts)
            .subscribe(_ => this.backgroundColors.push(this.getRandomColor()));
        }
        this.doughnutChartColors = [
          {
            backgroundColor: this.backgroundColors,
            borderColor: ['#FFFFFF']
          }
        ];
        this.doughnutChartType = 'pie';

        this.processIph(response);
        this.processComandancia(response);

        this.isLoading = false;
      },
      (err) => {
        this._snackBar.open('Ocurrión un error al obtener la información', 'Ok', {
          duration: 3000,
        });
        this.isLoading = false;
        console.log(err);
      }
      );
  };

  private processIph(response: any) {
    let iphMap = response.iph.eventData.reduce((x, y) => x.includes(y) ? x : [...x, y], []);

    this.pointsIph = iphMap.filter(function(coord: any){
      return coord.latitude !== '' && coord.lontitude !== '';
    }).map(function (coord: any) {
      return new google.maps.LatLng(coord.latitude, coord.lontitude);
    });

    this.dataSourceCounts = new CountsDataSource(response.iph.eventCounts);
    this.dataSourceColoniesIph = new CountsDataSource(
      response.iph.eventCountsColonies
      .sort(function(a: any, b: any) {
      if (a.numberOfEvents < b.numberOfEvents) {
        return 1;
      }
      if (a.numberOfEvents > b.numberOfEvents) {
        return -1;
      }
      return 0;
    }));

    let events: string[] = [];
    let numEvents: number[] = [];
    response.iph.eventCounts.forEach(x => {
      events.push(x.idEvent);
      numEvents.push(x.numberOfEvents);
    });

    this.doughnutChartLabelsIph = events;
    this.doughnutChartDataIph = numEvents;
  }

  private processComandancia(response: any) {
    let comandanciaMap = response.comandancia.eventData.reduce((x, y) => x.includes(y) ? x : [...x, y], []);

    this.pointsCom = comandanciaMap.filter(function(coord: any){
      return coord.latitude !== '' && coord.lontitude !== '';
    }).map(function (coord: any) {
      return new google.maps.LatLng(coord.latitude, coord.lontitude);
    });

    this.dataSourceCounts = new CountsDataSource(response.comandancia.eventCounts);
    this.dataSourceColoniesCom = new CountsDataSource(
      response.comandancia.eventCountsColonies
      .sort(function(a: any, b: any) {
      if (a.numberOfEvents < b.numberOfEvents) {
        return 1;
      }
      if (a.numberOfEvents > b.numberOfEvents) {
        return -1;
      }
      return 0;
    }));

    let events: string[] = [];
    let numEvents: number[] = [];
    response.comandancia.eventCounts.forEach(x => {
      events.push(x.idEvent);
      numEvents.push(x.numberOfEvents);
    });

    this.doughnutChartLabelsCom = events;
    this.doughnutChartDataCom = numEvents;
  }

  private getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}

export class CountsDataSource extends DataSource<any[]> {

  data: any[] = [];

  constructor(data: any[]) {
    super();
    this.data = data;
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any[]> {
    return Observable.of(this.data);
  }

  disconnect(): void { }

}
