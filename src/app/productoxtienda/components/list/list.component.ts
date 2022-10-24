import { Component, OnInit } from '@angular/core';
import {AppService} from "../../../services/app.service";
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string [] = ['nombreProducto','nombreTienda','fechaLlegadaAlmacen','fechaSalidaAlmacen','diasInventario','demanda','cantidadComprada','cantidadVendida','cantidadVendidaRemate','precioRemate','stock','actions']
  summaryDataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  formFiltro: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.formFiltro = formBuilder.group({
      nombreProducto: [{value: "", disabled: false}, [Validators.required]],
      nombreTienda: [{value: "", disabled: false}, [Validators.required]],
      mes: [{value: 0, disabled: false}, [Validators.required]],
      anio: [{value: 0, disabled: false}, [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.getSummary()
  }

  getSummary(): void{
    this.appService.getByFilters(this.formFiltro.getRawValue()).subscribe(listSummary=>{
      this.summaryDataSource.data = listSummary;
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
  limpiar(): void{
    this.formFiltro = this.formBuilder.group({
      nombreProducto: [{value: "", disabled: false}, [Validators.required]],
      nombreTienda: [{value: "", disabled: false}, [Validators.required]],
      mes: [{value: 0, disabled: false}, [Validators.required]],
      anio: [{value: 0, disabled: false}, [Validators.required]]
    })
    this.appService.getByFilters(this.formFiltro.getRawValue()).subscribe(listSummary=>{
      this.summaryDataSource.data = listSummary;
    })
  }
  editarproductoxTienda(productoxTienda: any): void{
    this.router.navigate(['/productoxtienda/edit/'+productoxTienda.idRegistro],{
      relativeTo: this.activatedRoute
    })
  }
}
