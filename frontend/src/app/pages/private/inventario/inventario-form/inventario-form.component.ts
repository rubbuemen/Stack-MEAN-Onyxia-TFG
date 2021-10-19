import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ObjectId } from 'mongoose';

import { Inventario } from '../../../../models/inventario.model';
import { InventarioService } from '../../../../services/private/inventario.service';
import { MaterialService } from '../../../../services/private/material.service';

import { UtilsService } from '../../../../services/utils.service';

import swal from 'sweetalert2';
import { Material } from '../../../../models/material.model';

@Component({
  selector: 'app-inventario-form',
  templateUrl: './inventario-form.component.html',
  styles: [],
})
export class InventarioFormComponent implements OnInit {
  public material: Material;
  public formEnviado: boolean = false;
  public inventarioForm: FormGroup;
  private idObject: ObjectId;

  constructor(
    private inventarioService: InventarioService,
    private materialService: MaterialService,
    private utils: UtilsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.inventarioForm = this.fb.group({
      estadoMaterial: ['', Validators.required],
      esPropio: ['', Validators.required],
    });
    this.utils.refrescarSelectPicker('estadoMaterial');
    this.utils.refrescarSelectPicker('esPropio');
    this.route.params.subscribe((params) => {
      this.getMaterial(params['materialId']);
    });
  }

  private getMaterial(id: string): void {
    this.idObject = this.utils.convertirObjectId(id);
    if (this.idObject !== undefined) {
      this.materialService.getMaterial(this.idObject).subscribe(
        (material) => {
          this.material = material;
        },
        (error) => {
          this.router.navigate(['/private']);
        }
      );
    }
  }

  public guardarForm(): void {
    this.formEnviado = true;
    if (this.inventarioForm.valid) {
      const data = this.utils.generarFormData(
        this.inventarioForm,
        this.utils.obtenerPropiedadesFormGroup(this.inventarioForm)
      );
      this.inventarioService
        .añadirInventarioParaMaterial(data, this.idObject)
        .subscribe(
          (res) => {
            swal
              .fire(
                'Datos creados',
                'Se ha aádido una unidad de inventario para este material correctamente',
                'success'
              )
              .then(() =>
                this.router.navigate(['/private/inventario', this.material._id])
              );
          },
          (error) => {
            swal.fire('Error', error.error.error, 'error');
          }
        );
    }
  }

  public validarCampo(campo: string): boolean {
    return this.inventarioForm.get(campo).invalid ? true : false;
  }
}
