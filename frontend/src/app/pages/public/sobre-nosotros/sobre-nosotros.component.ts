import { Component } from '@angular/core';
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  IconDefinition,
  faTwitch,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

import { UtilsService } from 'src/app/services/utils.service';

import { Miembro } from '../../../models/miembro.model';
import { MiembroService } from '../../../services/public/miembro.service';

@Component({
  selector: 'app-sobre-nosotros',
  templateUrl: './sobre-nosotros.component.html',
  styleUrls: ['./sobre-nosotros.component.css'],
})
export class SobreNosotrosComponent {
  public faFacebookF: IconDefinition = faFacebookF;
  public faTwitter: IconDefinition = faTwitter;
  public faInstagram: IconDefinition = faInstagram;
  public faTwitch: IconDefinition = faTwitch;
  public faYoutube: IconDefinition = faYoutube;

  public miembrosJuntaSuperior: Miembro[] = [];
  public miembrosJuntaVocales: Miembro[] = [];

  constructor(
    private miembroService: MiembroService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.getJuntaSuperior();
    this.getJuntaVocales();
  }

  private getJuntaSuperior(): void {
    this.miembroService.getJuntaSuperior().subscribe((miembros) => {
      miembros.forEach((miembro) => {
        let fotografia =
          'data:' +
          miembro.fotografia.mimetype +
          ';base64,' +
          miembro.fotografia.data;
        const imagenSRC = this.utils.usarImagenBase64(fotografia);
        miembro.fotografia = imagenSRC;
        miembro.rol = miembro.rol.toLowerCase();
      });
      this.miembrosJuntaSuperior = miembros;
    });
  }

  private getJuntaVocales(): void {
    this.miembroService.getJuntaVocales().subscribe((miembros) => {
      miembros.forEach((miembro) => {
        let fotografia =
          'data:' +
          miembro.fotografia.mimetype +
          ';base64,' +
          miembro.fotografia.data;
        const imagenSRC = this.utils.usarImagenBase64(fotografia);
        miembro.fotografia = imagenSRC;
        miembro.rol = miembro.rol.toLowerCase();
      });
      this.miembrosJuntaVocales = miembros;
    });
  }
}
