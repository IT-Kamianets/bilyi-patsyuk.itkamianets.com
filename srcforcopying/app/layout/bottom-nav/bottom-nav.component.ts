import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { ContentService } from '../../services/content.service';
import { LanguageCode, LanguageService } from '../../services/language.service';

interface NavLink {
  key: 'home' | 'rooms' | 'gallery' | 'location' | 'contacts';
  fragment: string;
  icon: string;
}

interface SocialLink {
  key: string;
  label: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'app-bottom-nav',
  imports: [CommonModule, RouterLink],
  templateUrl: './bottom-nav.component.html',
  styleUrl: './bottom-nav.component.scss'
})
export class BottomNavComponent implements AfterViewInit, OnDestroy {
  private readonly contentService = inject(ContentService);
  private readonly languageService = inject(LanguageService);
  private readonly cdr = inject(ChangeDetectorRef);
  private observer?: IntersectionObserver;

  protected readonly navLinks: NavLink[] = [
    { key: 'home', fragment: 'top', icon: 'bi-house' },
    { key: 'rooms', fragment: 'rooms', icon: 'bi-door-open' },
    { key: 'gallery', fragment: 'gallery', icon: 'bi-images' },
    { key: 'location', fragment: 'location', icon: 'bi-geo-alt' },
    { key: 'contacts', fragment: 'contacts', icon: 'bi-telephone' }
  ];

  protected readonly content$ = this.contentService.content$;
  protected readonly lang$ = this.languageService.lang$;

  protected readonly socialLinks$ = this.contentService.content$.pipe(
    map((content) => {
      const socials = content.socials;
      const items: SocialLink[] = [];

      if (socials.facebookUrl) {
        items.push({ key: 'facebook', label: 'Facebook', icon: 'bi-facebook', url: socials.facebookUrl });
      }
      if (socials.bookingUrl) {
        items.push({ key: 'booking', label: 'Booking.com', icon: 'bi-globe2', url: socials.bookingUrl });
      }
      if (socials.tripadvisorUrl) {
        items.push({ key: 'tripadvisor', label: 'Tripadvisor', icon: 'bi-geo-alt', url: socials.tripadvisorUrl });
      }
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
    } else {
      this.activeSection = 'top';
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  setActiveSection(fragment: string): void {
    this.activeSection = fragment;
  }

  setLang(lang: LanguageCode): void {
    this.languageService.setLang(lang);
  }

  private getHeaderOffset(): number {
    const value = getComputedStyle(document.documentElement).getPropertyValue('--header-offset');
    const parsed = Number.parseInt(value.replace('px', '').trim(), 10);
    return Number.isNaN(parsed) ? 96 : parsed;
  }
}
