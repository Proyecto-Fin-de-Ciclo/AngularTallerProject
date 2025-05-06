import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carrito } from '../core/carrito';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private baseURL="http://localhost:8080";
    private options = new HttpHeaders({'Content-Type': 'application/json'})
    constructor(private httpClient:HttpClient) { }

    public getPedido(){
      return this.httpClient.get<Carrito[]>(`${this.baseURL}/api/pedido`, {headers: this.options});
    }
    public putPedido(carrito:Carrito){
      return this.httpClient.put(`${this.baseURL}/api/pedido`, carrito, {headers: this.options});
    }
    public postPedido(carrito:Carrito){
      return this.httpClient.post(`${this.baseURL}/api/pedido`, carrito, {headers: this.options});
    }
    public deleteCarrito(id:number){
      return this.httpClient.delete(`${this.baseURL}/api/pedido/${id}`, {headers: this.options});
    }
}
