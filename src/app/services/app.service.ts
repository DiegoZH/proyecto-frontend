import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private httpclient: HttpClient) {

  }

  getByFilters(filtro: any): Observable<any>{
    return this.httpclient.post(`${environment.apiUrl}/ProductoxTienda/GetByFilters`,filtro)
  }

  getProductos(): Observable<any>{
    return this.httpclient.get(`${environment.apiUrl}/Producto/GetAll`)
  }

  getTiendas(): Observable<any>{
    return this.httpclient.get(`${environment.apiUrl}/Tienda/GetAll`)
  }

  createTienda(tienda: any): Observable<any>{
    return this.httpclient.post(`${environment.apiUrl}/Tienda/Create`,tienda)
  }

  createProducto(producto: any): Observable<any>{
    return this.httpclient.post(`${environment.apiUrl}/Producto/Create`,producto)
  }
  getTiendaById(idTienda: any): Observable<any>{
    return this.httpclient.get(`${environment.apiUrl}/Tienda/GetById/${idTienda}`,)
  }
  updateTienda(tienda: any): Observable<any>{
    return this.httpclient.put(`${environment.apiUrl}/Tienda/Update`,tienda)
  }
  getProductoById(idProducto: any): Observable<any>{
    return this.httpclient.get(`${environment.apiUrl}/Producto/GetById/${idProducto}`,)
  }
  updateProducto(producto: any): Observable<any>{
    return this.httpclient.put(`${environment.apiUrl}/Producto/Update`,producto)
  }
  createProductoxTienda(productoxTienda: any): Observable<any>{
    return this.httpclient.post(`${environment.apiUrl}/ProductoxTienda/Create`,productoxTienda)
  }
  updateProductoxTienda(productoxTienda: any): Observable<any>{
    return this.httpclient.put(`${environment.apiUrl}/ProductoxTienda/Update`,productoxTienda)
  }
  getProductoxTiendaById(idRegistro: any): Observable<any>{
    return this.httpclient.get(`${environment.apiUrl}/ProductoxTienda/GetById/${idRegistro}`,)
  }
  deleteProducto(idProducto: any): Observable<any>{
    return this.httpclient.delete(`${environment.apiUrl}/Producto/${idProducto}`)
  }
  deleteTienda(idTienda: any): Observable<any>{
    return this.httpclient.delete(`${environment.apiUrl}/nda/${idTienda}`)
  }
  deleteProductoxTienda(idProductoxTienda: any): Observable<any>{
    return this.httpclient.delete(`${environment.apiUrl}/Producto/${idProductoxTienda}`)
  }
}
