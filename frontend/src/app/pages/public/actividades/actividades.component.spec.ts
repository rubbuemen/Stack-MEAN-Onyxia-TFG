import {
  waitForAsync,
  ComponentFixture,
  TestBed,
  getTestBed,
} from '@angular/core/testing';

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
          asociacionesActividadMiembroTramo: [
            '617d9435116642291cadccca',
            '617d9440116642291cadccf5',
          ],
          materiales: ['617d90bb116642291cadc468'],
          _id: '617d9223116642291cadc565',
          nombre: 'Concurso de K-Pop',
          descripcion:
            'Concurso de K-pop donde se baila individualmente o en grupo',
          reglas: 'Bailar tu coreografía',
          fechaPublicacion: '2021-10-30T16:42:43.000Z',
          fotografia: 'test',
          miembroCreador: {
            tieneCochePropio: false,
            estaDeAlta: true,
            cantidadPenalizaciones: 0,
            redSocials: ['617d85de116642291cadbb8f'],
            inscripcionesEvento: [],
            asociacionesActividadMiembroTramo: [],
            asistenciasMiembroReunion: [
              '617d8d17116642291cadc0c6',
              '617d8d4c116642291cadc103',
              '617d8d78116642291cadc140',
            ],
            buzones: [
              '617d85de116642291cadbb91',
              '617d85de116642291cadbb93',
              '617d85de116642291cadbb95',
              '617d92fa116642291cadc6c7',
            ],
            _id: '617d85de116642291cadbb97',
            nombre: 'José Miguel',
            apellidos: 'Molina Montoro',
            fechaNacimiento: '1996-02-06T23:00:00.000Z',
            correoElectronico: 'josemi@gmail.com',
            numeroSocio: 3,
            fotografia: 'test',
            alias: 'josemi',
            numeroTelefono: '614262211',
            direccion: 'Pino Montano',
            dni: '81074939P',
            aficiones: 'K-pop',
            rol: 'SECRETARIO',
            fechaAlta: '2021-10-29T22:00:00.000Z',
            cuentaUsuario: '617d85de116642291cadbb8d',
            solicitudMiembro: '617d85ff116642291cadbba3',
          },
        },
      ],
    });
    expect(component.actividadesPublicas.length).toBeGreaterThan(0);
  });
});
