import { Component, OnDestroy, OnInit } from '@angular/core';
import { Evento } from '../../../../models/evento.model';
import { EventoService } from '../../../../services/private/evento.service';
import { UtilsService } from '../../../../services/utils.service';

import { ObjectId } from 'mongoose';
import swal from 'sweetalert2';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-evento-list',
  templateUrl: './evento-list.component.html',
  styles: [],
})
export class EventoListComponent implements OnDestroy, OnInit {
  public eventos: Evento[];
  private idObject: ObjectId;

  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any>;

  constructor(
    private eventoService: EventoService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.dtTrigger = new Subject<any>();
    this.dtOptions = this.utils.configurarOpcionesTabla();
    this.getEventos();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  private getEventos(): void {
    this.eventoService.getEventos().subscribe((eventos) => {
      eventos.forEach((evento) => {
        evento.estadoEvento =
          evento.estadoEvento[0].toUpperCase() +
          evento.estadoEvento.substr(1).toLowerCase();
      });
      this.eventos = eventos;
      this.dtTrigger.next();
    });
  }

  public cancelarEvento(id: string): void {
    this.idObject = this.utils.convertirObjectId(id);
    if (this.idObject !== undefined) {
      this.eventoService.getEvento(this.idObject).subscribe((evento) => {
        swal
          .fire({
            title: '¿Estás seguro de cancelar este evento?',
            text: 'Dicho evento no podrá gestionarse más',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#06d79c',
            cancelButtonColor: '#2f3d4a',
            confirmButtonText: 'Sí, cancelar',
          })
          .then((res) => {
            if (res.isConfirmed) {
              this.eventoService.cancelarEvento(evento._id).subscribe(
                () => {
                  swal
                    .fire(
                      'Evento cancelado',
                      'Se ha cancelado el evento correctamente',
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
      });
    }
  }

  public publicarOcultarEvento(id: string): void {
    this.idObject = this.utils.convertirObjectId(id);
    if (this.idObject !== undefined) {
      this.eventoService.getEvento(this.idObject).subscribe((evento) => {
        const titlePublicada = evento.estaPublicado
          ? 'pasar a borrador'
          : 'publicar';
        const textoNoPublicada = evento.estaPublicado
          ? 'dejará de ser visible'
          : 'pasará a ser visible';
        swal
          .fire({
            title: '¿Estás seguro de ' + titlePublicada + ' este evento?',
            text: 'Dicho evento ' + textoNoPublicada + ' en la parte pública',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#06d79c',
            cancelButtonColor: '#2f3d4a',
            confirmButtonText: 'Sí, confirmar',
          })
          .then((res) => {
            if (res.isConfirmed) {
              if (evento.estaPublicado) {
                this.eventoService.ocultarEvento(evento._id).subscribe(
                  () => {
                    swal
                      .fire(
                        'Evento pasado a borrador',
                        'Se ha pasado a borrador el evento correctamente',
                        'success'
                      )
                      .then(() => this.ngOnInit());
                  },
                  (error) => {
                    swal.fire('Error', error.error.error, 'error');
                  }
                );
              } else {
                this.eventoService.publicarEvento(evento._id).subscribe(
                  () => {
                    swal
                      .fire(
                        'Evento publicado',
                        'Se ha publicado el evento correctamente',
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
          });
      });
    }
  }

  public eliminarEvento(id: string): void {
    this.idObject = this.utils.convertirObjectId(id);
    if (this.idObject !== undefined) {
      swal
        .fire({
          title: '¿Estás seguro de eliminar el evento?',
          text: 'No habrá forma de reventir esto',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#06d79c',
          cancelButtonColor: '#2f3d4a',
          confirmButtonText: 'Sí, eliminar',
        })
        .then((res) => {
          if (res.isConfirmed) {
            this.eventoService.eliminarEvento(this.idObject).subscribe(
              () => {
                swal
                  .fire(
                    'Datos eliminados',
                    'Se ha eliminado el evento correctamente',
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
}
