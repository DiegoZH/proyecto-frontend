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
  formProducto: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {
    this.formProducto = formBuilder.group({
      nombre: [{value: null, disabled: false}, [Validators.required]],
      descripcion: [{value: null, disabled: false}, [Validators.required]],
      precioVenta: [{value: null, disabled: false}, [Validators.required]],
      precioCompra: [{value: null, disabled: false}, [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  back(): void {
    this.router.navigate(['..'], {
      relativeTo: this.activatedRouter
    })
  }

  cancelar(): void {
    this.back();
  }

  agregar(): void {
    const producto = this.formProducto.getRawValue();
    this.appService.createProducto(producto).subscribe(x => {
      alert('Se creó correctamente');
      this.back();
    })
  }
}
