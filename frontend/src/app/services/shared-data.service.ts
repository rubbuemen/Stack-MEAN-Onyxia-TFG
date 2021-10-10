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
  currentActor = this.actorSource.asObservable();

  changeActor(actor: any) {
    this.actorSource.next(actor);
  }
}
