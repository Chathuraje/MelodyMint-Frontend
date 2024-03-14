import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {


  isNavbarCollapsed = false;
  constructor(private router: Router,
    ) {
   }


  ngOnInit(): void {

  }
  onRegister() {
    this.router.navigate(['/registration']);
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

}
