import { Component, Inject } from '@angular/core';
import { PlatformDetail } from '../view-single-music-track.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-records-dialog-box',
  templateUrl: './view-records-dialog-box.component.html',
  styleUrls: ['./view-records-dialog-box.component.scss']
})
export class ViewRecordsDialogBoxComponent {
  records = [] as Record[]
  title!: string
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { records: Record[], title: string },
    private dialogRef: MatDialogRef<ViewRecordsDialogBoxComponent>,
  ) {
    this.records = this.data.records
    this.title = this.data.title
  }

  ngOnInit(): void {
  }

}

export interface Record {
  date: string
  time: string
  duration: string
}

