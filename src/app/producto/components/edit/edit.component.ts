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
  formProducto: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {
    this.formProducto = formBuilder.group({
      idProducto: [{value: null, disabled: false}, [Validators.required]],
      nombre: [{value: null, disabled: false}, [Validators.required]],
      descripcion: [{value: null, disabled: false}, [Validators.required]],
      precioVenta: [{value: null, disabled: false}, [Validators.required]],
      precioCompra: [{value: null, disabled: false}, [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.getProductoById();
  }
  back(): void {
    this.router.navigate(['/producto'], {
      relativeTo: this.activatedRouter
    })
  }

  cancelar(): void {
    this.back();
  }

  actualizar(): void {
    const producto = this.formProducto.getRawValue();
    producto.idProducto=this.activatedRouter.snapshot.params['id']
    this.appService.updateProducto(producto).subscribe(x => {
      alert('Se actualizó correctamente');
      this.back();
    })
  }

  getProductoById():void{
    this.appService.getProductoById(this.activatedRouter.snapshot.params['id']).subscribe(listProducto => {
      this.formProducto = this.formBuilder.group({
        nombre: [{value: listProducto.nombre, disabled: false}, [Validators.required]],
        descripcion: [{value: listProducto.descripcion, disabled: false}, [Validators.required]],
        precioVenta: [{value: listProducto.precioVenta, disabled: false}, [Validators.required]],
        precioCompra: [{value: listProducto.precioCompra, disabled: false}, [Validators.required]]
      })
      console.log(this.formProducto.getRawValue())
    })
  }
}
