import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FundRaisers } from 'src/app/@domain/fund-raisers';

@Component({
  selector: 'app-view-fund-raisers',
  templateUrl: './view-fund-raisers.component.html',
  styleUrls: ['./view-fund-raisers.component.scss']
})
export class ViewFundRaisersComponent {

  fundraiser= {} as FundRaisers
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ){    
  }
  
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['fundraiser']) {
        this.fundraiser = JSON.parse(params['fundraiser']);
        console.log(this.fundraiser);
      }
    });
  }

  getDescriptionFirstSentence(description: string): string {
    // Split the description into sentences
    const sentences = description.split('. ');
    // Get the first sentence
    const firstSentence = sentences[0];
    return firstSentence;
  }

  // onBack() {
  //   this.location.back()
  // }


}
