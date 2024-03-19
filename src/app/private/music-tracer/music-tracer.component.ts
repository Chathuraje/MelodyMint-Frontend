import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddMusicTracerDialogBoxComponent } from './add-music-tracer-dialog-box/add-music-tracer-dialog-box.component';

@Component({
  selector: 'app-music-tracer',
  templateUrl: './music-tracer.component.html',
  styleUrls: ['./music-tracer.component.scss']
})
export class MusicTracerComponent {

  musicTracer = [] as any[]

  constructor(
    private router: Router,
    private http: HttpClient,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.getMusicTracerData();
  }

  showMusicTracerDetails(musicTracer: any) {
    console.log(musicTracer);
    this.router.navigate(['/view-single-music-track'], { queryParams: { musicTracer: JSON.stringify(musicTracer) } });
  }
  onAddMusicTrack() {
    const dialogRef = this.dialog.open(AddMusicTracerDialogBoxComponent, {
      width: '60%',
      height: '80%'
    });
    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value != true) {
          this.getMusicTracerData();
        }
      },
    });
  }


  getMusicTracerData(): void {
    this.http.get<any>('https://api.melodymint.digitix365.com/audio/65f6df19b47d10863bcfc79e').subscribe({
      next: (value: any) => {
        this.musicTracer = value.data
        console.log(this.musicTracer);
      },
      error: (error: any) => {
        console.error('Error fetching fund raisers data:', error);
      }
    });
  }

}
