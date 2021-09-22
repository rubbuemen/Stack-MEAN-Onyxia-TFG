import { Component, OnInit } from '@angular/core';
import { ActorService } from 'src/app/services/private/actor.service';

@Component({
  selector: 'app-inicio-private',
  templateUrl: './inicio.component.html',
  styles: [],
})
export class InicioPrivateComponent implements OnInit {
  public actor: any;

  constructor(private actorService: ActorService) {}

  ngOnInit(): void {
    this.getMisDatos();
  }

  private getMisDatos(): void {
    this.actorService.getMisDatos().subscribe((actor) => {
      this.actor = actor;
    });
  }
}
