import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, shareReplay } from 'rxjs';
import { SiteContent } from '../models/site-content';

export interface MessageLink {
  label: string;
  url: string;
  icon: string;
}

const FALLBACK_CONTENT: SiteContent = {
  brand: {
    name_ua: 'Гостьовий дім «Білий Пацюк»',
    name_en: "Guest House 'Bilyi Patsyuk' (White Rat)",
    city: 'Kamianets-Podilskyi',
    country: 'Ukraine',
    tagline_ua: 'Тихий двір у серці старого міста, де камінь зберігає історії.',
    tagline_en: 'A quiet courtyard in the old town, where stone keeps the stories.'
  },
  contacts: {
    phones: [
      {
        label: 'Reception',
        value: '+380 67 123 45 67',
        hrefTel: 'tel:+380671234567'
      },
      {
        label: 'Host',
        value: '+380 50 765 43 21',
        hrefTel: 'tel:+380507654321'
      }
    ],
    email: 'hello@bilyi-patsyuk.ua',
    address: '12 Zarvanska St., Old Town, Kamianets-Podilskyi, Khmelnytskyi Oblast',
    checkIn: '14:00',
    checkOut: '11:00'
  },
  socials: {
    instagramUrl: 'https://instagram.com/guesthouse.bilyi.patsyuk',
    facebookUrl: 'https://facebook.com/guesthouse.bilyi.patsyuk',
    bookingUrl: 'https://www.booking.com/hotel/ua/guest-house-bilyi-patsyuk.html',
    tripadvisorUrl:
      'https://www.tripadvisor.com/Hotel_Review-g303968-d0000000-Guest_House_Bilyi_Patsyuk.html',
    telegramUrl: 'https://t.me/bilyi_patsyuk',
    viberUrl: 'viber://chat?number=%2B380671234567',
    whatsappUrl: 'https://wa.me/380671234567'
  },
  heroImageUrl: '/assets/images/hero.jpg',
  heroHighlights: [
    'Free Wi-Fi',
    'Private parking assistance',
    'Courtyard terrace',
    'Quiet canyon location',
    'Loft & cozy'
  ],
  highlights: [
    {
      icon: 'moon-stars',
      title: 'Quiet nights',
      text: 'A calm courtyard and soft lighting after the old town slows down.'
    },
    {
      icon: 'bricks',
      title: 'Stone & craft',
      text: 'Historic textures paired with handmade details and warm wood.'
    },
    {
      icon: 'cup-hot',
      title: 'Thoughtful hosting',
      text: 'Personal touches, local tips, and a host who cares about comfort.'
    },
    {
      icon: 'window',
      title: 'Canyon views',
      text: 'Steps from the fortress walls and the canyon skyline.'
    }
  ],
  sectionsIntro: {
    rooms: 'A small collection of rooms designed for quiet sleep and relaxed evenings.',
    amenities: 'Everyday comforts with a boutique, handcrafted touch.',
    contacts: 'Reach the host directly for availability, transfers, and special requests.'
  },
  rooms: [
    {
      id: 'courtyard-studio',
      name: 'Courtyard Studio',
      sizeM2: 24,
      shortDescription: 'Warm wood, stone textures, and a private patio view.',
      features: ['Queen bed', 'Kitchenette', 'Rain shower', 'Quiet courtyard'],
      viewOptions: ['Courtyard', 'Old town rooftops']
    },
    {
      id: 'loft-suite',
      name: 'Loft Suite',
      sizeM2: 32,
      shortDescription: 'Loft accents with graphite details and soft evening light.',
      features: ['King bed', 'Sofa lounge', 'Clawfoot bath', 'Reading nook'],
      viewOptions: ['Canyon skyline', 'Fortress walls']
    },
    {
      id: 'stone-room',
      name: 'Stone Room',
      sizeM2: 20,
      shortDescription: 'Intimate, calm, and crafted with historic stone textures.',
      features: ['Double bed', 'Heated floors', 'Work desk', 'Tea set'],
      viewOptions: ['Courtyard', 'Old stone lane']
    }
  ],
  amenities: [
    { id: 'wifi', label: 'High-speed Wi-Fi', icon: 'wifi', highlight: true },
    { id: 'courtyard', label: 'Private courtyard terrace', icon: 'tree', highlight: true },
    { id: 'parking', label: 'Nearby parking assistance', icon: 'car-front', highlight: false },
    { id: 'breakfast', label: 'Craft breakfast on request', icon: 'cup-hot', highlight: true },
    { id: 'laundry', label: 'Laundry on request', icon: 'droplet-half', highlight: false },
    { id: 'pets', label: 'Pet-friendly rooms', icon: 'heart', highlight: false }
  ],
  reviews: [
    {
      source: 'Booking',
      rating: 9.4,
      quote: 'Quiet courtyard, thoughtful design, and a host who cares about every detail.',
      author: 'Olena'
    },
    {
      source: 'Google',
      rating: 4.8,
      quote: 'A boutique stay with real character. The stone textures feel authentic.',
      author: 'Maksym'
    },
    {
      source: 'Tripadvisor',
      rating: 5,
      quote: 'Warm evenings on the terrace, soft lighting, and the best sleep in town.',
      author: 'Iryna'
    }
  ],
  location: {
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2605.218033822309!2d26.58479521567785!3d48.6847369792694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4733f2b2d6c06f93%3A0x4c3c0b75b90b8d38!2sKamianets-Podilskyi!5e0!3m2!1sen!2sua!4v1700000000000!5m2!1sen!2sua',
    mapLink: 'https://maps.google.com/?q=Kamianets-Podilskyi+Old+Town',
    notes:
      'Historic streets are cobbled and can be steep; some paths are dimly lit at night.'
  },
  links: {
    githubRepoUrl: 'https://github.com/OWNER/REPO'
  }
};

