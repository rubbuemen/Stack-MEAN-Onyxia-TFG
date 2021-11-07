import {
  waitForAsync,
  ComponentFixture,
  TestBed,
  getTestBed,
} from '@angular/core/testing';

import { DataTablesModule } from 'angular-datatables';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPaginationModule } from 'ngx-pagination';

import { ActividadesPublicComponent } from './actividades.component';

import { ActividadService } from 'src/app/services/public/actividad.service';
import { UtilsService } from '../../../services/utils.service';

describe('Componente público de listado de actividades', () => {
  let component: ActividadesPublicComponent;
  let fixture: ComponentFixture<ActividadesPublicComponent>;
  let actividadService: ActividadService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ActividadesPublicComponent],
        providers: [ActividadService, UtilsService],
        imports: [
          DataTablesModule,
          HttpClientTestingModule,
          RouterTestingModule,
          NgxPaginationModule,
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadesPublicComponent);
    component = fixture.componentInstance;
    actividadService = TestBed.inject(ActividadService);
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('Debe de crearse el component', () => {
    expect(component).toBeTruthy();
  });

  it('Inicio de datos y listar actividades públicas', async (done) => {
    component.ngOnInit();
    fixture.detectChanges();
    spyOn(actividadService, 'getActividadesPublicas').and.callThrough();
    fixture.whenStable().then(() => {
      console.log(component.actividadesPublicas);
      expect(component.actividadesPublicas.length).toBeGreaterThan(0);
      done();
    });
  });
});
