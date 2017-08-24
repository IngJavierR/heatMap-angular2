import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HeatMapService {

    private _url: string = 'http://localhost:3002/getPoints';
    constructor(private _http: Http) {}

    getPoints() {
        return this._http.get(this._url)
            .map((resp: Response) => resp.json())
            .catch(this.handleError);
    }

    handleError(error: any) {
        console.log(error);
        return Observable.throw(error.json() || 'Server error');
    }
}
