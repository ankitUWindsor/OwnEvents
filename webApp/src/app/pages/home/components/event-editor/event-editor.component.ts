import { AssetService } from './../../../../services/asset.service';
import { EventTypes, MIN_CAPACITY } from './../../../../../assets/constants';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Event } from 'src/assets/models';
import { InterestsCategory } from 'src/assets/enums';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss']
})
export class EventEditorComponent implements OnInit {
  @ViewChild('imageUploader') imageUploader: any;
  createForm: FormGroup;
  capacity = 10;
  event: Event;
  categories = EventTypes;
  InterestsCategories = InterestsCategory;

  constructor(
    private dialogRef: MatDialogRef<EventEditorComponent>, private assetService: AssetService) { }

  ngOnInit(): void {
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
    };

    this.event = new Event();
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

  CheckIfTypeExistsInEvent(item: any): boolean {
    const currentInterest: any = this.InterestsCategories[item.enumValue];
    return this.event.interests.includes(currentInterest);
  }

  AddCategoryToEvent(value: string): void {
    this.event.interests.push(InterestsCategory[value]);
  }

  RemoveCategoryFromEvent(index: number): void {
    this.event.interests.splice(index, 1);
  }

  GetCategoryName(value: string): string {
    const index = this.categories.findIndex(item => this.InterestsCategories[item.enumValue] === value);
    return this.categories[index].text;
  }

  UploadImage(event): void {
    this.assetService.UploadImage(event.target.files[0]).then((response) => {
      // debugger;
    });
  }

}
