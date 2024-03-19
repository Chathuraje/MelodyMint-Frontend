import { HttpClient } from '@angular/common/http';
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
    private http: HttpClient,
    private dialogRef: MatDialogRef<AddMusicTracerDialogBoxComponent>,
  ) {
  }
  ngOnInit(): void {
    this.formInitializer()
  }

  private formInitializer(): void {
    this.addMusicTrackForm = new FormGroup({
      song_name: new FormControl(null, [Validators.required]),
      file: new FormControl(null, [Validators.required]),
      user_id: new FormControl('65f6df19b47d10863bcfc79e', [Validators.required])
    })
  }
  onUpload(event: any) {
    const file = event.target.files[0];
    console.log(file);
    this.addMusicTrackForm.get('file')?.setValue(file)
    this.fileName = file.name
  }


  onSubmit() {
    if (this.addMusicTrackForm.valid) {
      console.log(this.addMusicTrackForm.value);
      this.http.post<any>('http://64.225.90.69:1998/api/audio/train', this.addMusicTrackForm.value).subscribe({
        next: (response: any) => {
          console.log('Response:', response);
        },
        error: (error: any) => {
          console.error('Error posting data:', error);
        }
      });
    }
  }


}
