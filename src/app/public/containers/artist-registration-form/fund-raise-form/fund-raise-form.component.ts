import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
const axios = require('axios');
import { StorageService } from 'src/app/@application/service/storage.service';

@Component({
  selector: 'app-fund-raise-form',
  templateUrl: './fund-raise-form.component.html',
  styleUrls: ['./fund-raise-form.component.scss']
})
export class FundRaiseFormComponent {

  isStep1Valid = false;
  isStep2Valid = false;
  steps: number[] = [];
  step1 = 0.7;
  step2 = 0.7;
  fileName = ''
  done = false;
  projectDetailForm!: FormGroup
  productionDetailFrom!: FormGroup
  constructor(
    private storageService: StorageService,
    ) { }

  ngOnInit(): void {
    this.formInitializer()
  }

  private formInitializer(): void {
    this.projectDetailForm = new FormGroup({
      musicType: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
      presentage: new FormControl(null, [Validators.required]),
      deadLine: new FormControl(null, [Validators.required]),
    });
    this.productionDetailFrom = new FormGroup({
      titleOfMusic: new FormControl(null, [Validators.required]),
      titleOfFundRaise: new FormControl(null, [Validators.required]),
      fundRaiseDiscription: new FormControl(null, [Validators.required]),
      fundRaiseCover: new FormControl(null, [Validators.required]),
    });
  }

  onStepperChanged(event: StepperSelectionEvent) {
    this.steps.push(event.selectedIndex);
    this.steps = [...new Set(this.steps)];
    this.assignStyle();
  }

  private assignStyle(): void {
    this.steps.forEach((x) => {
      switch (x) {
        case 0:
          this.step1 = 1;
          break;
        case 1:
          this.step2 = 1;
          break;

      }
    });
  }
  onSecondStep() {
    if (!this.projectDetailForm.valid) {
      Object.values(this.projectDetailForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    } else {
      this.isStep1Valid = true;
    }
  }

  async onCreateProject() {
    console.log(this.projectDetailForm.value);
    console.log(this.productionDetailFrom.value);
    var userId = this.storageService.getFromLocalStorage('userId');

    const postData = {
      title: this.productionDetailFrom.value.titleOfFundRaise,
      description: this.productionDetailFrom.value.fundRaiseDiscription,
      title_of_the_music: this.productionDetailFrom.value.titleOfMusic,
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png",
      nft_image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1280px-Image_created_with_a_mobile_phone.png",
      start_date: "2024-03-20",
      end_date: this.projectDetailForm.value.deadLine,
      target_amount: this.projectDetailForm.value.amount,
      distribution: this.projectDetailForm.value.presentage,
      current_amount: 0,
      created_by: userId,
      geners: this.projectDetailForm.value.musicType,
      is_active: "true",
      is_completed: "false",
      status: "pending",
      investers: [],
    }

    var respones = await axios.post('http://127.0.0.1:1998/api/campaigns/create_campaign', postData, {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        }
      })

    console.log(respones);
  }


}
