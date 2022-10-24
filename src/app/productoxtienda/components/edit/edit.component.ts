import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../services/app.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  formProductoxTienda: FormGroup;
  productos: any[] = [];
  tiendas: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {
    this.formProductoxTienda = formBuilder.group({
      idRegistro: [{value: null, disabled: false}],
      nombreProducto: [{value: null, disabled: false}, [Validators.required]],
      nombreTienda: [{value: null, disabled: false}, [Validators.required]],
      fechaLlegadaAlmacen: [{value: null, disabled: false}, [Validators.required]],
      fechaSalidaAlmacen: [{value: null, disabled: false}],
      diasInventario: [{value: null, disabled: false}],
      precioRemate: [{value: null, disabled: false}],
      demanda: [{value: null, disabled: false}, [Validators.required]],
      cantidadComprada: [{value: null, disabled: false}, [Validators.required]],
      cantidadVendida: [{value: null, disabled: false}],
      cantidadVendidaRemate: [{value: null, disabled: false}],
      stock: [{value: null, disabled: false}, [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.getProductoxTiendaById()
  }
  back(): void {
    this.router.navigate(['/productoxtienda'], {
      relativeTo: this.activatedRouter
    })
  }

  cancelar(): void {
    this.back();
  }
  actualizar(): void {
    const productoxTienda = this.formProductoxTienda.getRawValue();
    productoxTienda.idRegistro=this.activatedRouter.snapshot.params['id']
    this.appService.updateTienda(productoxTienda).subscribe(x => {
      alert('Se actualizó correctamente');
      this.back();
    })
  }
  getProductoxTiendaById():void{
    this.appService.getProductoxTiendaById(this.activatedRouter.snapshot.params['id']).subscribe(listProductoxTienda => {
      const dateLlegada = new Date(listProductoxTienda.fechaLlegadaAlmacen).toISOString().slice(0,10)
      const dateSalida = new Date(listProductoxTienda.fechaSalidaAlmacen).toISOString().slice(0,10)
      this.formProductoxTienda = this.formBuilder.group({
        nombreProducto: [{value: listProductoxTienda.nombreProducto, disabled: false}, [Validators.required]],
        nombreTienda: [{value: listProductoxTienda.nombreTienda, disabled: false}, [Validators.required]],
        fechaLlegadaAlmacen: [{value: dateLlegada, disabled: false}, [Validators.required]],
        fechaSalidaAlmacen: [{value: dateSalida, disabled: false}],
        diasInventario: [{value: listProductoxTienda.diasInventario, disabled: false}],
        precioRemate: [{value: listProductoxTienda.precioRemate, disabled: false}],
        demanda: [{value: listProductoxTienda.demanda, disabled: false}, [Validators.required]],
        cantidadComprada: [{value: listProductoxTienda.cantidadComprada, disabled: false}, [Validators.required]],
        cantidadVendida: [{value: listProductoxTienda.cantidadVendida, disabled: false}],
        cantidadVendidaRemate: [{value: listProductoxTienda.cantidadVendidaRemate, disabled: false}],
        stock: [{value: listProductoxTienda.stock, disabled: false}, [Validators.required]]
      })
    })
  }
}
