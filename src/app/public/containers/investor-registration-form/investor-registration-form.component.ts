import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StepperSelectionEvent } from '@angular/cdk/stepper';


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
    console.log(this.socialLinksDetailForm.value);
    console.log(this.profilePicForm.value);

  }

  onUpload(event: any) {
    const formData = new FormData();
    const file = event.target.files[0] as File;
    formData.append('file', file, file.name);
    this.fileName = file.name
  }



}
