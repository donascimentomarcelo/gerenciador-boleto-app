import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Client } from './../models/client';
import { User } from '../models/user';
import { ResponseContentType, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  public list(): Observable<Client[]> {
    return this.http.get<Client[]>(`${environment.api_url}/users/list/all`, {});
  }

  public paginate(page: number): Observable<any> {
    return this.http.get<any>(`${environment.api_url}/users?page=${page}`, {});
  }

  public findOne(user: number): Observable<User> {
    return this.http.get<User>(`${environment.api_url}/users/${user}`, {});
  }

  public save(user: User): Observable<any> {
    return this.http.post<any>(`${environment.api_url}/users`, user);
  }

  public update(user: User, id: number): Observable<any> {
    return this.http.put<any>(`${environment.api_url}/users/${id}`, user);
  }

  public upload(file: any, user_id: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, 'imageName');
    formData.append('user_id', user_id.toString());

    return this.http.post<any>(`${environment.api_url}/uploads/store`, formData);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.api_url}/users/${id}`, {});
  }

  public download(username: string): Observable<any> {
    const headers = new Headers();
    headers.append('Accept', 'application/pdf');
    return this.http.post(`${environment.api_url}/uploads/download/${username}`, {}, {responseType: 'arraybuffer'});
  }
}
