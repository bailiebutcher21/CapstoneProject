import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  activeLinkIndex: number = -1;
  navLinks: Array<{
    label: string;
    link: string;
    index: number;
  }> = [
    {
      label: 'Movies',
      link: './movies',
      index: 0
    },
    {
      label: 'Profile',
      link: './profile',
      index: 1
    }
  ];
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(res => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

}
