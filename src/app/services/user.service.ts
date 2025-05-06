import { User } from './../core/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL="http://localhost:8080";
  private options = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private httpClient:HttpClient) { }

  public getUser(){
    return this.httpClient.get<User[]>(`${this.baseURL}/api/user`, {headers: this.options});
  }
  public getUserById(id:number){
    return this.httpClient.get<User>(`${this.baseURL}/api/user/${id}`, {headers: this.options});
  }
  public putUser(user:User){
    return this.httpClient.put(`${this.baseURL}/api/user`, user, {headers: this.options});
  }
  public postUser(user:User){
    return this.httpClient.post(`${this.baseURL}/api/user`, user, {headers: this.options});
  }
  public deleteUser(id:number){
    return this.httpClient.delete(`${this.baseURL}/api/user/${id}`, {headers: this.options});
  }
}
