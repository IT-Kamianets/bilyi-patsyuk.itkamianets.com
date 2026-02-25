import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { ContentService } from '../../services/content.service';
import { MediaImage } from '../../models/site-content';

@Component({
  selector: 'app-rooms-section',
  imports: [CommonModule, RouterLink],
  templateUrl: './rooms-section.component.html',
  styleUrl: './rooms-section.component.scss'
})
export class RoomsSectionComponent {
  private readonly contentService = inject(ContentService);

  protected readonly content$ = this.contentService.content$;
  protected readonly messageLink$ = this.contentService.content$.pipe(
    map((content) => this.contentService.getPreferredMessageLink(content))
  );

  protected readonly roomPlaceholder = '/assets/images/room-placeholder.svg';

  protected readonly trackById = (_: number, item: { id: string }) => item.id;
  protected readonly trackByImage = (_: number, item: MediaImage) => item.src;

  protected handleRoomImageError(event: Event): void {
    const image = event.target as HTMLImageElement | null;
    if (!image) {
      return;
    }
    image.src = this.roomPlaceholder;
    image.removeAttribute('srcset');
  }
}
