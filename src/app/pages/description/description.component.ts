import { Component, AfterViewInit} from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';


@Component({
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements AfterViewInit {

  constructor(
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller
  ) {}
  
  fragment = '';
  ngAfterViewInit(): void {
    this.route.fragment.pipe(first()).subscribe(fragment => this.viewportScroller.scrollToAnchor(this.fragment));
  }

 
}
