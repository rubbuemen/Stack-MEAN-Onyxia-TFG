import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ObjectId } from 'mongoose';
import { Material } from '../../../../models/material.model';
import { MaterialService } from '../../../../services/private/material.service';
import { UtilsService } from '../../../../services/utils.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-material-form',
  templateUrl: './material-form.component.html',
  styles: [],
})
export class MaterialFormComponent implements OnInit {
  public material: Material;
  public edicion: boolean = true;
  public formEnviado: boolean = false;
  public materialForm: FormGroup;
  private idObject: ObjectId;

  constructor(
    private materialService: MaterialService,
    private utils: UtilsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.getMaterial(params['id']);
      } else {
        this.edicion = false;
        this.utils.refrescarSelectPicker('estadoMaterial');
        this.utils.refrescarSelectPicker('esPropio');
        this.utils.resetDropify();
      }
      this.materialForm = this.generarMaterialForm();
    });
  }

  private generarMaterialForm(): FormGroup {
    if (!this.edicion) {
      return this.fb.group({
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
        estadoMaterial: ['', Validators.required],
        esPropio: ['', Validators.required],
        fotografia: [''],
      });
    } else {
      return this.fb.group({
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
        fotografia: [''],
      });
    }
  }

  private getMaterial(id: string): void {
    this.idObject = this.utils.convertirObjectId(id);
    if (this.idObject !== undefined) {
      this.materialService.getMaterial(this.idObject).subscribe(
        (material) => {
          this.material = material;
          this.materialForm.get('nombre').setValue(this.material.nombre);
          this.materialForm
            .get('descripcion')
            .setValue(this.material.descripcion);
          let imagen =
            'data:' +
            material.fotografia.mimetype +
            ';base64,' +
            material.fotografia.data;
          this.utils.setearImagenFileHtml(imagen);
        },
        (error) => {
          this.router.navigate(['/private']);
        }
      );
    }
  }

  public guardarForm(): void {
    this.formEnviado = true;
    if (this.materialForm.valid) {
      const data = this.utils.generarFormData(
        this.materialForm,
        this.utils.obtenerPropiedadesFormGroup(this.materialForm)
      );
      if (this.edicion) {
        this.materialService.editarMaterial(data, this.idObject).subscribe(
          (res) => {
            swal
              .fire(
                'Datos editados',
                'Se ha editado el material correctamente',
                'success'
              )
              .then(() => this.router.navigate(['/private/material']));
          },
          (error) => {
            swal.fire('Error', error.error.error, 'error');
          }
        );
      } else {
        if (this.materialForm.get('fotografia').value) {
          this.materialService.crearMaterial(data).subscribe(
            (res) => {
              swal
                .fire(
                  'Datos creados',
                  'Se ha creado el material correctamente',
                  'success'
                )
                .then(() => this.router.navigate(['/private/material']));
            },
            (error) => {
              swal.fire('Error', error.error.error, 'error');
            }
          );
        } else {
          swal.fire(
            'Error',
            'Inserta una fotografía para el material',
            'error'
          );
        }
      }
    }
  }

  onFileChange(event) {
    if (event.target['files'].length > 0) {
      const file = event.target['files'][0];
      this.materialForm.get('fotografia').setValue(file);
      this.materialForm.get('fotografia').updateValueAndValidity();
    }
  }

  public validarCampo(campo: string): boolean {
    return this.materialForm.get(campo).invalid ? true : false;
  }
}
