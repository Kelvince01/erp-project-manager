import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
})
export class PageNotFoundComponent implements OnInit {
  title!: string;
  message!: string;

  ngOnInit(): void {
    this.title = 'Page not found';
    this.message = 'Sorry, This page is not available';
  }
}