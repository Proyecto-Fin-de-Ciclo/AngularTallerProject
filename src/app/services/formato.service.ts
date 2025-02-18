import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Libro } from '../core/libro';
import { Formato } from '../core/formato';

@Injectable({
  providedIn: 'root'
})
export class FormatoService {

  private baseURL="http://localhost:8080";
  private options = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private httpClient:HttpClient) { }

  public getFormatos(){
    return this.httpClient.get<Formato[]>(`${this.baseURL}/api/formatos`, {headers: this.options});
  }
  public putFormato(formato:Formato){
    return this.httpClient.put(`${this.baseURL}/api/formatos`, formato, {headers: this.options});
  }
  public postFormato(formato:Formato){
    return this.httpClient.post(`${this.baseURL}/api/formatos`, formato, {headers: this.options});
  }
  public deleteLibroByFormato(id:number){
    return this.httpClient.delete(`${this.baseURL}/api/formatos/${id}`, {headers: this.options});
  }
}
