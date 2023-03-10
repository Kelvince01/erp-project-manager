import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `<div class="container text-center">
    <h2>{{ title }}</h2>
    <img
      alt="Page not found"
      class="img-responsive text-center"
      src="../../../../assets/images/404-Page-Not-Found.png"
    />
    <h4>{{ message }}</h4>
  </div>`,
  styles: [''],
})
export class PageNotFoundComponent implements OnInit {
  title!: string;
  message!: string;

  ngOnInit(): void {
    this.title = 'Page not found';
    this.message = 'Sorry, This page is not available';
  }
}
