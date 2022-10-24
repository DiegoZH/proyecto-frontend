import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../services/app.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
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
      idProducto: [{value: null, disabled: false}, [Validators.required]],
      codigoTienda: [{value: null, disabled: false}, [Validators.required]],
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
    this.appService.getProductos().subscribe(productos=>{
      this.productos = productos;
    })
    this.appService.getTiendas().subscribe(tiendas=>{
      this.tiendas = tiendas;
    })
  }

  back(): void {
    this.router.navigate(['/'], {
      relativeTo: this.activatedRouter
    })
  }

  cancelar(): void {
    this.back();
  }

  agregar(): void {
    const tienda = this.formProductoxTienda.getRawValue();
    this.appService.createProductoxTienda(tienda).subscribe(x => {
      alert('Se creó correctamente');
      this.back();
    })
  }

}
