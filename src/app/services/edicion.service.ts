import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Autor } from '../core/autor';

@Injectable({
  providedIn: 'root'
})
export class EdicionService {

  private baseURL="http://localhost:8080";
  private options = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private httpClient:HttpClient) { }

  public getEdicion(){
    return this.httpClient.get<Autor[]>(`${this.baseURL}/api/ediciones`, {headers: this.options});
  }
  public putEdicion(autor:Autor){
    return this.httpClient.put(`${this.baseURL}/api/ediciones`, autor, {headers: this.options});
  }
  public postEdicion(autor:Autor){
    return this.httpClient.post(`${this.baseURL}/api/ediciones`, autor, {headers: this.options});
  }
  public deleteLibroByEdicion(id:number){
    return this.httpClient.delete(`${this.baseURL}/api/ediciones/${id}`, {headers: this.options});
  }
}
