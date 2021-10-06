import { Component, OnInit } from '@angular/core';

import { ObjectId } from 'mongoose';

import { Notificacion } from '../../../../models/notificacion.model';
import { Buzon } from '../../../../models/buzon.model';

import { NotificacionService } from '../../../../services/private/notificacion.service';
import { UtilsService } from '../../../../services/utils.service';
import { BuzonService } from '../../../../services/private/buzon.service';
import { ActorService } from '../../../../services/private/actor.service';
import swal from 'sweetalert2';

import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-notificacion-list',
  templateUrl: './notificacion-list.component.html',
  styleUrls: ['./notificacion-list.component.css'],
})
export class NotificacionListComponent implements OnInit {
  public notificaciones: Notificacion[];
  public buzonesCreados: Buzon[];
  public buzonSistema: boolean = false;
  public formEnviado: boolean = false;
  public renderizarMoverABuzon: boolean = false;
  private notificacionesSeleccionadas: string[] = [];
  private buzonActual: Buzon;
  public buzonesDestinos: Buzon[];
  public notificacionForm: FormGroup;

  constructor(
    private notificacionService: NotificacionService,
    private buzonService: BuzonService,
    private actorService: ActorService,
    private utils: UtilsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getMisBuzonesCreados();
    this.getMisNotificacionesEntrada();
    this.notificacionForm = this.fb.group({
      notificaciones: new FormArray([]),
      buzon: ['', Validators.required],
    });
    this.renderizarMoverABuzon = false;
    this.formEnviado = false;
  }

  public getMisNotificacionesEntrada(): void {
    this.buzonService.getBuzonEntrada().subscribe((buzon) => {
      this.notificacionService
        .getNotificacionesByBuzon(buzon._id)
        .subscribe((notificaciones) => {
          notificaciones.forEach((notificacion) => {
            const idActorEmisor =
              notificacion.emisorMiembro || notificacion.emisorVisitante;
            const idObject = this.utils.convertirObjectId(
              idActorEmisor.toString()
            );
            this.actorService.getDatos(idObject).subscribe((actor) => {
              if (actor.rol === 'VISITANTE') {
                notificacion.emisorVisitante = actor;
              } else {
                notificacion.emisorMiembro = actor;
              }
            });
          });
          this.buzonActual = buzon;
          this.notificaciones = notificaciones;
          this.buzonSistema = true;
          this.addCheckboxes();
          this.renderizarMoverABuzon = false;
          this.formEnviado = false;
        });
    });
  }

  public getMisNotificacionesSalida(): void {
    this.buzonService.getBuzonSalida().subscribe((buzon) => {
      this.notificacionService
        .getNotificacionesByBuzon(buzon._id)
        .subscribe((notificaciones) => {
          notificaciones.forEach((notificacion) => {
            const idActorEmisor =
              notificacion.emisorMiembro || notificacion.emisorVisitante;
            const idObject = this.utils.convertirObjectId(
              idActorEmisor.toString()
            );
            this.actorService.getDatos(idObject).subscribe((actor) => {
              if (actor.rol === 'VISITANTE') {
                notificacion.emisorVisitante = actor;
              } else {
                notificacion.emisorMiembro = actor;
              }
            });
          });
          this.buzonActual = buzon;
          this.notificaciones = notificaciones;
          this.buzonSistema = true;
          this.addCheckboxes();
          this.renderizarMoverABuzon = false;
          this.formEnviado = false;
        });
    });
  }

  public getMisNotificacionesPapelera(): void {
    this.buzonService.getBuzonPapelera().subscribe((buzon) => {
      this.notificacionService
        .getNotificacionesByBuzon(buzon._id)
        .subscribe((notificaciones) => {
          notificaciones.forEach((notificacion) => {
            const idActorEmisor =
              notificacion.emisorMiembro || notificacion.emisorVisitante;
            const idObject = this.utils.convertirObjectId(
              idActorEmisor.toString()
            );
            this.actorService.getDatos(idObject).subscribe((actor) => {
              if (actor.rol === 'VISITANTE') {
                notificacion.emisorVisitante = actor;
              } else {
                notificacion.emisorMiembro = actor;
              }
            });
          });
          this.buzonActual = buzon;
          this.notificaciones = notificaciones;
          this.buzonSistema = true;
          this.addCheckboxes();
          this.renderizarMoverABuzon = false;
          this.formEnviado = false;
        });
    });
  }

  public getMisBuzonesCreados(): void {
    this.buzonService.getMisBuzonesCreados().subscribe((buzones) => {
      this.buzonesCreados = buzones;
    });
  }

