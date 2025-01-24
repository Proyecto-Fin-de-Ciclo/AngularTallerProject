import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  private options={
    headers:{
      'Content-Type':'application/json'
    }
  }
  private baseUrl="http://localhost:44346/api";
  constructor(private http:HttpClient) { }

  public getLibros(){
    return this.http.get(`${this.baseUrl}libros/libros-controller`,this.options);
  }
}
