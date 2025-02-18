import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Autor } from '../core/autor';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  private baseURL="http://localhost:8080";
  private options = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private httpClient:HttpClient) { }

  public getAutores(){
    return this.httpClient.get<Autor[]>(`${this.baseURL}/api/autores`, {headers: this.options});
  }
  public putAutor(autor:Autor){
    return this.httpClient.put(`${this.baseURL}/api/autores`, autor, {headers: this.options});
  }
  public postAutor(autor:Autor){
    return this.httpClient.post(`${this.baseURL}/api/autores`, autor, {headers: this.options});
  }
  public deleteLibroByAutor(id:number){
    return this.httpClient.delete(`${this.baseURL}/api/autores/${id}`, {headers: this.options});
  }
}
