import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment.prod';

import { RequestsConstructorService } from '../requests-constructor.service';
import { Banner } from '../../models/banner.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  constructor(private requestConstructorService: RequestsConstructorService) { }

  public getBanners(): Observable<Banner[]> {
    return this.requestConstructorService.request('GET', `${base_url}/banner/list`, {}, {}, false, [Banner])
      .pipe(map((res: { banners: Banner[] }) =>
        res.banners.sort((a, b) => {
          return a.orden < b.orden ? -1 : 1;
        })
      ));
  }

}
