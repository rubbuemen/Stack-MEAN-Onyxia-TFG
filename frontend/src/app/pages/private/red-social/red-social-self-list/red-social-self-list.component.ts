import { Component, OnDestroy, OnInit } from '@angular/core';
import { RedSocial } from '../../../../models/red-social.model';
import { RedSocialService } from '../../../../services/private/red-social.service';
import { UtilsService } from '../../../../services/utils.service';

import { ObjectId } from 'mongoose';
import swal from 'sweetalert2';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-red-social-self-list',
  templateUrl: './red-social-self-list.component.html',
  styles: [],
})
export class RedSocialSelfListComponent implements OnDestroy, OnInit {
  public redesSociales: RedSocial[];
  private idObject: ObjectId;

  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any>;

  constructor(
    private redSocialService: RedSocialService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.dtTrigger = new Subject<any>();
    this.dtOptions = this.utils.configurarOpcionesTabla();
    this.getMisRedesSociales();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  private getMisRedesSociales(): void {
    this.redSocialService.getMisRedesSociales().subscribe((redesSociales) => {
      this.redesSociales = redesSociales;
      this.dtTrigger.next();
    });
  }

  public eliminarRedSocial(id: string): void {
    this.idObject = this.utils.convertirObjectId(id);
    if (this.idObject !== undefined) {
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
            this.redSocialService.eliminarRedSocial(this.idObject).subscribe(
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
