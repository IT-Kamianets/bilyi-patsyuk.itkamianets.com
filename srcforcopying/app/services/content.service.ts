import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { of, shareReplay, switchMap } from 'rxjs';
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

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private readonly languageService = inject(LanguageService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isServer = isPlatformServer(this.platformId);
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

  private loadContent(lang: LanguageCode) {
    const fallback = FALLBACKS[lang];

    if (this.isServer) {
      return of(fallback);
    }

    if (this.isBrowser) {
      return of(fallback);
    }

    return of(fallback);
  }
}
