import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FundRaisers } from 'src/app/@domain/fund-raisers';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {

  fundRaisers = [] as FundRaisers []

constructor(
  private router: Router,
  private http: HttpClient,
){
}

ngOnInit(): void {
  this.getFundRaisersData();
}

showFundraiserDetails(fundraiser: FundRaisers) {
  console.log(fundraiser);

  this.router.navigate(['/view-fund-raise'], { queryParams: { fundraiser: JSON.stringify(fundraiser) } });
}


getFundRaisersData(): void {
  this.http.get<any>('https://api.melodymint.digitix365.com/api/campaigns/').subscribe({
    next: (value: any) => {
      this.fundRaisers = value.data
      console.log(this.fundRaisers);
    },
    error: (error: any) => {
      console.error('Error fetching fund raisers data:', error);
    }
  });
}

}
