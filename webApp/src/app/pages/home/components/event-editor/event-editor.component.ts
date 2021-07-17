import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss']
})
export class EventEditorComponent implements OnInit {
  signupForm: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<EventEditorComponent>,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.maxLength(25)]],
      reEnterPassword: ['', [Validators.required, Validators.maxLength(25)]],
      userType: ['', [Validators.required]]
    });
  }

  CloseDialog(): void {
    this.dialogRef.close();
  }

  getScreenWidth(): number {
    return screen.width;
  }

  CreateUpdateEvent() {

  }


}
