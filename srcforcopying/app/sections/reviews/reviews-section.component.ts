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

  protected reviewColClass(count: number): string {
    return count <= 2 ? 'col-12 col-lg-6' : 'col-12 col-md-6 col-xl-4';
  }

  protected centerReviews(count: number): boolean {
    return count <= 2;
  }
}
