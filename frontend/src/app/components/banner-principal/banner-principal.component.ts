import { Component, OnInit } from '@angular/core';
import { Banner } from 'src/app/models/banner.model';
import { BannerService } from '../../services/public/banner.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-banner-principal',
  templateUrl: './banner-principal.component.html',
  styleUrls: ['./banner-principal.component.css'],
})
export class BannerPrincipalComponent implements OnInit {
  public banners: Banner[] = [];

  constructor(private bannerService: BannerService, private utils: UtilsService) { }

  ngOnInit(): void {
    this.getBanners();
  }

  private getBanners(): void {
    this.bannerService.getBanners().subscribe((banners) => {
      banners.forEach((banner) => {
        let imagen = 'data:' + banner.imagen.mimetype + ';base64,' + banner.imagen.data;
        const imagenSRC = this.utils.usarImagenBase64(imagen);
        banner.imagen = imagenSRC;
      });
      this.banners = banners;
    });
  }
}
