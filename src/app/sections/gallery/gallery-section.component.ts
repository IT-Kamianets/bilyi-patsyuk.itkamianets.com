import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-gallery-section',
  imports: [CommonModule],
  templateUrl: './gallery-section.component.html',
  styleUrl: './gallery-section.component.scss'
})
export class GallerySectionComponent {
  private readonly contentService = inject(ContentService);

  protected readonly content$ = this.contentService.content$;

  protected readonly galleryItems = [
    { title: 'Courtyard evenings', caption: 'Warm light and quiet conversation.' },
    { title: 'Stone textures', caption: 'Historic masonry with modern comfort.' },
    { title: 'Loft accents', caption: 'Graphite details and soft textiles.' },
    { title: 'Breakfast craft', caption: 'Local flavors, slow mornings.' },
    { title: 'Old town lanes', caption: 'Steps from the fortress walls.' },
    { title: 'Terrace calm', caption: 'A private corner for the day to end.' }
  ];

  protected readonly trackByTitle = (_: number, item: { title: string }) => item.title;
}
