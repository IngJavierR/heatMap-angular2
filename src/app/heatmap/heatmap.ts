import { Component, ViewChild, OnInit } from '@angular/core';
import { HeatmapLayer } from '@ngui/map';
import { Observable } from 'rxjs/Rx';

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
  centerpoint = '37.782551, -122.445368';
  pointsResponse: Observable<any[]>;
  color: string = 'blue';
  private _cord = [
      -122.442688,
      -122.441688,
      -122.440688,
      -122.449588
    ];

  constructor(private _heatMapService: HeatMapService,
              private _data: DataService) {
    this._data
      .getMessage()
      .subscribe(
      val => this.color = val
    );
  }

  ngOnInit() {
    this.points = [];
    this.heatmapLayer.initialized$.subscribe(heatmap => {
      this.heatmap = heatmap;
      this.map = this.heatmap.getMap();
      this.getPoints();
    });
  }

  addPoint = function(){
    this.getPoints();
  };

  private getPoints = function() {
    this.points = [];
    this._heatMapService.getPoints()
    .subscribe(
      (response) => {
        this.points = response.map(function(coord: any){
          return (new google.maps.LatLng(coord.lat, coord.long));
        });
      },
      (err) => {
        console.log(err);
      }
    );
  };
}
