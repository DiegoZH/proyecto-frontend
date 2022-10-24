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
  displayedColumns: string [] = ['codigoTienda','nombre','direccion','objetivo','actions']
  tiendaDataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  constructor(
    private appService: AppService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getTiendas();
  }
  getTiendas(): void{
    this.appService.getTiendas().subscribe(listTiendas=>{
      this.tiendaDataSource.data = listTiendas;
    })
  }
  editarTienda(tienda: any): void{
    this.router.navigate(['/tienda/edit/'+tienda.codigoTienda],{
      relativeTo: this.activatedRoute
    })
  }

  agregarTienda(): void{
    this.router.navigate(['./create'],{
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
