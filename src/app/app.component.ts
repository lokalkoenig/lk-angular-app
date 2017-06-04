/**
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';
import { Router, NavigationEnd } from '@angular/router';
import { Kampagne } from './kampagne/kampagne';
import { trigger, state, animate, transition, style } from '@angular/animations';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  animations: [
  trigger('flyInOut', [
    state('* => *', style({transform: 'translateX(0)'})),
    transition('* => *', [
      style({transform: 'translateX(-100%)'}),
      animate(100)
    ]),
    transition('* => *', [
      animate(100, style({transform: 'translateX(100%)'}))
    ])
  ])
  ],
  template: `
    <nav class="navbar navbar-toggleable-md fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand" href="#"> <img src="{{logo}}" /></a>
         <!--
        <a [routerLink]=" ['./'] "
          routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
          Index
        </a>
        <a [routerLink]=" ['./home'] "
          routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
          Home
        </a>
        <a [routerLink]=" ['./detail'] "
          routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
          Detail
        </a>

        <a [routerLink]=" ['./barrel'] "
          routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
          Barrel
        </a>
        -->
        <a [routerLink]=" ['./about'] "
          routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
          Kontakt
        </a>
        <a [routerLink]=" ['./search'] "
          routerLinkActive="active" [routerLinkActiveOptions]= "{exact: false}">
          Suche
        </a>

        <a class="kampagnen-store float-right badge badge-pill badge-success" [@flyInOut]="marked_kampagnen.length">
          <i class="fa fa-calendar-check-o" aria-hidden="true"></i> {{marked_kampagnen.length}}
        </a>
      </div>
    </nav>

    <main>
      <router-outlet></router-outlet>
    </main>

    <footer>
      <div class="container-fluid">
        <span class="text-muted">Mediengruppe Oberfranken - Michael Capito</span>
      </div>
    </footer>
  `
})
export class AppComponent implements OnInit {
  public logo = 'http://lk-prod.dev/sites/default/files/styles/verlags-logos-klein/public/logo-design-weick-easycool.png?itok=FPF-9hQl';
  public name = 'Angular 2 Webpack Starter';
  public url = 'https://twitter.com/AngularClass';
  public marked_kampagnen = [];

  constructor(
    public appState: AppState,
    private router: Router
  ) {}

  public toggleKampagne(nid: number):boolean {

    if(!this.isMarked(nid)) {
      this.marked_kampagnen.push(nid);
    }
    else {
      var a = this.marked_kampagnen.indexOf(nid);
      this.marked_kampagnen = this.marked_kampagnen.slice(1, a);
    }

    return this.isMarked(nid);
  }


  public isMarked(nid: number):boolean {
    
    var a = this.marked_kampagnen.indexOf(nid);
    if(a === -1) {
      return false;
    }

    return true;
  }
 
  public ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
    });



  }
}

/**
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
