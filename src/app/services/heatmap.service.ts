import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HeatMapService {

    private _url: string = 'http://localhost:8080/comandancia-analytics-web/analytics/indicadores/getCoord?';
    constructor(private _http: Http) {}

    getPoints(initDate: string, endDate: string) {
        let url = this._url + ('initialDate=' + initDate + '&endDate=' + endDate);
        return this._http.get(url)
            .map((resp: Response) => resp.json())
            .catch(this.handleError);
    }

    handleError(error: any) {
        console.log(error);
        return Observable.throw(error.json() || 'Server error');
    }
}
