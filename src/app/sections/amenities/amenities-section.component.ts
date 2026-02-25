import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-amenities-section',
  imports: [CommonModule],
  templateUrl: './amenities-section.component.html',
  styleUrl: './amenities-section.component.scss'
})
export class AmenitiesSectionComponent {
  private readonly contentService = inject(ContentService);

  protected readonly content$ = this.contentService.content$;
  protected readonly trackById = (_: number, item: { id: string }) => item.id;
}
