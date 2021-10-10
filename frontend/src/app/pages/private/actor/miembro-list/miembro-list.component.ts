import { Component, OnDestroy, OnInit } from '@angular/core';
import { Miembro } from '../../../../models/miembro.model';
import { MiembroService } from '../../../../services/private/miembro.service';
import { UtilsService } from '../../../../services/utils.service';

import { ObjectId } from 'mongoose';
import swal from 'sweetalert2';

import { Subject } from 'rxjs';
import { ActorService } from '../../../../services/private/actor.service';
import { CuentaUsuarioService } from '../../../../services/private/cuenta-usuario.service';
import { Console } from 'console';

@Component({
  selector: 'app-miembro-list',
  templateUrl: './miembro-list.component.html',
})
export class MiembroListComponent implements OnDestroy, OnInit {
  public actorLogeado: Miembro;
  public miembros: Miembro[] = [];
  private idObject: ObjectId;

  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any>;

  constructor(
    private actorService: ActorService,
    private cuentaUsuarioService: CuentaUsuarioService,
    private miembroService: MiembroService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.getMisDatos();
    this.dtTrigger = new Subject<any>();
    this.dtOptions = this.utils.configurarOpcionesTabla();
    this.getMiembros();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  private getMisDatos(): void {
    this.actorService.getMisDatos().subscribe((actor) => {
      this.actorLogeado = actor;
    });
  }

  private getMiembros(): void {
    this.miembroService.getMiembros().subscribe((miembros) => {
      this.miembros = miembros;
      this.dtTrigger.next();
    });
  }

  public banearDesbanearMiembro(id: string): void {
    this.idObject = this.utils.convertirObjectId(id);
    if (this.idObject !== undefined) {
      this.miembroService.getMiembro(this.idObject).subscribe((miembro) => {
        const titleBan = miembro.cuentaUsuario.estado ? 'banear' : 'desbanear';
        const textoBan = miembro.cuentaUsuario.estado
          ? 'perderá'
          : 'recuperará';
        swal
          .fire({
            title: '¿Estás seguro de ' + titleBan + ' este miembro?',
            text: 'Dicho miembro ' + textoBan + ' el acceso a la plataforma',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#06d79c',
            cancelButtonColor: '#2f3d4a',
            confirmButtonText: 'Sí, confirmar',
          })
          .then((res) => {
            if (res.isConfirmed) {
              if (miembro.cuentaUsuario.estado) {
                this.cuentaUsuarioService
                  .banearUsuario(miembro.cuentaUsuario._id)
                  .subscribe(
                    () => {
                      swal
                        .fire(
                          'Miembro baneado',
                          'Se ha baneado al miembro correctamente',
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
                  .desbanearUsuario(miembro.cuentaUsuario._id)
                  .subscribe(
                    () => {
                      swal
                        .fire(
                          'Miembro desbaneado',
                          'Se ha desbaneado al miembro correctamente',
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

  public penalizarMiembro(id: string): void {
    this.idObject = this.utils.convertirObjectId(id);
    if (this.idObject !== undefined) {
      this.miembroService.getMiembro(this.idObject).subscribe((miembro) => {
        swal
          .fire({
            title: '¿Estás seguro de penalizar a este miembro?',
            text: 'Dicho miembro sumará una penalización',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#06d79c',
            cancelButtonColor: '#2f3d4a',
            confirmButtonText: 'Sí, confirmar',
          })
          .then((res) => {
            if (res.isConfirmed) {
              this.miembroService.penalizarMiembro(miembro._id).subscribe(
                () => {
                  swal
                    .fire(
                      'Miembro penalizado',
                      'Se ha penalizado a este miembro correctamente',
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
}
