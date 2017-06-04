import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';
import { KampagnenListingComponent } from './kampagne';
import { KampagnenDetailComponent } from './kampagne/detail';
import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'search', component: KampagnenListingComponent },
  { path: 'about', component: AboutComponent },
  { path: 'view/:id', component: KampagnenDetailComponent },
  

  //{ path: 'detail', loadChildren: './+detail#DetailModule'},
  //{ path: 'barrel', loadChildren: './+barrel#BarrelModule'},
  { path: '**',    component: NoContentComponent },
];
