import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../services/content.service';

interface NavLink {
  key: 'rooms' | 'amenities' | 'gallery' | 'location' | 'reviews' | 'contacts';
  fragment: string;
}

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  private readonly contentService = inject(ContentService);

  protected readonly content$ = this.contentService.content$;
  protected readonly currentYear = new Date().getFullYear();

  protected readonly navLinks: NavLink[] = [
    { key: 'rooms', fragment: 'rooms' },
    { key: 'amenities', fragment: 'amenities' },
    { key: 'gallery', fragment: 'gallery' },
    { key: 'location', fragment: 'location' },
    { key: 'reviews', fragment: 'reviews' },
    { key: 'contacts', fragment: 'contacts' }
  ];

  protected readonly trackByFragment = (_: number, item: NavLink) => item.fragment;
}
