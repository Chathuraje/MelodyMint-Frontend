import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FundRaisers } from 'src/app/@domain/fund-raisers';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/@application/service/storage.service';
const axios = require('axios');

@Component({
  selector: 'app-view-fund-raisers',
  templateUrl: './view-fund-raisers.component.html',
  styleUrls: ['./view-fund-raisers.component.scss']
})
export class ViewFundRaisersComponent {
  investForm!: FormGroup

  fundraiser= {} as FundRaisers
  constructor(
    private router: Router,
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute,
  ){    
  }
  
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['fundraiser']) {
        this.fundraiser = JSON.parse(params['fundraiser']);
        console.log(this.fundraiser);
      }
      this.formInitializer()
    });
  }

  private formInitializer(): void {
    this.investForm = new FormGroup({
      amount: new FormControl(null, [Validators.required])
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

  async invest() {
    const amount = this.investForm.value.amount;
    
    var userId = this.storageService.getFromLocalStorage('userId');
    var collection_id = this.fundraiser.id

    const postData = {
      "invester_id": userId,
      "investment_amount": amount
    }
    alert(collection_id)
    
    var respones = await axios.put(`http://127.0.0.1:1998/api/campaigns/${collection_id}/invest`, postData, {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        }
      })

    // console.log(respones);
  }

}
