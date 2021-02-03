import { Injectable } from '@angular/core';

import { RequestsConstructorService } from '../requests-constructor.service';
import { environment } from '../../../environments/environment.prod';
import { Banner } from '../../models/banner.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  constructor(private requestConstructorService: RequestsConstructorService) {}

  public getBanners(): Observable<Banner[]> {
    let banners: Banner[];
    return this.requestConstructorService
      .request('GET', `${base_url}/banner/list`, {}, {}, banners, false)
      .pipe(
        map((res: { banners: Banner[] }) =>
          res.banners.sort((a, b) => {
            return a.orden < b.orden ? -1 : 1;
          })
        )
      );
  }
}
