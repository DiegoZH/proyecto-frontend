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
  formTienda: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {
    this.formTienda = formBuilder.group({
      nombre: [{value: null, disabled: false}, [Validators.required]],
      direccion: [{value: null, disabled: false}, [Validators.required]],
      objetivo: [{value: null, disabled: false}, [Validators.required]]
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
    const tienda = this.formTienda.getRawValue();
    this.appService.createTienda(tienda).subscribe(x => {
      alert('Se creó correctamente');
      this.back();
    })
  }

}
