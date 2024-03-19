import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/@application/service/storage.service';
const axios = require('axios');
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

  constructor(
    private storageService: StorageService,

  ) { }


  ngOnInit(): void {
    this.formInitializer()
  }

  private formInitializer(): void {
    this.artistRegistrationForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      phoneNumberPrefix: new FormControl('+94' as '+94' | '+87'),
      contactNumber: new FormControl(null, [Validators.required]),
      country: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
      describeYourself: new FormControl(null, [Validators.required]),

      yourProfession: new FormControl(null, [Validators.required])
    });
    this.socialLinksDetailForm = new FormGroup({
      discordServerLink: new FormControl(null, [Validators.required]),
      xAccountLink: new FormControl(null, [Validators.required]),
      tikTokAccountLink: new FormControl(null, [Validators.required]),
    })
    this.profilePicForm = new FormGroup({
      profilePic: new FormControl(this.fileName, [Validators.required]),
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

  onCreateAccount() {
    console.log(this.artistRegistrationForm.value);
    console.log(this.socialLinksDetailForm.value);
    console.log(this.profilePicForm.value);

    const artistRegistrationFormData = this.artistRegistrationForm.value;
    const socialLinksDetailFormData = this.socialLinksDetailForm.value;
    const profilePicFormData = this.profilePicForm.value;
    const wallet_address = this.storageService.getFromLocalStorage('wallet_address');
    console.log(wallet_address);
    if (wallet_address) {
      const postData = {
        wallet_address: wallet_address,
        username: "",
        first_name: artistRegistrationFormData.firstName,
        last_name: artistRegistrationFormData.lastName,
        email: artistRegistrationFormData.email,
        contact_no: artistRegistrationFormData.phoneNumberPrefix + artistRegistrationFormData.contactNumber,
        country: "Sri Lanka",
        state: "Western",
        profile_picture: profilePicFormData.profilePic,
        is_artist: true,
        artist_data: {
          profession: artistRegistrationFormData.yourProfession,
          about: artistRegistrationFormData.describeYourself,
          discord: socialLinksDetailFormData.discordServerLink,
          x: socialLinksDetailFormData.xAccountLink,
          tiktok: socialLinksDetailFormData.tikTokAccountLink
        },
        disabled: false
      };

      var respones = axios.post('http://127.0.0.1:1998/api/auth/register', postData, {
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

  }

  onUpload(event: any) {
    const formData = new FormData();
    const file = event.target.files[0] as File;
    formData.append('file', file, file.name);
    this.fileName = file.name
  }

}
