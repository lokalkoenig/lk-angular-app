import { Component } from '@angular/core';

@Component({
  selector: 'no-content',
  template: `
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-3">404: page missing</h1>
        <p class="lead">Lead</p>
      </div>
    </div>  
  `
})
export class NoContentComponent {

}
