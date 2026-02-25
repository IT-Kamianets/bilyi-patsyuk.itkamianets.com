import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../services/content.service';
import { MediaImage } from '../../models/site-content';

@Component({
  selector: 'app-gallery-section',
  imports: [CommonModule],
  templateUrl: './gallery-section.component.html',
  styleUrl: './gallery-section.component.scss'
})
export class GallerySectionComponent {
  private readonly contentService = inject(ContentService);

  protected readonly content$ = this.contentService.content$;
  protected readonly trackBySrc = (_: number, item: MediaImage) => item.src;

  protected readonly initialCount = 9;
  protected readonly step = 8;
  protected visibleCount = this.initialCount;

  protected selectedImage: MediaImage | null = null;
  protected selectedIndex = 0;
  protected galleryImages: MediaImage[] = [];

  // NOTE: Use only photos publicly provided by the property/listing for marketing.
  private readonly fallbackImage =
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'>" +
    "<rect width='800' height='600' fill='%23e9e0d4'/>" +
    "<text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'" +
    " font-family='Arial, sans-serif' font-size='20' fill='%236b5f55'>" +
    "Фото недоступне" +
    '</text></svg>';

  protected handleImageError(event: Event): void {
    const image = event.target as HTMLImageElement | null;
    if (!image) {
      return;
    }
    image.src = this.fallbackImage;
    image.removeAttribute('srcset');
  }

  protected openImage(images: MediaImage[], image: MediaImage, index: number): void {
    this.galleryImages = images;
    this.selectedIndex = index;
    this.selectedImage = image;
  }

  protected showMore(total: number): void {
    if (this.visibleCount >= total) {
      this.visibleCount = this.initialCount;
      return;
    }
    this.visibleCount = Math.min(total, this.visibleCount + this.step);
  }

  protected isAllVisible(total: number): boolean {
    return this.visibleCount >= total;
  }

  protected hasPrev(): boolean {
    return this.selectedIndex > 0;
  }

  protected hasNext(): boolean {
    return this.selectedIndex < this.galleryImages.length - 1;
  }

  protected prevImage(): void {
    if (!this.hasPrev()) {
      return;
    }
    this.selectedIndex -= 1;
    this.selectedImage = this.galleryImages[this.selectedIndex];
  }

  protected nextImage(): void {
    if (!this.hasNext()) {
      return;
    }
    this.selectedIndex += 1;
    this.selectedImage = this.galleryImages[this.selectedIndex];
  }
}
