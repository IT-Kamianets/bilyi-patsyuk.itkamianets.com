import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, shareReplay, switchMap } from 'rxjs';
import { SiteContent } from '../models/site-content';
import { SITE_CONTENT_EN } from '../content/site-content.en';
import { SITE_CONTENT_UK } from '../content/site-content.uk';
import { LanguageCode, LanguageService } from './language.service';

export interface MessageLink {
  label: string;
  url: string;
  icon: string;
}





const FALLBACKS: Record<LanguageCode, SiteContent> = {
  uk: SITE_CONTENT_UK,
  en: SITE_CONTENT_EN
};

const mergeContent = (content: SiteContent, fallback: SiteContent): SiteContent => ({
  ...fallback,
  ...content,
  brand: { ...fallback.brand, ...content.brand },
  contacts: { ...fallback.contacts, ...content.contacts },
  socials: { ...fallback.socials, ...content.socials },
  ui: { ...fallback.ui, ...content.ui },
  sectionsIntro: { ...fallback.sectionsIntro, ...(content.sectionsIntro ?? {}) },
  location: { ...fallback.location, ...content.location },
  links: { ...fallback.links, ...(content.links ?? {}) },
  media: content.media ?? fallback.media,
  heroImageUrl: content.heroImageUrl ?? fallback.heroImageUrl,
  heroHighlights: content.heroHighlights?.length ? content.heroHighlights : fallback.heroHighlights,
  highlights: content.highlights?.length ? content.highlights : fallback.highlights,
  rooms: content.rooms?.length ? content.rooms : fallback.rooms,
  amenities: content.amenities?.length ? content.amenities : fallback.amenities,
  reviews: content.reviews?.length ? content.reviews : fallback.reviews
});

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private readonly http = inject(HttpClient);
  private readonly languageService = inject(LanguageService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly content$ = this.languageService.lang$.pipe(
    switchMap((lang) => this.loadContent(lang)),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  getPreferredMessageLink(content: SiteContent): MessageLink | null {
    const socials = content.socials;

    if (socials.telegramUrl) {
      return { label: 'Telegram', url: socials.telegramUrl, icon: 'bi-telegram' };
    }
    if (socials.whatsappUrl) {
      return { label: 'WhatsApp', url: socials.whatsappUrl, icon: 'bi-whatsapp' };
    }
    if (socials.viberUrl) {
      return { label: 'Viber', url: socials.viberUrl, icon: 'bi-chat-dots' };
    }
    if (socials.facebookUrl) {
      return { label: 'Facebook', url: socials.facebookUrl, icon: 'bi-facebook' };
    }

    return null;
  }

  private getContentUrl(lang: LanguageCode): string {
    return `assets/content/site-content.${lang}.json`;
  }

  private loadContent(lang: LanguageCode) {
    const fallback = FALLBACKS[lang];
    if (!this.isBrowser) {
      return of(fallback);
    }

    return this.http.get<SiteContent>(this.getContentUrl(lang)).pipe(
      map((content) => mergeContent(content ?? fallback, fallback)),
      catchError(() => of(fallback))
    );
  }
}





