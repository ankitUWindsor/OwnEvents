import { MIN_CAPACITY } from './../../../../../assets/constants';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss']
})
export class EventEditorComponent implements OnInit {
  createForm: FormGroup;
  capacity = 10;
  constructor(
    private dialogRef: MatDialogRef<EventEditorComponent>,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.maxLength(25)]],
      reEnterPassword: ['', [Validators.required, Validators.maxLength(25)]],
      userType: ['', [Validators.required]]
    });

    window.onclick = (event) => {
      if (!event.target.matches('.dropbtn')) {
        const dropdowns = document.getElementsByClassName('dropdown-content');
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < dropdowns.length; i++) {
          const openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    }
  }

  CloseDialog(): void {
    this.dialogRef.close();
  }

  getScreenWidth(): number {
    return screen.width;
  }

  CreateUpdateEvent() {

  }

  ToggleDropdown(): void {
    document.getElementById('myDropdown').classList.toggle('show');
  }

  ChangeCapacity(count: number): void {
    if (this.capacity + count >= MIN_CAPACITY) {
      this.capacity += count;
    }
  }

}
