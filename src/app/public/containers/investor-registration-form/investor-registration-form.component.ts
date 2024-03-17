import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
const axios = require('axios');


@Component({
  selector: 'app-investor-registration-form',
  templateUrl: './investor-registration-form.component.html',
  styleUrls: ['./investor-registration-form.component.scss']
})
export class InvestorRegistrationFormComponent implements OnInit {

  investorRegistrationForm!: FormGroup;
  socialLinksDetailForm!: FormGroup;
  profilePicForm!: FormGroup;
  isStep1Valid = false;
  isStep2Valid = false;
  isStep3Valid = false;
  steps: number[] = [];
  step1 = 0.7;
  step2 = 0.7;
  fileName = ''
  done = false;

  constructor() {}


  ngOnInit(): void {
    this.formInitializer()
  }

  private formInitializer(): void {
    this.investorRegistrationForm  = new FormGroup({
      firstName: new FormControl(null,[Validators.required] ),
      lastName: new FormControl(null,[Validators.required] ),
      email: new FormControl(null,[Validators.required] ),
      phoneNumberPrefix: new FormControl('+94' as '+94' | '+87' ),
      contactNumber: new FormControl(null,[Validators.required] )
    });
    this.profilePicForm = new FormGroup({
      profilePic: new FormControl(this.fileName,[Validators.required] ),
    })
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

  // handleChange(info: NzUploadChangeParam): void {
  //   if (info.file.status !== 'uploading') {
  //     console.log(info.file, info.fileList);
  //   }
  //   if (info.file.status === 'done') {
  //     this.msg.success(`${info.file.name} file uploaded successfully`);
  //   } else if (info.file.status === 'error') {
  //     this.msg.error(`${info.file.name} file upload failed.`);
  //   }
  // }

  onSecondStep() {
    if (!this.investorRegistrationForm.valid) {
      Object.values(this.investorRegistrationForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    } else {
      this.isStep1Valid = true;
    }
  }

  onCreateAccount(){
    console.log(this.investorRegistrationForm.value);
    console.log(this.profilePicForm.value);

    const investorRegistrationFormData = this.investorRegistrationForm.value;
    const profilePicFormData = this.profilePicForm.value;

    const postData = {
      wallet_address: '0xc3d3E220EcA81BBb0593119C30b160c92bd32D96',
      username: "",
      first_name: investorRegistrationFormData.firstName,
      last_name: investorRegistrationFormData.lastName,
      email: investorRegistrationFormData.email,
      contact_no: investorRegistrationFormData.phoneNumberPrefix + investorRegistrationFormData.contactNumber,
      country: "",
      state: "",
      profile_picture: "",
      is_artist: false,
      disabled: false
    };
    
    var respones = axios.post('http://64.225.90.69:1998/api/auth/register', postData, {
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      }
    })

    const message = respones.data;
    if (message.code === 400) {
      console.log("User already registered")
    } else if (message.code === 400) {
      console.log("User sucessfully registerd")
    } else {
      console.log("U")
  }

  }

  onUpload(event: any) {
    const formData = new FormData();
    const file = event.target.files[0] as File;
    formData.append('file', file, file.name);
    this.fileName = file.name
  }



}
