import { DatosBank } from './../core/datosBank';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DatosBankService {

  private baseURL="http://localhost:8080";
  private options = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private httpClient:HttpClient) { }

  public getDatosBank(){
    return this.httpClient.get<DatosBank[]>(`${this.baseURL}/api/datosBank`, {headers: this.options});
  }
  public putDatosBank(datosBank:DatosBank){
    return this.httpClient.put(`${this.baseURL}/api/datosBank`, datosBank, {headers: this.options});
  }
  public postDatosBank(datosBank:DatosBank){
    return this.httpClient.post(`${this.baseURL}/api/datosBank`, datosBank, {headers: this.options});
  }
  public deleteDatosBank(id:number){
    return this.httpClient.delete(`${this.baseURL}/api/datosBank/${id}`, {headers: this.options});
  }
}
