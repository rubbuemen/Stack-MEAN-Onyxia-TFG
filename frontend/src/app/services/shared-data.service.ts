import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  constructor() {}

  public editDataDetails: any = [];
  public subject = new Subject<any>();

  private actorSource = new BehaviorSubject(this.editDataDetails);
  private eventoSource = new BehaviorSubject(this.editDataDetails);
  private diaEventoSource = new BehaviorSubject(this.editDataDetails);

  currentActor = this.actorSource.asObservable();
  currentEvento = this.eventoSource.asObservable();
  currentDiaEvento = this.diaEventoSource.asObservable();

  changeActor(actor: any) {
    this.actorSource.next(actor);
  }

  changeEvento(evento: any) {
    this.eventoSource.next(evento);
  }

  changeDiaEvento(diaEvento: any) {
    this.diaEventoSource.next(diaEvento);
  }
}
