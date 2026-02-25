import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-rooms-section',
  imports: [CommonModule, RouterLink],
  templateUrl: './rooms-section.component.html',
  styleUrl: './rooms-section.component.scss'
})
export class RoomsSectionComponent {
  private readonly contentService = inject(ContentService);

  protected readonly content$ = this.contentService.content$;
  protected readonly trackById = (_: number, item: { id: string }) => item.id;
}
