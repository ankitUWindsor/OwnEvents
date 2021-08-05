import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ar-viewer',
  templateUrl: './ar-viewer.component.html',
  styleUrls: ['./ar-viewer.component.scss']
})
export class ArViewerComponent implements OnInit {
  isloading: boolean;
  // urlForSrc ='https://owneventspublicstorage.blob.core.windows.net/imagecontainer/74da599e-33f1-46cd-91f5-cc8201e68b16.3dObject.glb';
  urlForSrc ='https://owneventspublicstorage.blob.core.windows.net/imagecontainer/5ae05a23-6938-4314-877f-03f79f3e2a57.skateboard.glb';
  urlForIosSrc ='';
  constructor(private dialogRef: MatDialogRef<ArViewerComponent>) { }

  ngOnInit(): void {
  }

  CloseDialog(): void {
    this.dialogRef.close();
  }

}
