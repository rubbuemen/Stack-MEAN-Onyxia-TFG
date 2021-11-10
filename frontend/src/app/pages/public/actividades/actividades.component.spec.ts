import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTablesModule } from 'angular-datatables';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPaginationModule } from 'ngx-pagination';

import { ActividadesPublicComponent } from './actividades.component';

import { ActividadService } from 'src/app/services/public/actividad.service';
import { UtilsService } from '../../../services/utils.service';
import { RequestsConstructorService } from 'src/app/services/requests-constructor.service';

describe('Componente público de listado de actividades', () => {
  let component: ActividadesPublicComponent;
  let fixture: ComponentFixture<ActividadesPublicComponent>;
  let httpMock: HttpTestingController;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ActividadesPublicComponent],
        providers: [ActividadService, UtilsService, RequestsConstructorService],
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
    fixture.detectChanges();
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('Debe de crearse el component', () => {
    expect(component).toBeTruthy();
  });

  it('Inicio de datos y listar actividades públicas', () => {
    let actividadesRequest = httpMock.expectOne(
      'http://localhost:3000/actividad/listPub'
    );
    actividadesRequest.flush({
      actividades: [
        {
          estaPublicado: true,
          enVigor: true,
          asociacionesActividadMiembroTramo: [],
          materiales: [],
          _id: '617d9223116642291cadc565',
          nombre: 'Test',
          descripcion: 'Test',
          reglas: 'Test',
          fechaPublicacion: '2021-10-30T16:42:43.000Z',
          fotografia: 'Test',
          miembroCreador: {
            tieneCochePropio: true,
            estaDeAlta: true,
            cantidadPenalizaciones: 0,
            redSocials: [],
            inscripcionesEvento: [],
            asociacionesActividadMiembroTramo: [],
            asistenciasMiembroReunion: [],
            buzones: [],
            _id: '617d85de116642291cadbb97',
            nombre: 'Test',
            apellidos: 'Test',
            fechaNacimiento: '1996-02-06T23:00:00.000Z',
            correoElectronico: 'Test',
            numeroSocio: 3,
            fotografia: 'Test',
            alias: 'Test',
            numeroTelefono: '614262211',
            direccion: 'Test',
            dni: '81074939P',
            aficiones: 'K-pop',
            rol: 'SECRETARIO',
            fechaAlta: '2021-10-29T22:00:00.000Z',
            cuentaUsuario: 'Test',
            solicitudMiembro: 'Test',
          },
        },
      ],
    });
    expect(component.actividadesPublicas.length).toBeGreaterThan(0);
  });
});
