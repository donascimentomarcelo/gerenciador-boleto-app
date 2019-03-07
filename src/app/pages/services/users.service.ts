import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Client } from './../models/client';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  public list(): Observable<Client[]> {
    return this.http.get<Client[]>(`${environment.api_url}/users/list/all`, {});
  }
}
