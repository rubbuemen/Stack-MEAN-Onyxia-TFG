import { Component, OnDestroy, OnInit } from '@angular/core';
import { RedSocial } from '../../../../models/red-social.model';
import { RedSocialService } from '../../../../services/private/red-social.service';
import { UtilsService } from '../../../../services/utils.service';

import { ObjectId } from 'mongoose';
import swal from 'sweetalert2';

import { Subject } from 'rxjs';
import { ActorService } from '../../../../services/private/actor.service';
import { ActivatedRoute } from '@angular/router';
import { SharedDataService } from '../../../../services/shared-data.service';

@Component({
  selector: 'app-red-social-list',
  templateUrl: './red-social-list.component.html',
  styles: [],
})
export class RedSocialListComponent implements OnDestroy, OnInit {
  public actor: any;
  public redesSociales: RedSocial[];
  private idObjectActor: ObjectId;
  private idObjectRedSocial: ObjectId;

  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any>;

  constructor(
    private redSocialService: RedSocialService,
    private actorService: ActorService,
    private sharedDataService: SharedDataService,
    private utils: UtilsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dtTrigger = new Subject<any>();
    this.dtOptions = this.utils.configurarOpcionesTabla();
    this.route.params.subscribe((params) => {
      this.getRedesSocialesByActor(params['id']);
      this.getDatos(params['id']);
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  private getDatos(id: string): void {
    this.idObjectActor = this.utils.convertirObjectId(id);
    if (this.idObjectActor !== undefined) {
      this.actorService.getDatos(this.idObjectActor).subscribe((actor) => {
        this.actor = actor;
        this.sharedDataService.changeActor(this.actor);
      });
    }
  }

  private getRedesSocialesByActor(id: string): void {
    this.idObjectActor = this.utils.convertirObjectId(id);
    if (this.idObjectActor !== undefined) {
      this.redSocialService
        .getRedesSocialesByActor(this.idObjectActor)
        .subscribe((redesSociales) => {
          this.redesSociales = redesSociales;
          this.dtTrigger.next();
        });
    }
  }

  public eliminarRedSocial(id: string): void {
    this.idObjectRedSocial = this.utils.convertirObjectId(id);
    if (this.idObjectRedSocial !== undefined) {
      swal
        .fire({
          title: '¿Estás seguro de eliminar la red social?',
          text: 'No habrá forma de reventir esto',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#06d79c',
          cancelButtonColor: '#2f3d4a',
          confirmButtonText: 'Sí, eliminar',
        })
        .then((res) => {
          if (res.isConfirmed) {
            this.redSocialService
              .eliminarRedSocial(this.idObjectRedSocial)
              .subscribe(
                () => {
                  swal
                    .fire(
                      'Datos eliminados',
                      'Se ha eliminado la red social correctamente',
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
