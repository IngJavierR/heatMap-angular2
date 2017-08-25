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

  constructor() {}
}

export const routes: Routes = [
  {
    path: '',
    component: MainComponent
  }
];

export const routing = RouterModule.forRoot(routes);
