import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-highlights-strip',
  imports: [CommonModule],
  templateUrl: './highlights-strip.component.html',
  styleUrl: './highlights-strip.component.scss'
})
export class HighlightsStripComponent {
  private readonly contentService = inject(ContentService);

  protected readonly content$ = this.contentService.content$;
  protected readonly trackByTitle = (_: number, item: { title: string }) => item.title;
}
