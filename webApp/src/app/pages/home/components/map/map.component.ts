import { Location } from './../../../../../assets/models';
import { Component, ElementRef, OnInit, NgZone, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() location: Location = { latitude: undefined, longitude: undefined, address: undefined };
  @Output() LocationChanged = new EventEmitter<Location>();
  
  zoom = 12;
  geoCoder: google.maps.Geocoder;
  isLoading: boolean;
  @Input() isEditingAllowed = true;

  @ViewChild('search') searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    if (this.isEditingAllowed) {
      if (!this.location) {
        this.location = { latitude: undefined, longitude: undefined, address: undefined };
      }
      this.mapsAPILoader.load().then(() => {
        if (!this.location.address) {
          this.setCurrentLocation();
        } else {
          this.zoom = 8;
        }

        // tslint:disable-next-line: new-parens
        this.geoCoder = new google.maps.Geocoder;

        const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
        autocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            const place: google.maps.places.PlaceResult = autocomplete.getPlace();

            if (place.geometry === undefined || place.geometry === null) {
              return;
            }

            this.location.latitude = place.geometry.location.lat();
            this.location.longitude = place.geometry.location.lng();
            this.SetAddress(this.location.latitude, this.location.longitude);
            this.zoom = 12;
          });
        });
      });
    }
  }


  private setCurrentLocation(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.location.latitude = position.coords.latitude;
        this.location.longitude = position.coords.longitude;
        this.zoom = 8;
        this.SetAddress(this.location.latitude, this.location.longitude);
      });
    }
  }


  markerDragEnd($event: any): void {
    this.location.latitude = $event.coords.lat;
    this.location.longitude = $event.coords.lng;
    this.SetAddress(this.location.latitude, this.location.longitude);
  }

  SetAddress(latitude, longitude): void {
    this.isLoading = true;
    this.geoCoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
      this.isLoading = false;
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.location.address = results[0].formatted_address;
        } else {
          window.alert('No result found');
        }
        this.saveLocation();
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  saveLocation(): void {
    this.LocationChanged.emit(this.location);
  }

}
