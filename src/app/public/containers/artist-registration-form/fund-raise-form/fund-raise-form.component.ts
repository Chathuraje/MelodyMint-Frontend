import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  onCreateProject() {
    console.log(this.projectDetailForm.value);
    console.log(this.productionDetailFrom.value);


  }


}
