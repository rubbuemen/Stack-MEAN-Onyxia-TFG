import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(private sanitizer: DomSanitizer) {}

  public usarImagenBase64(imagen: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(imagen);
  }
}
