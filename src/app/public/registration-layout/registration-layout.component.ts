import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-layout',
  templateUrl: './registration-layout.component.html',
  styleUrls: ['./registration-layout.component.scss']
})
export class RegistrationLayoutComponent {

  constructor(private router: Router,
    ) {
   }


  ngOnInit(): void {

  }

  onInvenstor(){
      this.router.navigate(['/investor-registration']);
  }
  onArtist(){
    this.router.navigate(['/artist-registration']);
  }

}
