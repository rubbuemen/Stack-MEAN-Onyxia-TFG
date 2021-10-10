import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { BehaviorSubject, Subject } from 'rxjs';

const mongoose = require('mongoose');

declare const jQuery: any;

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(private sanitizer: DomSanitizer, private router: Router) {}

  public configurarOpcionesTabla(): DataTables.Settings {
    let dtOptions: DataTables.Settings = {};
    dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      columnDefs: [
        {
          targets: 'no-sort',
          orderable: false,
        },
      ],
      language: {
        url: '//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json',
      },
    };
    return dtOptions;
  }

  public usarImagenBase64(imagen: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(imagen);
  }

  public convertirImagenBase64(file): Promise<any> {
    const reader = new FileReader();
    const imagen = new Promise((resolve, reject) => {
      reader.addEventListener(
        'load',
        function () {
          resolve(reader.result);
        },
        false
      );
      reader.addEventListener(
        'error',
        function (event) {
          reject(event);
        },
        false
      );

      reader.readAsDataURL(file);
    });
    return imagen;
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

  public existe(campo: string) {
    return (
      campo !== undefined && campo !== null && campo !== '' && campo !== ' '
    );
  }

  public setearImagenFileHtml(imagen: string) {
    (function ($) {
      var nameImage = imagen;
      $('.dropify').dropify();
      resetPreview('File', nameImage, 'Image.jpg');

      function resetPreview(name, src, fname = '') {
        let input = $('input[name="' + name + '"]');
        let wrapper = input.closest('.dropify-wrapper');
        let preview = wrapper.find('.dropify-preview');
        let filename = wrapper.find('.dropify-filename-inner');
        let render = wrapper.find('.dropify-render').html('');

        input.val('').attr('title', fname);
        wrapper.removeClass('has-error').addClass('has-preview');
        filename.html(fname);

        render.append(
          $('<img />')
            .attr('src', src)
            .css('max-height', input.data('height') || '')
        );
        preview.fadeIn();
      }
    })(jQuery);
  }

  public refrescarSelectPicker(nombreId: string) {
    setTimeout(() => {
      (function ($) {
        $('#' + nombreId).selectpicker('refresh');
      })(jQuery);
    }, 500);
  }

  public eliminarElementoJquery(nombreId: string) {
    (function ($) {
      $('#' + nombreId).remove();
    })(jQuery);
  }

  public generarFormData(
    formGroup: FormGroup,
    propiedades: string[],
    propiedadesArray: string[] = []
  ) {
    const formData = new FormData();
    propiedades.forEach((propiedad) => {
      if (formGroup.get(propiedad).value !== null) {
        if (propiedadesArray.includes(propiedad)) {
          const valorArray = formGroup.get(propiedad).value;
          for (let i = 0; i < valorArray.length; i++) {
            formData.append(propiedad + '[]', valorArray[i]);
          }
        } else {
          formData.append(propiedad, formGroup.get(propiedad).value);
        }
      }
    });
    return formData;
  }

  public obtenerPropiedadesFormGroup(formGroup: FormGroup) {
    const propiedades: string[] = [];
    for (const propiedad in formGroup.controls) {
      propiedades.push(propiedad);
    }
    return propiedades;
  }
}
