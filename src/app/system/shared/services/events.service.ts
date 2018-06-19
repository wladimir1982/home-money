import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {BaseApi} from '../../../shared/core/base-api';
import {SVVEvent} from '../models/event.model';

@Injectable()
export class EventsService extends BaseApi {
  constructor(public http: Http) {
    super(http);
  }
  addEvent(event: SVVEvent): Observable<SVVEvent> {
    return this.post('events', event);
  }

  getEvents(): Observable<SVVEvent[]> {
    return this.get('events');
  }

  getEventById(id: string): Observable<SVVEvent> {
    return this.get(`events/${id}`);
  }

}











