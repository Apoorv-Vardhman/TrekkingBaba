import {Component, OnInit} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationStart, Router} from "@angular/router";
import { filter } from 'rxjs/operators';
declare let $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'frontend';
  location: any;
  routerSubscription: any;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.recallJsFuntions();
  }

  recallJsFuntions() {
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd || event instanceof NavigationCancel))
      .subscribe(event => {
        $.getScript('../assets/js/main.js');
        if (!(event instanceof NavigationEnd)) {
          return;
        }
        window.scrollTo(0, 0);
      });
  }
}
