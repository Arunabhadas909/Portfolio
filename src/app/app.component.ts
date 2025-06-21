import { Component, OnInit } from '@angular/core';

import * as AOS from 'aos'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'user';

    ngOnInit(): void {
    AOS.init({
      duration: 1000,     // animation duration
      easing: 'ease-in-out', // easing option
      once: true          // whether animation should happen only once
    });
  }
}
