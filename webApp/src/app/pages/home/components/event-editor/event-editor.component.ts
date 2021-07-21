import { EventService } from './../../../../services/event/event.service';
import { AssetService } from './../../../../services/asset.service';
import { EventTypes, MIN_CAPACITY } from './../../../../../assets/constants';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
  @Input() isEditMode = false;
  @Input() event: Event;
  @ViewChild('imageUploader') imageUploader: any;
  createForm: FormGroup;
  categories = EventTypes;
  InterestsCategories = InterestsCategory;
  isLoading: boolean;
  errorMessage: any;
  isUploading: boolean;
  isTryingToSubmit: boolean;
  minimumDate = new Date();

  constructor(
    private dialogRef: MatDialogRef<EventEditorComponent>,
    public assetService: AssetService,
    private eventService: EventService) { }

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
    if (!this.isEditMode) {
      this.event = new Event();
      this.event.eventName = '';
      this.event.description = '';
    }
  }

  CloseDialog(event = null): void {
    this.dialogRef.close(event);
  }

  getScreenWidth(): number {
    return screen.width;
  }

  ToggleDropdown(): void {
    document.getElementById('myDropdown').classList.toggle('show');
  }

  ChangeCapacity(count: number): void {
    if (this.event.capacity + count >= MIN_CAPACITY) {
      this.event.capacity += count;
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
    this.isUploading = true;
    this.assetService.UploadImage(event.target.files[0]).then((response) => {
      this.event.images.push(response);
      this.isUploading = false;
    }, err => this.isUploading = false);
  }

  CreateUpdateEvent(): void {
    this.isTryingToSubmit = true;

    if (this.CheckFormValidation()) {
      this.isLoading = true;
      if (!this.isEditMode) {
        this.eventService.CreateEvent(this.event).then((response) => {
          this.CloseDialog(response);
          this.isLoading = false;
        }, (err) => {
          this.isLoading = false;
        });
      } else {
        this.eventService.UpdateEvent(this.event).then((response) => {
          this.CloseDialog(response);
          this.isLoading = false;
        }, (err) => {
          this.isLoading = false;
        });
      }
    }

  }

  RemoveImage(index: number): void {
    this.event.images.splice(index, 1);
  }

  CheckFormValidation(): boolean {
    this.errorMessage = '';
    if (!this.event.eventName.trim().length || !this.event.description.trim().length ||
      !this.event.endDateAndTime || !this.event.startDateAndTime) {
      this.errorMessage = 'fill all fields';
    } else if (!this.event.interests.length) {
      this.errorMessage = 'Event Categories Missing';
    } else if (!this.event.images.length) {
      this.errorMessage = 'Event Images Missing';
    }
    return this.errorMessage.length === 0;
  }


}
