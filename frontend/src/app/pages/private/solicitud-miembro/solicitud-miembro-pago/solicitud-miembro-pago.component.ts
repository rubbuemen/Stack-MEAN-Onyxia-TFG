import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { SolicitudMiembroService } from '../../../../services/private/solicitud-miembro.service';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { UtilsService } from 'src/app/services/utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ObjectId } from 'mongoose';
import swal from 'sweetalert2';
import { ActorService } from 'src/app/services/private/actor.service';
import { Visitante } from '../../../../models/visitante.model';

@Component({
  selector: 'app-solicitud-miembro-pago',
  templateUrl: './solicitud-miembro-pago.component.html',
  styleUrls: ['./solicitud-miembro-pago.component.css'],
})
export class SolicitudMiembroPagoComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  public formEnviado: boolean = false;

  public cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
  };

  public elementsOptions: StripeElementsOptions = {
    locale: 'es',
  };

  public actorLogeado: Visitante;
  public stripeForm: FormGroup;
  private idObject: ObjectId;

  constructor(
    private actorService: ActorService,
    private fb: FormBuilder,
    private stripeService: StripeService,
    private solicitudMiembroService: SolicitudMiembroService,
    private utils: UtilsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMisDatos();
    this.stripeForm = this.fb.group({
      nombre: ['', [Validators.required]],
      cantidad: ['10 €', [Validators.required]],
      token: [''],
    });
    this.route.params.subscribe((params) => {
      this.idObject = this.utils.convertirObjectId(params['id']);
    });
  }

  private getMisDatos(): void {
    this.actorService.getMisDatos().subscribe((actor) => {
      this.actorLogeado = actor;
      this.stripeForm
        .get('nombre')
        .setValue(this.actorLogeado.nombre + ' ' + this.actorLogeado.apellidos);
    });
  }

  public createToken(): void {
    this.formEnviado = true;
    if (this.stripeForm.valid) {
      const name = this.stripeForm.get('nombre').value;
      const currency = 'eur';
      this.stripeService
        .createToken(this.card.element, { name, currency })
        .subscribe((result) => {
          if (result.token) {
            this.stripeForm.get('cantidad').setValue(10);
            this.stripeForm.get('token').setValue(result.token.id);
            const data = this.utils.generarFormData(
              this.stripeForm,
              this.utils.obtenerPropiedadesFormGroup(this.stripeForm)
            );
            this.solicitudMiembroService
              .realizarPago(data, this.idObject)
              .subscribe(
                (res) => {
                  swal
                    .fire(
                      'Pago realizado',
                      'Se ha realizado el pago de tu solicitud correctamente',
                      'success'
                    )
                    .then(() =>
                      this.router.navigate(['/private/solicitud-miembro'])
                    );
                },
                (error) => {
                  this.stripeForm.get('cantidad').setValue('10 €');
                  swal.fire('Error', error.error.error, 'error');
                }
              );
          } else if (result.error) {
            swal.fire('Error', result.error.message, 'error');
            this.stripeForm.get('cantidad').setValue('10 €');
          }
        });
    }
  }

  public validarCampo(campo: string): boolean {
    return this.stripeForm.get(campo).invalid ? true : false;
  }
}