  public getMisNotificacionesBuzon(buzonId: string): void {
    const idObject = this.utils.convertirObjectId(buzonId);
    if (idObject !== undefined) {
      this.notificacionService
        .getNotificacionesByBuzon(idObject)
        .subscribe((notificaciones) => {
          notificaciones.forEach((notificacion) => {
            const idActorEmisor =
              notificacion.emisorMiembro || notificacion.emisorVisitante;
            const idObject = this.utils.convertirObjectId(
              idActorEmisor.toString()
            );
            this.actorService.getDatos(idObject).subscribe((actor) => {
              if (actor.rol === 'VISITANTE') {
                notificacion.emisorVisitante = actor;
              } else {
                notificacion.emisorMiembro = actor;
              }
            });
          });
          this.buzonService.getBuzon(idObject).subscribe((buzon) => {
            this.buzonActual = buzon;
          });
          this.notificaciones = notificaciones;
          this.buzonSistema = false;
          this.addCheckboxes();
          this.renderizarMoverABuzon = false;
          this.formEnviado = false;
        });
    }
  }

  public notificacionesFormArray() {
    return this.notificacionForm.controls.notificaciones as FormArray;
  }

  private addCheckboxes() {
    this.notificacionesFormArray().clear();
    this.notificaciones.forEach(() =>
      this.notificacionesFormArray().push(new FormControl(false))
    );
  }

  public onSubmit(event): void {
    if (event.submitter.name.length !== 0) {
      this.notificacionesSeleccionadas =
        this.notificacionForm.value.notificaciones
          .map((checked, i) => (checked ? this.notificaciones[i]._id : null))
          .filter((v) => v !== null);
      if (this.notificacionesSeleccionadas.length !== 0) {
        const data = new FormData();
        for (let i = 0; i < this.notificacionesSeleccionadas.length; i++) {
          data.append('notificaciones[]', this.notificacionesSeleccionadas[i]);
        }
        if (event.submitter.name === 'mover') {
          this.utils.refrescarSelectPicker('buzon');
          this.buzonService.getBuzones().subscribe((buzones) => {
            buzones.forEach((buzon, index) => {
              if (buzon._id === this.buzonActual._id) buzones.splice(index, 1);
            });
            this.buzonService.getBuzonPapelera().subscribe((papelera) => {
              buzones.forEach((buzon, index) => {
                if (buzon._id === papelera._id) buzones.splice(index, 1);
              });
            });
            this.buzonesDestinos = buzones;
          });
          this.renderizarMoverABuzon = true;
        }
        if (event.submitter.name === 'moverFinal') {
          this.formEnviado = true;
          if (this.notificacionForm.valid) {
            data.append('buzon', this.notificacionForm.get('buzon').value);
            this.notificacionService.moverNotificaciones(data).subscribe(
              () => {
                swal
                  .fire(
                    'Notificaciones movidas',
                    'Se han movido las notificaciones al buzón indicado correctamente',
                    'success'
                  )
                  .then(() => this.ngOnInit());
              },
              (error) => {
                swal.fire('Error', error.error.error, 'error');
              }
            );
          }
        }
        if (event.submitter.name === 'eliminar') {
          swal
            .fire({
              title: '¿Estás seguro de eliminar las notificaciones marcadas?',
              text: 'No habrá forma de reventir esto',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#06d79c',
              cancelButtonColor: '#2f3d4a',
              confirmButtonText: 'Sí, eliminar',
            })
            .then((res) => {
              if (res.isConfirmed) {
                this.notificacionService.eliminarNotificaciones(data).subscribe(
                  () => {
                    swal
                      .fire(
                        'Datos eliminados',
                        'Las notificaciones seleccionadas se han eliminado correctamente',
                        'success'
                      )
                      .then(() => this.ngOnInit());
                  },
                  (error) => {
                    swal.fire('Error', error.error.error, 'error');
                  }
                );
              }
            });
        }
      } else {
        swal.fire(
          'Error',
          'Necesitas marcar al menos una notificación',
          'error'
        );
      }
    }
  }

  public eliminarBuzon(id: string): void {
    const idObject = this.utils.convertirObjectId(id);
    if (idObject !== undefined) {
      swal
        .fire({
          title: '¿Estás seguro de eliminar el buzón?',
          text: 'No habrá forma de reventir esto',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#06d79c',
          cancelButtonColor: '#2f3d4a',
          confirmButtonText: 'Sí, eliminar',
        })
        .then((res) => {
          if (res.isConfirmed) {
            this.buzonService.eliminarBuzon(idObject).subscribe(
              () => {
                swal
                  .fire(
                    'Datos eliminados',
                    'Se ha eliminado el buzón correctamente',
                    'success'
                  )
                  .then(() => this.ngOnInit());
              },
              (error) => {
                swal.fire('Error', error.error.error, 'error');
              }
            );
          }
        });
    }
  }

  public cancelarMover(): void {
    this.renderizarMoverABuzon = false;
    this.formEnviado = false;
    this.notificacionForm.get('buzon').setValue(null);
  }

  public validarCampo(campo: string): boolean {
    return this.notificacionForm.get(campo).invalid ? true : false;
  }
}
