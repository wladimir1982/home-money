import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class BaseApi {
  private baseUrl = 'http://localhost:3000/';
  // private baseUrl = 'https://home-money-6f0b8.firebaseio.com';

  constructor(public http: Http) {}

  public getUrl(url: string = ''): string {
    return this.baseUrl + url;
  }
  public get(url: string = ''): Observable<any> {
    return this.http.get(this.getUrl(url))
      .map((response: Response) => response.json());
  }
  public post(url: string = '', data: any = {}): Observable<any> {
    return this.http.post(this.getUrl(url), data)
      .map((response: Response) => response.json());
  }
  public put(url: string = '', data: any = {}): Observable<any> {
    return this.http.put(this.getUrl(url), data)
      .map((response: Response) => response.json());
  }

}
















