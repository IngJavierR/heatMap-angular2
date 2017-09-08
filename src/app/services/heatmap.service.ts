import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HeatMapService {

    private _url: string = 'https://192.168.0.127:8443/comandancia-analytics-web/analytics/indicadores/';
    constructor(private _http: Http) {}

    getCatalogos() {
        let method: string = 'getCatalogo';

        let url = this._url + (`${method}`);
        return this._http.get(url)
            .map((resp: Response) => resp.json())
            .catch(this.handleError);
    }

    getPoints(requestParams: any) {
        let method: string = 'getCoord';

        let url = this._url + `${method}?initialDate=${requestParams.initDate}&endDate=${requestParams.endDate}
                                &tipoEventoCom=${requestParams.comandancia.tipoEvento}&coloniaCom=${requestParams.comandancia.colonia}&
                                tipoEventoIph=${requestParams.iph.tipoEvento}&coloniaIph=${requestParams.iph.colonia}`;
        return this._http.get(url)
            .map((resp: Response) => resp.json())
            .catch(this.handleError);
    }

    handleError(error: any) {
        console.log(error);
        return Observable.throw(error.json() || 'Server error');
    }
}
