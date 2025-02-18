import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Libro } from '../core/libro';
import { Tema } from '../core/tema';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  private baseURL="http://localhost:8080";
  private options = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private httpClient:HttpClient) { }

  public getTema(){
    return this.httpClient.get<Tema[]>(`${this.baseURL}/api/temas`, {headers: this.options});
  }
  public putTema(tema:Tema){
    return this.httpClient.put(`${this.baseURL}/api/temas`, tema, {headers: this.options});
  }
  public postTema(tema:Tema){
    return this.httpClient.post(`${this.baseURL}/api/temas`, tema, {headers: this.options});
  }
  public deleteTema(id:number){
    return this.httpClient.delete(`${this.baseURL}/api/temas/${id}`, {headers: this.options});
  }
}
