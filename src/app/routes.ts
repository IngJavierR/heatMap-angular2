import {Component} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main/main';
import { DataService } from './services/data.service';
import { APP_PROVIDERS } from './app.providers';

@Component({
  selector: 'fountain-root',
  templateUrl: './app/routes.html',
  providers: APP_PROVIDERS
})
export class RootComponent {
  initDate: string = '2017-08-11';
  initTime: string = '17:40';
  endDate: string = '2017-07-28';
  endTime: string = '15:39';
  //this.getPoints('2017-08-11T17:40:00', '2017-07-28T15:39:00');
  constructor(private _data: DataService) {}

  sendRequest() {
    let msg = {
      'initDate': this.initDate,
      'initTime': this.initTime,
      'endDate': this.endDate,
      'endTime': this.endTime,
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
