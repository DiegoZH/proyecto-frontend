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
  formTienda: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {
    this.formTienda = formBuilder.group({
      codigoTienda: [{value: null, disabled: false}, [Validators.required]],
      nombre: [{value: null, disabled: false}, [Validators.required]],
      direccion: [{value: null, disabled: false}, [Validators.required]],
      objetivo: [{value: null, disabled: false}, [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.getTiendaById()
  }

  back(): void {
    this.router.navigate(['/tienda'], {
      relativeTo: this.activatedRouter
    })
  }

  cancelar(): void {
    this.back();
  }

  actualizar(): void {
    const tienda = this.formTienda.getRawValue();
    tienda.codigoTienda=this.activatedRouter.snapshot.params['id']
    this.appService.updateTienda(tienda).subscribe(x => {
      alert('Se actualizó correctamente');
      this.back();
    })
  }

  getTiendaById():void{
    this.appService.getTiendaById(this.activatedRouter.snapshot.params['id']).subscribe(listTienda => {
      this.formTienda = this.formBuilder.group({
        nombre: [{value: listTienda.nombre, disabled: false}, [Validators.required]],
        direccion: [{value: listTienda.direccion, disabled: false}, [Validators.required]],
        objetivo: [{value: listTienda.objetivo, disabled: false}, [Validators.required]]
      })
    })
  }
}
