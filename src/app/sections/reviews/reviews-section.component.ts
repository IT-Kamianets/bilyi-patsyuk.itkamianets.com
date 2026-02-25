import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-reviews-section',
  imports: [CommonModule],
  templateUrl: './reviews-section.component.html',
  styleUrl: './reviews-section.component.scss'
})
export class ReviewsSectionComponent {
  private readonly contentService = inject(ContentService);

  protected readonly content$ = this.contentService.content$;
  protected readonly trackBySource = (_: number, item: { source: string }) => item.source;
}
