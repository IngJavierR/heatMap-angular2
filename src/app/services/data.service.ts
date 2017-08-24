import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DataService {

    private message = new Subject<string>();

    getMessage() {
        return this.message.asObservable();
    }

    setMessage(msg: string){
        this.message.next(msg);
    }
}
