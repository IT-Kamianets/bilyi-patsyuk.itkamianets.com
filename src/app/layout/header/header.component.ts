import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { ContentService } from '../../services/content.service';

interface NavLink {
  label: string;
  fragment: string;
}

interface SocialLink {
  key: string;
  label: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  private readonly contentService = inject(ContentService);
  private readonly cdr = inject(ChangeDetectorRef);
  private observer?: IntersectionObserver;

  protected readonly navLinks: NavLink[] = [
    { label: 'Rooms', fragment: 'rooms' },
    { label: 'Amenities', fragment: 'amenities' },
    { label: 'Gallery', fragment: 'gallery' },
    { label: 'Location', fragment: 'location' },
    { label: 'Reviews', fragment: 'reviews' },
    { label: 'Contacts', fragment: 'contacts' }
  ];

  protected readonly socialLinks$ = this.contentService.content$.pipe(
    map((content) => {
      const socials = content.socials;
      const items: SocialLink[] = [
        { key: 'instagram', label: 'Instagram', icon: 'bi-instagram', url: socials.instagramUrl },
        { key: 'facebook', label: 'Facebook', icon: 'bi-facebook', url: socials.facebookUrl },
        { key: 'booking', label: 'Booking.com', icon: 'bi-globe2', url: socials.bookingUrl },
        { key: 'tripadvisor', label: 'Tripadvisor', icon: 'bi-geo-alt', url: socials.tripadvisorUrl }
      ];

      if (socials.telegramUrl) {
        items.push({ key: 'telegram', label: 'Telegram', icon: 'bi-telegram', url: socials.telegramUrl });
      }
      if (socials.viberUrl) {
        items.push({ key: 'viber', label: 'Viber', icon: 'bi-chat-dots', url: socials.viberUrl });
      }
      if (socials.whatsappUrl) {
        items.push({ key: 'whatsapp', label: 'WhatsApp', icon: 'bi-whatsapp', url: socials.whatsappUrl });
      }

      return items;
    })
  );

  protected readonly brand$ = this.contentService.content$;

  protected activeSection: string | null = null;

  protected readonly trackByKey = (_: number, item: SocialLink) => item.key;
  protected readonly trackByFragment = (_: number, item: NavLink) => item.fragment;

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const sectionIds = this.navLinks.map((link) => link.fragment);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const headerOffset = this.getHeaderOffset();

    if ('IntersectionObserver' in window && sections.length) {
      this.observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

          if (visible.length) {
            const id = (visible[0].target as HTMLElement).id;
            if (this.activeSection !== id) {
              this.activeSection = id;
              this.cdr.markForCheck();
            }
          }
        },
        {
          rootMargin: `-${headerOffset}px 0px -55% 0px`,
          threshold: [0.2, 0.4, 0.6]
        }
      );

      sections.forEach((section) => this.observer?.observe(section));
    }

    const initial = window.location.hash.replace('#', '');
    if (initial) {
      this.activeSection = initial;
      this.cdr.markForCheck();
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  setActiveSection(fragment: string): void {
    this.activeSection = fragment;
  }

  private getHeaderOffset(): number {
    const value = getComputedStyle(document.documentElement).getPropertyValue('--header-offset');
    const parsed = Number.parseInt(value.replace('px', '').trim(), 10);
    return Number.isNaN(parsed) ? 96 : parsed;
  }
}
