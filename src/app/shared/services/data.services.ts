import { Injectable } from '@angular/core';
import { COURSES } from '../mock-data';
import { Observable, of } from 'rxjs';

@Injectable()
export class DataService {

    constructor() { }

    getCousres(): Observable<any[]> {
        return of(COURSES);
    }

}