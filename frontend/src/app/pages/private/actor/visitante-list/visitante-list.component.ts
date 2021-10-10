import { Component, OnDestroy, OnInit } from '@angular/core';
import { Visitante } from '../../../../models/visitante.model';
import { VisitanteService } from '../../../../services/private/visitante.service';
import { UtilsService } from '../../../../services/utils.service';

import { ObjectId } from 'mongoose';
import swal from 'sweetalert2';

import { Subject } from 'rxjs';
import { ActorService } from '../../../../services/private/actor.service';
import { CuentaUsuarioService } from '../../../../services/private/cuenta-usuario.service';
import { SolicitudMiembroService } from '../../../../services/private/solicitud-miembro.service';

@Component({
  selector: 'app-visitante-list',
  templateUrl: './visitante-list.component.html',
})
export class VisitanteListComponent implements OnDestroy, OnInit {
  public actorLogeado: Visitante;
  public visitantes: Visitante[] = [];
  private idObject: ObjectId;

  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any>;

  constructor(
    private cuentaUsuarioService: CuentaUsuarioService,
    private visitanteService: VisitanteService,
    private solicitudMiembroService: SolicitudMiembroService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.dtTrigger = new Subject<any>();
    this.dtOptions = this.utils.configurarOpcionesTabla();
    this.getVisitantes();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  private getVisitantes(): void {
    this.visitanteService.getVisitantes().subscribe((visitantes) => {
      visitantes.forEach((visitante) => {
        this.solicitudMiembroService
          .getSolicitudActor(visitante._id)
          .subscribe((solicitud) => {
            visitante.solicitudMiembro = solicitud;
          });
      });
      this.visitantes = visitantes;
      this.dtTrigger.next();
    });
  }

  public banearDesbanearVisitante(id: string): void {
    this.idObject = this.utils.convertirObjectId(id);
    if (this.idObject !== undefined) {
      this.visitanteService
        .getVisitante(this.idObject)
        .subscribe((visitante) => {
          const titleBan = visitante.cuentaUsuario.estado
            ? 'banear'
            : 'desbanear';
          const textoBan = visitante.cuentaUsuario.estado
            ? 'perderá'
            : 'recuperará';
          swal
            .fire({
              title: '¿Estás seguro de ' + titleBan + ' este visitante?',
              text:
                'Dicho visitante ' + textoBan + ' el acceso a la plataforma',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#06d79c',
              cancelButtonColor: '#2f3d4a',
              confirmButtonText: 'Sí, confirmar',
            })
            .then((res) => {
              if (res.isConfirmed) {
                if (visitante.cuentaUsuario.estado) {
                  this.cuentaUsuarioService
                    .banearUsuario(visitante.cuentaUsuario._id)
                    .subscribe(
                      () => {
                        swal
                          .fire(
                            'Visitante baneado',
                            'Se ha baneado al visitante correctamente',
                            'success'
                          )
                          .then(() => this.ngOnInit());
                      },
                      (error) => {
                        swal.fire('Error', error.error.error, 'error');
                      }
                    );
                } else {
                  this.cuentaUsuarioService
                    .desbanearUsuario(visitante.cuentaUsuario._id)
                    .subscribe(
                      () => {
                        swal
                          .fire(
                            'Visitante desbaneado',
                            'Se ha desbaneado al visitante correctamente',
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
}
