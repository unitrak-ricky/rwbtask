import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';



@Injectable()
export class RwbtaskService {
    baseUrl: string = 'http://localhost:55341/api/values/'
    constructor(private _http: Http) { }

    getEvents() {
        const _headers = new Headers({
            'Access-Control-Allow-Origin' : 'http://localhost:4200'
        });
        return this._http.get(this.baseUrl + 'getEvents')
            .map((resp: Response) => resp.json())
            .catch(this._errorHandler);
    }

    _errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error || "Internal server error");
    }

}
