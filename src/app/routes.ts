import {Component} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main/main';
import {TempoComponent} from './tempo/tempo';
import { DataService } from './services/data.service';
import { APP_PROVIDERS } from './app.providers';

@Component({
  selector: 'fountain-root',
  templateUrl: './app/routes.html',
  providers: APP_PROVIDERS
})
export class RootComponent {

  constructor(private _data: DataService) { }

  changeColor() {
    this._data.setMessage(this.getRandomColor());
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

export const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'tempo',
    component: TempoComponent
  }
];

export const routing = RouterModule.forRoot(routes);
