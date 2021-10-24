import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment.prod';

import { RequestsConstructorService } from '../requests-constructor.service';
import { Banner } from '../../models/banner.model';

import { ObjectId } from 'mongoose';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  constructor(private requestConstructorService: RequestsConstructorService) {}

  public getBanners(): Observable<Banner[]> {
    return this.requestConstructorService
      .request('GET', `${base_url}/banner/list`, {}, {}, true, [Banner])
      .pipe(map((res: { banners: Banner[] }) => res.banners));
  }

  public getBanner(id: ObjectId): Observable<Banner> {
    return this.requestConstructorService
      .request('GET', `${base_url}/banner`, {}, {}, true, [Banner], id)
      .pipe(map((res: { banner: Banner[] }) => res.banner));
  }

  public editarBanner(data: FormData, id: ObjectId): Observable<Banner> {
    return this.requestConstructorService
      .request('PUT', `${base_url}/banner/edit`, data, {}, true, [Banner], id)
      .pipe(map((res: { banner: Banner }) => res.banner));
  }

  public crearBanner(data: FormData): Observable<Banner> {
    return this.requestConstructorService
      .request('POST', `${base_url}/banner`, data, {}, true, [Banner])
      .pipe(map((res: { banner: Banner }) => res.banner));
  }

  public eliminarBanner(id: ObjectId): Observable<Banner> {
    return this.requestConstructorService
      .request(
        'DELETE',
        `${base_url}/banner/delete`,
        {},
        {},
        true,
        [Banner],
        id
      )
      .pipe(map((res: { banner: Banner }) => res.banner));
  }
}
