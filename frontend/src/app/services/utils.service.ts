import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

const mongoose = require('mongoose');

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(private sanitizer: DomSanitizer, private router: Router) {}

  public usarImagenBase64(imagen: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(imagen);
  }

  public convertirObjectId(id: string) {
    try {
      const idObject = mongoose.Types.ObjectId(id);
      return idObject;
    } catch (error) {
      this.router.navigate(['/']);
      return undefined;
    }
  }
}
