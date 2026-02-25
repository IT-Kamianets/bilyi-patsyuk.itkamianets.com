import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-contacts-section',
  imports: [CommonModule],
  templateUrl: './contacts-section.component.html',
  styleUrl: './contacts-section.component.scss'
})
export class ContactsSectionComponent {
  private readonly contentService = inject(ContentService);

  protected readonly content$ = this.contentService.content$;
  protected readonly trackByValue = (_: number, item: { value: string }) => item.value;

  protected readonly messageLink$ = this.contentService.content$.pipe(
    map((content) => this.contentService.getPreferredMessageLink(content))
  );

  protected readonly primaryPhone$ = this.contentService.content$.pipe(
    map((content) => content.contacts.phones[0] || null)
  );

  protected readonly mapsLink$ = this.contentService.content$.pipe(
    map((content) => {
      if (content.location.mapLink) {
        return content.location.mapLink;
      }
      const query = encodeURIComponent(content.contacts.address);
      return `https://maps.google.com/?q=${query}`;
    })
  );
}
