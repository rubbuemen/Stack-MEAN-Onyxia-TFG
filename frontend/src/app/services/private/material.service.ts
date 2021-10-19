import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment.prod';

import { RequestsConstructorService } from '../requests-constructor.service';
import { Material } from '../../models/material.model';

import { ObjectId } from 'mongoose';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  constructor(private requestConstructorService: RequestsConstructorService) {}

  public getMateriales(): Observable<Material[]> {
    return this.requestConstructorService
      .request('GET', `${base_url}/material/list`, {}, {}, true, [Material])
      .pipe(map((res: { materiales: Material[] }) => res.materiales));
  }

  public getMaterial(id: ObjectId): Observable<Material> {
    return this.requestConstructorService
      .request('GET', `${base_url}/material`, {}, {}, true, [Material], id)
      .pipe(map((res: { material: Material }) => res.material));
  }

  public getMaterialesByActividadId(
    actividadId: ObjectId
  ): Observable<Material[]> {
    return this.requestConstructorService
      .request(
        'GET',
        `${base_url}/material/list`,
        {},
        {},
        true,
        [Material],
        actividadId
      )
      .pipe(map((res: { materiales: Material[] }) => res.materiales));
  }

  public editarMaterial(data: FormData, id: ObjectId): Observable<Material> {
    return this.requestConstructorService
      .request(
        'PUT',
        `${base_url}/material/edit`,
        data,
        {},
        true,
        [Material],
        id
      )
      .pipe(map((res: { material: Material }) => res.material));
  }

  public crearMaterial(data: FormData): Observable<Material> {
    return this.requestConstructorService
      .request('POST', `${base_url}/material`, data, {}, true, [Material])
      .pipe(map((res: { material: Material }) => res.material));
  }

  public eliminarMaterial(id: ObjectId): Observable<Material> {
    return this.requestConstructorService
      .request(
        'DELETE',
        `${base_url}/material/delete`,
        {},
        {},
        true,
        [Material],
        id
      )
      .pipe(map((res: { material: Material }) => res.material));
  }
}