const mergeContent = (content: SiteContent): SiteContent => ({
  ...FALLBACK_CONTENT,
  ...content,
  brand: { ...FALLBACK_CONTENT.brand, ...content.brand },
  contacts: { ...FALLBACK_CONTENT.contacts, ...content.contacts },
  socials: { ...FALLBACK_CONTENT.socials, ...content.socials },
  sectionsIntro: { ...FALLBACK_CONTENT.sectionsIntro, ...content.sectionsIntro },
  location: { ...FALLBACK_CONTENT.location, ...content.location },
  links: { ...FALLBACK_CONTENT.links, ...content.links },
  heroImageUrl: content.heroImageUrl ?? FALLBACK_CONTENT.heroImageUrl,
  heroHighlights: content.heroHighlights?.length ? content.heroHighlights : FALLBACK_CONTENT.heroHighlights,
  highlights: content.highlights?.length ? content.highlights : FALLBACK_CONTENT.highlights,
  rooms: content.rooms?.length ? content.rooms : FALLBACK_CONTENT.rooms,
  amenities: content.amenities?.length ? content.amenities : FALLBACK_CONTENT.amenities,
  reviews: content.reviews?.length ? content.reviews : FALLBACK_CONTENT.reviews
});

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private readonly http = inject(HttpClient);
  private readonly contentUrl = 'assets/content/site-content.uk.json';

  readonly content$ = this.http.get<SiteContent>(this.contentUrl).pipe(
    map((content) => mergeContent(content ?? FALLBACK_CONTENT)),
    catchError(() => of(FALLBACK_CONTENT)),
    shareReplay({ bufferSize: 1, refCount: false })
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
    if (socials.instagramUrl) {
      return { label: 'Instagram', url: socials.instagramUrl, icon: 'bi-instagram' };
    }
    if (content.contacts.email) {
      return { label: 'Email', url: `mailto:${content.contacts.email}`, icon: 'bi-envelope' };
    }

    return null;
  }
}
