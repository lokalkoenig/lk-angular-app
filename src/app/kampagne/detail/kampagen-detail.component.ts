import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fadeInAnimation } from '../../_animations/fade-in.animation';
import { KampagnenSearchService } from './../kampagnen-search.service';
import { KampagnenEntity } from './../entity/KampagnenEntity';
import { Observable }        from 'rxjs/Observable';
import { AppComponent } from './../../app.component';

@Component({
  selector: 'kampagnen-detail',
  templateUrl: './kampagnen-detail.component.html',
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' },
})

export class KampagnenDetailComponent implements OnInit {
  
  public kampagne: Observable<KampagnenEntity>;
  public data = new KampagnenEntity;
  public id: Observable<number>;

  constructor(
      public route: ActivatedRoute,
      private KampagnenSearchService: KampagnenSearchService,
      private main: AppComponent) {}

  public markKampagne() {
    this.data.marked = this.main.toggleKampagne(this.data.id);
  }

  public ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = params.id;
      this.kampagne = this.KampagnenSearchService.getId(params.id);
      this.kampagne.subscribe((data) => {
        this.data = data;

        if (this.main.isMarked(data.id)) {
          this.data.marked = true;
        }

        return data;
      });
    });
  }
}

