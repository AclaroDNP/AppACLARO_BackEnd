import { Component } from '@angular/core';
import { ActivationEnd, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})

export class BreadcrumbComponent  {

  public titulo = '';

  constructor( private router: Router){
    this.getArgumentoRuta();
  }

  getArgumentoRuta() {
    this.router.events
    .pipe(
      filter((event): event is ActivationEnd => event instanceof ActivationEnd),
      filter((event:ActivationEnd) => event.snapshot.firstChild === null ),
      map((event:ActivationEnd) => event.snapshot.data)
    ).subscribe( 
      ({ titulo }) => {
      this.titulo = titulo
    });
  }

}
