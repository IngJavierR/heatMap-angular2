import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DataService {

    private message = new Subject<any>();

    getMessage() {
        return this.message.asObservable();
    }

    setMessage(msg: any) {
        this.message.next(msg);
    }
}
