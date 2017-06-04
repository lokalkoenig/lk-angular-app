import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Facet } from './facet';

@Component({
  selector: 'facets-component',
  template: `
    <div class="facets-component">
       <div *ngFor="let facet of facetitems" class="facet">
        <h5>{{facet.title}}</h5>

        <ul class="list-group">
          <li *ngFor="let item of facet.items" class="list-group-item justify-content-between"
            (click)="facetOpen(item.id)" [class.active]="item.active === true">
            {{item.label}}
            <span class="badge badge-default badge-pill">{{item.count}}</span>
          </li>
        </ul>
       </div>
    </div>
  `,
  styles: [`
    .facets-component .selected {
      font-weight: bold;
      color: Blue;
    }
  `],
})

export class FacetsComponent {
  @Input() facetitems: Facet[];
  @Output() facetClick = new EventEmitter();

  constructor() {}

  facetOpen(id: number) {
    this.facetClick.emit(id);
  }
}
