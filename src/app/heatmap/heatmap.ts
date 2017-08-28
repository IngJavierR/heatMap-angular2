import { Component, ViewChild, OnInit } from '@angular/core';
import { HeatmapLayer } from '@ngui/map';
import { Observable } from 'rxjs/Rx';
import { DataSource } from '@angular/cdk';
import { HeatMapService } from '../services/heatmap.service';
import { DataService } from '../services/data.service';
import { ChartsModule } from 'ng2-charts';

@Component({
  selector: 'heat-map',
  templateUrl: './app/heatmap/heatmap.html',
  styleUrls: ['./app/heatmap/heatmap.css']
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
  doughnutChartColors: string[] = [];
  doughnutChartType: string = 'pie';

  dataSourceCounts;
  dataSourceColoniesIph;
  dataSourceColoniesCom;

  displayedColumnsCounts = ['name', 'numberOfEvents',];
  displayedColumnsColonies = ['name', 'colony', 'numberOfEvents'];

  constructor(private _heatMapService: HeatMapService,
    private _data: DataService) { }

  ngOnInit() {
    this.pointsIph = [];
    this.pointsCom = [];
    this.heatmapLayer.initialized$.subscribe(heatmap => {
      this.heatmap = heatmap;
      this.map = this.heatmap.getMap();
    });
    this._data.getMessage().subscribe(x => {
      let init = (x.initDate + 'T' + x.initTime + ':00');
      let end = (x.endDate + 'T' + x.endTime + ':00');
      this.getPoints(init, end);
    });
    this.isLoading = false;
  }

  private getPoints = function (initDate: string, endDate: string) {
    this.isLoading = true;

    this.pointsIph = [];
    this.pointsCom = [];
    this._heatMapService.getPoints(initDate, endDate)
      .subscribe(
      (response) => {

        this.processIph(response);
        this.processComandancia(response);

        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
      }
      );
  };

  private processIph(response: any) {
    this.pointsIph = response.iph.eventData.map(function (coord: any) {
      return (new google.maps.LatLng(coord.latitude, coord.lontitude));
    });
    this.dataSourceCounts = new CountsDataSource(response.iph.eventCounts);
    this.dataSourceColoniesIph = new CountsDataSource(response.iph.eventCountsColonies);

    let events: string[] = [];
    let numEvents: number[] = [];
    response.iph.eventCounts.forEach(x => {
      events.push(x.idEvent);
      numEvents.push(x.numberOfEvents);
    });
    this.doughnutChartLabelsIph = events;
    this.doughnutChartDataIph = numEvents;
    /*this.doughnutChartColors = [
      {
        backgroundColor: ['#FFE3D9', '#FFD0BF', '#FFBEA6', '#FFAB8C', '#FF9973', '#FF8659', '#FF7440', '#FF6126'],
        borderColor: '#FFFFFF'
      }
    ];*/
    this.doughnutChartType = 'pie';
  }

  private processComandancia(response: any) {
    this.pointsCom = response.comandancia.eventData.map(function (coord: any) {
      return (new google.maps.LatLng(coord.latitude, coord.lontitude));
    });
    this.dataSourceCounts = new CountsDataSource(response.comandancia.eventCounts);
    this.dataSourceColoniesCom = new CountsDataSource(response.comandancia.eventCountsColonies);

    let events: string[] = [];
    let numEvents: number[] = [];
    response.comandancia.eventCounts.forEach(x => {
      events.push(x.idEvent);
      numEvents.push(x.numberOfEvents);
    });
    this.doughnutChartLabelsCom = events;
    this.doughnutChartDataCom = numEvents;
    /*this.doughnutChartColors = [
      {
        backgroundColor: ['#FFE3D9', '#FFD0BF', '#FFBEA6', '#FFAB8C', '#FF9973', '#FF8659', '#FF7440', '#FF6126'],
        borderColor: '#FFFFFF'
      }
    ];*/
    this.doughnutChartType = 'pie';
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
