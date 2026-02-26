export interface SiteContent {
  brand: BrandInfo;
  contacts: ContactInfo;
  socials: SocialLinks;
  ui: UiStrings;
  heroImageUrl?: string;
  media?: MediaContent;
  rooms: RoomInfo[];
  amenities: AmenityInfo[];
  highlights: HighlightInfo[];
  heroHighlights?: string[];
  sectionsIntro?: SectionsIntro;
  reviews: ReviewInfo[];
  location: LocationInfo;
  links?: ExternalLinks;
}

export interface BrandInfo {
  name: string;
  city: string;
  country: string;
  tagline: string;
  descriptionShort?: string;
  descriptionFooter?: string;
}

export interface ContactInfo {
  phones: ContactPhone[];
  email?: string;
  address: string;
  checkIn?: string;
  checkOut?: string;
}

export interface ContactPhone {
  label: string;
  value: string;
  hrefTel: string;
}

export interface SocialLinks {
  instagramUrl?: string;
  facebookUrl?: string;
  bookingUrl?: string;
  tripadvisorUrl?: string;
  telegramUrl?: string;
  viberUrl?: string;
  whatsappUrl?: string;
}

export interface MediaContent {
  heroImage?: MediaImage;
  galleryImages: MediaImage[];
  roomImages?: Record<string, MediaImage[]>;
}

export interface MediaImage {
  src: string;
  alt: string;
  category?: string;
  caption?: string;
}

export interface RoomInfo {
  id: string;
  name: string;
  sizeM2: number;
  shortDescription: string;
  features: string[];
  viewOptions: string[];
  images?: MediaImage[];
}

export interface AmenityInfo {
  id: string;
  label: string;
  icon: string;
  highlight: boolean;
}

export interface HighlightInfo {
  icon: string;
  title: string;
  text: string;
}

export interface SectionsIntro {
  rooms?: string;
  amenities?: string;
  contacts?: string;
}

export interface ReviewInfo {
  source: string;
  rating?: number;
  count?: number;
  quote?: string;
  author?: string;
  link?: string;
}

export interface LocationInfo {
  coords?: {
    lat: number;
    lon: number;
  };
  mapEmbedUrl?: string;
  mapLink?: string;
  notes?: string;
  nearby?: string;
}

export interface ExternalLinks {
  githubRepoUrl?: string;
}

export interface UiStrings {
  nav: {
    home: string;
    rooms: string;
    amenities: string;
    gallery: string;
    location: string;
    reviews: string;
    contacts: string;
    more: string;
  };
  actions: {
    book: string;
    message: string;
    viewMore: string;
    collapse: string;
    close: string;
    call: string;
    openMap: string;
  };
  hero: {
    cardTitle: string;
    contactHost: string;
    checkInLabel: string;
    checkOutLabel: string;
  };
  rooms: {
    title: string;
    details: string;
    cta: string;
    sizeLabel: string;
    viewLabel: string;
    amenitiesLabel: string;
    askAvailability: string;
    prev: string;
    next: string;
  };
  amenities: {
    title: string;
    highlightLabel: string;
  };
  gallery: {
    title: string;
    lead: string;
    modalTitleFallback: string;
    prev: string;
    next: string;
  };
  location: {
    title: string;
    lead: string;
    mapTitle: string;
    mapFallback: string;
    coordsLabel: string;
    walkingText: string;
    quietText: string;
  };
  reviews: {
    title: string;
    lead: string;
    countSuffix: string;
    viewOn: string;
  };
  contacts: {
    title: string;
    phoneLabel: string;
    emailLabel: string;
    checkInLabel: string;
    checkOutLabel: string;
    quickTitle: string;
    quickText: string;
    officialLinks: string;
  };
  footer: {
    aboutTitle: string;
    aboutText: string;
    navTitle: string;
    contactsTitle: string;
    rights: string;
  };
  mobile?: {
    moreTitle: string;
    languageLabel: string;
  };
  language: {
    ua: string;
    en: string;
    label: string;
  };
}
