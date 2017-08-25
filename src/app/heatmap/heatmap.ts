import { Component, ViewChild, OnInit } from '@angular/core';
import { HeatmapLayer } from '@ngui/map';
import { Observable } from 'rxjs/Rx';
import { DataSource } from '@angular/cdk';
import { HeatMapService } from '../services/heatmap.service';
import { DataService } from '../services/data.service';

@Component({
    selector: 'heat-map',
    templateUrl: './app/heatmap/heatmap.html',
    styleUrls: ['./app/heatmap/heatmap.css']
})

export class HeatMapComponent implements OnInit {
  @ViewChild(HeatmapLayer) heatmapLayer: HeatmapLayer;
  heatmap: google.maps.visualization.HeatmapLayer;
  map: google.maps.Map;
  points: any[] = [];
  centerpoint = '29.073269, -110.959484';
  pointsResponse: Observable<any[]>;
  isLoading: boolean = true;

  dataSourceCounts;
  dataSourceColonies;

  displayedColumnsCounts = ['name', 'numberOfEvents', ];
  displayedColumnsColonies = ['name', 'colony', 'numberOfEvents'];

  constructor(private _heatMapService: HeatMapService,
              private _data: DataService) {}

  ngOnInit() {
    this.points = [];
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

  private getPoints = function(initDate: string, endDate: string) {
    this.isLoading = true;
    this.points = [];
    this._heatMapService.getPoints(initDate, endDate)
    .subscribe(
      (response) => {
        this.points = response.eventData.map(function(coord: any){
          return (new google.maps.LatLng(coord.latitude, coord.lontitude));
        });
        this.dataSourceCounts = new CountsDataSource(response.eventCounts);
        this.dataSourceColonies = new CountsDataSource(response.eventCountsColonies);
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
      }
    );
  };
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

  disconnect(): void {}

}
