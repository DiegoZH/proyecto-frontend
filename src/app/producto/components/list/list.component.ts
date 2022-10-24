import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {AppService} from "../../../services/app.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string [] = ['idProducto','nombre','descripcion','precioVenta','precioCompra','actions']
  productoDataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  constructor(
    private appService: AppService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getProductos();
  }
  getProductos(): void{
    this.appService.getProductos().subscribe(listProductos=>{
      this.productoDataSource.data = listProductos;
    })
  }
  agregarProducto(): void{
    this.router.navigate(['./create'],{
      relativeTo: this.activatedRoute
    })
  }
  editarProducto(producto: any): void{
    this.router.navigate(['/producto/edit/'+producto.idProducto],{
      relativeTo: this.activatedRoute
    })
  }
  back(): void {
    this.router.navigate(['..'], {
      relativeTo: this.activatedRoute
    })
  }
  atras(): void {
    this.back();
  }
}
