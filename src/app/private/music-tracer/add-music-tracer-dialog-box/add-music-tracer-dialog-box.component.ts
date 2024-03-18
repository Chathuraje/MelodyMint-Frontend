import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-music-tracer-dialog-box',
  templateUrl: './add-music-tracer-dialog-box.component.html',
  styleUrls: ['./add-music-tracer-dialog-box.component.scss']
})
export class AddMusicTracerDialogBoxComponent {

  addMusicTrackForm!: FormGroup;
  fileName = ''
  done = false;

 constructor(
    private dialogRef: MatDialogRef<AddMusicTracerDialogBoxComponent>,
  ) {
  }
  ngOnInit(): void {
    this.formInitializer()
  }

  private formInitializer(): void {
    this.addMusicTrackForm = new FormGroup({
      musicTrackName : new FormControl(null,[Validators.required]),
      musicFileName: new FormControl(this.fileName)
    })
  }
  onUpload(event: any) {
    const formData = new FormData();
    const file = event.target.files[0] as File;
    formData.append('file', file, file.name);
    this.fileName = file.name
  }


  onSubmit(){
    console.log( this.addMusicTrackForm.value);
  }


}
