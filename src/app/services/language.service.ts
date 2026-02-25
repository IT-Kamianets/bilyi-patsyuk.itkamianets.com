import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type LanguageCode = 'uk' | 'en';

const STORAGE_KEY = 'bp_lang';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly subject = new BehaviorSubject<LanguageCode>(this.getInitialLang());

  readonly lang$ = this.subject.asObservable();

  get currentLang(): LanguageCode {
    return this.subject.value;
  }

  setLang(lang: LanguageCode): void {
    if (lang === this.subject.value) {
      return;
    }
    this.subject.next(lang);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, lang);
    }
  }

  private getInitialLang(): LanguageCode {
    if (typeof window === 'undefined') {
      return 'uk';
    }
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === 'en' || stored === 'uk' ? stored : 'uk';
  }
}
