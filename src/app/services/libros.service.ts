import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Libro } from '../core/libro';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  private baseURL="http://localhost:8080";
  private options = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private httpClient:HttpClient) { }

  public getLibros(){
    return this.httpClient.get<Libro[]>(`${this.baseURL}/api/libros`, {headers: this.options});
  }
  public putLibro(libro:Libro){
    return this.httpClient.put(`${this.baseURL}/api/libros`, libro, {headers: this.options});
  }
  public postLibro(libro:Libro){
    return this.httpClient.post(`${this.baseURL}/api/libros`, libro, {headers: this.options});
  }
  public deleteLibro(id:number){
    return this.httpClient.delete(`${this.baseURL}/api/libros/${id}`, {headers: this.options});
  }
}
