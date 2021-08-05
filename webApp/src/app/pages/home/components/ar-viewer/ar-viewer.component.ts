import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ar-viewer',
  templateUrl: './ar-viewer.component.html',
  styleUrls: ['./ar-viewer.component.scss']
})
export class ArViewerComponent implements OnInit {
  isloading: boolean;
  @Input() urlForSrc: string;

  constructor(private dialogRef: MatDialogRef<ArViewerComponent>) { }

  ngOnInit(): void {
    if(!this.urlForSrc || !this.urlForSrc.length){
      this.dialogRef.close();
    }
  }

  CloseDialog(): void {
    this.dialogRef.close();
  }

}
