import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-hero-section',
  imports: [CommonModule, RouterLink],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent {
  private readonly contentService = inject(ContentService);

  protected readonly content$ = this.contentService.content$;

  protected readonly messageLink$ = this.contentService.content$.pipe(
    map((content) => this.contentService.getPreferredMessageLink(content))
  );

  protected readonly quickFacts$ = this.contentService.content$.pipe(
    map((content) => {
      const highlights = content.heroHighlights?.length
        ? content.heroHighlights
        : content.amenities.filter((item) => item.highlight).map((item) => item.label);
      return highlights.slice(0, 5);
    })
  );

  protected readonly heroBackground$ = this.contentService.content$.pipe(
    map((content) => this.buildHeroBackground(content.heroImageUrl))
  );

  protected readonly trackByHighlight = (_: number, item: string) => item;

  private buildHeroBackground(imageUrl?: string): string {
    const overlay = 'linear-gradient(140deg, rgba(24, 23, 21, 0.2), rgba(120, 86, 72, 0.25))';
    if (!imageUrl) {
      return overlay;
    }
    return `${overlay}, url('${imageUrl}')`;
  }
}
