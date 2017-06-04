import { Directive, ElementRef, Input, Component } from '@angular/core';
import { Kampagne } from './../kampagne';
import { trigger, style, transition, animate, group }
    from '@angular/animations';

@Component({
  selector: 'kampagnen-view',
  template: `
    <div class="row">
          <div *ngFor="let kampagne of kampagnen" class="col-6 col-md-3 kampagnen-teaser" [routerLink]=" ['/view', kampagne.id] " [@itemAnim]>
              <img class="card-img-top" src="{{kampagne.thumbnail}}" alt="">
              <div class="card-block">
                <h4 class="card-title">{{kampagne.title}}<br /><small>{{kampagne.subtitle}}</small></h4>
              </div>
          </div>
        </div>
  `,
  animations: [
    trigger('itemAnim', [
      transition('void => *', [
        style({opacity: 0}),
        animate(350)
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate(350)
      ]),

    ])
  ]
})

export class KampagnenViewDirective {
  @Input('kampagnen') kampagnen: Kampagne[];

  constructor(el: ElementRef) {
  
  }



}
