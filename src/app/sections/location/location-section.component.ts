import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-location-section',
  imports: [CommonModule],
  templateUrl: './location-section.component.html',
  styleUrl: './location-section.component.scss'
})
export class LocationSectionComponent {
  private readonly contentService = inject(ContentService);
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly content$ = this.contentService.content$;

  protected readonly mapUrl$ = this.contentService.content$.pipe(
    map((content) => content.location.mapEmbedUrl || ''),
    map((url) => (url ? this.sanitizer.bypassSecurityTrustResourceUrl(url) : null))
  );

  protected readonly mapLink$ = this.contentService.content$.pipe(
    map((content) => {
      const directLink = content.location.mapLink?.trim();
      if (directLink) {
        return directLink;
      }

      const address = content.contacts.address?.trim();
      if (!address) {
        return null;
      }

      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    })
  );
}
