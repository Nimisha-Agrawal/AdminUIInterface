import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  private map = new Map();
  constructor(private http: HttpClient) {}
  public getData = (route: string) => {
    return this.http.get(
      this.createCompleteRoute(route, environment.urlAddress)
    );
  };

  public create = (route: string, body: string) => {
    return this.http.post(
      this.createCompleteRoute(route, environment.urlAddress),
      body,
      this.generateHeaders()
    );
  };

  public update = (route: string, body: any) => {
    return this.http.put(
      this.createCompleteRoute(route, environment.urlAddress),
      body,
      this.generateHeaders()
    );
  };

  public delete = (route: string) => {
    return this.http.delete(
      this.createCompleteRoute(route, environment.urlAddress)
    );
  };

  private createCompleteRoute = (route: string, envAddress: string) => {
    return route != '' ? `${envAddress}/${route}` : envAddress;
  };

  public setPreviousData(element: any, id: any) {
    this.map.set(id, element);
  }

  public getPreviousData(id: any) {
    return this.map.get(id);
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
  };
}
