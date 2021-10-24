import { Component, OnDestroy, OnInit } from '@angular/core';
import { Banner } from '../../../../models/banner.model';
import { BannerService } from '../../../../services/private/banner.service';
import { UtilsService } from '../../../../services/utils.service';

import { ObjectId } from 'mongoose';
import swal from 'sweetalert2';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-banner-list',
  templateUrl: './banner-list.component.html',
  styles: [],
})
export class BannerListComponent implements OnDestroy, OnInit {
  public banners: Banner[];
  private idObject: ObjectId;

  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any>;

  constructor(
    private bannerService: BannerService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.dtTrigger = new Subject<any>();
    this.dtOptions = this.utils.configurarOpcionesTabla();
    this.getBanners();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  private getBanners(): void {
    this.bannerService.getBanners().subscribe((banners) => {
      banners.forEach((banner) => {
        let imagen =
          'data:' + banner.imagen.mimetype + ';base64,' + banner.imagen.data;
        const imagenSRC = this.utils.usarImagenBase64(imagen);
        banner.imagen = imagenSRC;
      });
      this.banners = banners;
      this.dtTrigger.next();
    });
  }

  public eliminarBanner(id: string): void {
    this.idObject = this.utils.convertirObjectId(id);
    if (this.idObject !== undefined) {
      swal
        .fire({
          title: '¿Estás seguro de eliminar el banner?',
          text: 'No habrá forma de reventir esto',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#06d79c',
          cancelButtonColor: '#2f3d4a',
          confirmButtonText: 'Sí, eliminar',
        })
        .then((res) => {
          if (res.isConfirmed) {
            this.bannerService.eliminarBanner(this.idObject).subscribe(
              () => {
                swal
                  .fire(
                    'Datos eliminados',
                    'Se ha eliminado el banner correctamente',
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
