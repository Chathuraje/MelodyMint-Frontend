import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-artist-registration-form',
  templateUrl: './artist-registration-form.component.html',
  styleUrls: ['./artist-registration-form.component.scss']
})
export class ArtistRegistrationFormComponent {

  artistRegistrationForm!: FormGroup;
  socialLinksDetailForm!: FormGroup;
  profilePicForm!: FormGroup;
  isStep1Valid = false;
  isStep2Valid = false;
  isStep3Valid = false;
  steps: number[] = [];
  step1 = 0.7;
  step2 = 0.7;
  step3 = 0.7;
  fileName = ''
  done = false;

  constructor() {}


  ngOnInit(): void {
    this.formInitializer()
  }

  private formInitializer(): void {
    this.artistRegistrationForm  = new FormGroup({
      firstName: new FormControl(null,[Validators.required] ),
      lastName: new FormControl(null,[Validators.required] ),
      email: new FormControl(null,[Validators.required] ),
      phoneNumberPrefix: new FormControl('+94' as '+94' | '+87' ),
      contactNumber: new FormControl(null,[Validators.required] ),
      describeYourself: new FormControl(null,[Validators.required] ),
      yourProfession: new FormControl(null,[Validators.required] )
    });
    this.socialLinksDetailForm  = new FormGroup({
      discordServerLink: new FormControl(null,[Validators.required] ),
      xAccountLink: new FormControl(null,[Validators.required] ),
      tikTokAccountLink: new FormControl(null,[Validators.required] ),
    })
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
        case 2:
          this.step3 = 1;
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
    if (!this.artistRegistrationForm.valid) {
      Object.values(this.artistRegistrationForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    } else {
      this.isStep1Valid = true;
    }
  }

  onThirdStep() {
    if (!this.socialLinksDetailForm.valid) {
      Object.values(this.socialLinksDetailForm.controls).forEach((control) => {
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
    console.log(this.artistRegistrationForm.value);
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
