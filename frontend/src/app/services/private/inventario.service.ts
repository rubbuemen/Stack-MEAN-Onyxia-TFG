import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment.prod';

import { RequestsConstructorService } from '../requests-constructor.service';
import { Inventario } from '../../models/inventario.model';

import { ObjectId } from 'mongoose';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class InventarioService {
  constructor(private requestConstructorService: RequestsConstructorService) {}

  public getInventarioByMaterial(
    materialId: ObjectId
  ): Observable<Inventario[]> {
    return this.requestConstructorService
      .request(
        'GET',
        `${base_url}/inventario/list`,
        {},
        {},
        true,
        [Inventario],
        materialId
      )
      .pipe(map((res: { inventarios: Inventario[] }) => res.inventarios));
  }

  public deteriorarInventario(id: ObjectId): Observable<Inventario> {
    return this.requestConstructorService
      .request(
        'PUT',
        `${base_url}/inventario/deteriorar`,
        {},
        {},
        true,
        [Inventario],
        id
      )
      .pipe(map((res: { inventario: Inventario }) => res.inventario));
  }

  public arreglarInventario(id: ObjectId): Observable<Inventario> {
    return this.requestConstructorService
      .request(
        'PUT',
        `${base_url}/inventario/arreglar`,
        {},
        {},
        true,
        [Inventario],
        id
      )
      .pipe(map((res: { inventario: Inventario }) => res.inventario));
  }

  public getInventario(id: ObjectId): Observable<Inventario> {
    return this.requestConstructorService
      .request('GET', `${base_url}/inventario`, {}, {}, true, [Inventario], id)
      .pipe(map((res: { inventario: Inventario }) => res.inventario));
  }

  public descatalogarInventario(id: ObjectId): Observable<Inventario> {
    return this.requestConstructorService
      .request(
        'DELETE',
        `${base_url}/inventario/delete`,
        {},
        {},
        true,
        [Inventario],
        id
      )
      .pipe(map((res: { inventario: Inventario }) => res.inventario));
  }

  public añadirInventarioParaMaterial(
    data: FormData,
    materialId: ObjectId
  ): Observable<Inventario> {
    return this.requestConstructorService
      .request(
        'POST',
        `${base_url}/inventario`,
        data,
        {},
        true,
        [Inventario],
        materialId
      )
      .pipe(map((res: { inventario: Inventario }) => res.inventario));
  }
}
