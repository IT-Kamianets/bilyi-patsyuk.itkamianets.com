import { Component } from '@angular/core';
import { HeroSectionComponent } from '../../sections/hero/hero-section.component';
import { HighlightsStripComponent } from '../../sections/highlights-strip/highlights-strip.component';
import { RoomsSectionComponent } from '../../sections/rooms/rooms-section.component';
import { AmenitiesSectionComponent } from '../../sections/amenities/amenities-section.component';
import { GallerySectionComponent } from '../../sections/gallery/gallery-section.component';
import { LocationSectionComponent } from '../../sections/location/location-section.component';
import { ReviewsSectionComponent } from '../../sections/reviews/reviews-section.component';
import { ContactsSectionComponent } from '../../sections/contacts/contacts-section.component';

@Component({
  selector: 'app-home-page',
  imports: [
    HeroSectionComponent,
    HighlightsStripComponent,
    RoomsSectionComponent,
    AmenitiesSectionComponent,
    GallerySectionComponent,
    LocationSectionComponent,
    ReviewsSectionComponent,
    ContactsSectionComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {}
