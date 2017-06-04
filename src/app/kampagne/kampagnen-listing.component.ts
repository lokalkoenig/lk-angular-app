import {
  Component,
  OnInit,
  NgModule
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Kampagne } from './kampagne';
import { ResultSet } from './result-set';

import { KampagnenSearchService } from './kampagnen-search.service';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import {Router, NavigationExtras} from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {fadeInAnimation} from '../_animations/fade-in.animation';


import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@NgModule({
  imports: [NgbModule]
})

@Component({
  selector: 'kampagnen-listing',
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' },
  styles: [`
   
  `],
  templateUrl: './templates/kampagnen-listing.component.html',
})

export class KampagnenListingComponent implements OnInit {
  public localState: any;

  public state = 'init';
  public _resultset = new ResultSet();
  public resultset: Observable<ResultSet>;
  private searchTerms = new Subject<string>();
  public sort_order = 'relevance';
  public display = 'list';
  public last_search_term = '';
  public terms = <any>[];
  public page = 1;
  public pager_size = 24;

 constructor(
    public route: ActivatedRoute,
    private KampagnenSearchService: KampagnenSearchService,
    private router: Router
  ) {

   
  }

  toggleFacetItem(id) : boolean {

    var index = this.terms.indexOf(id);
    if(index === -1) {
      this.terms.push(id);
    }
    else {
       this.terms.splice(index,1);
    }

    this.refresh();

    return false;
  }

  getQueryParams() {
    let obj = {
      sort: this.sort_order,
      display: this.display,
      terms: null,
      keys: null,
      page: this.page,
    };

    if (this.last_search_term) {
      obj.keys = this.last_search_term;
    }

    if (this.terms.length > 0) {
      obj.terms = this.terms.join('-');
    }

    return obj;
  }

  loadPage(test) {
    this.page = test;
    this.refresh();
  }

  refresh() {
    let navigationExtras: NavigationExtras = {
      queryParams: this.getQueryParams(),
    };
    
    window.scroll(0, 0);
    this.state = 'loading';
    this.router.navigate(['/search'], navigationExtras);
  }

  setHashComponent(key, hash): boolean {

    if (key === 'keys' && this.last_search_term !== hash) {
      this.last_search_term = hash;
      this.refresh();
    }

    if (key === 'sort' && this.sort_order !== hash) {
      this.sort_order = hash;
      this.refresh();
    }

    if (key === 'display' && this.display !== hash) {
      this.display = hash;
    }

    return false;
  }
  
  update() : void {
    this.resultset = this.KampagnenSearchService.search(this.getQueryParams());
    this.state = 'loading';
    
    this.resultset.subscribe((data) => {
      this._resultset = data;
      this.state = 'loaded';
      return data;
   });
 }

 resetSearchTerm() : boolean {
   this.search('');
   return false;
 }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  public ngOnInit(): void {

     this.route.queryParams.subscribe(params => {
      if(typeof params.sort === 'string') {
        this.sort_order = params.sort;
      }

      if(typeof params.page === 'string') {
        this.page = parseInt(params.page);
      }

      if(typeof params.terms === 'string') {
        this.terms = params.terms.split('-');;
      }

      if(typeof params.keys === 'string') {
        this.last_search_term = params.keys;
      }

      if(typeof params.display === 'string') {
        this.display = params.display;
      }

      this.update();
    });

    this.searchTerms.debounceTime(500).subscribe((data) => {
      this.setHashComponent('keys', data);
   });
  }
}


