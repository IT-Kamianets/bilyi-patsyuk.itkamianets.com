export interface SiteContent {
  brand: BrandInfo;
  contacts: ContactInfo;
  socials: SocialLinks;
  heroImageUrl?: string;
  rooms: RoomInfo[];
  amenities: AmenityInfo[];
  highlights: HighlightInfo[];
  heroHighlights?: string[];
  sectionsIntro?: SectionsIntro;
  reviews: ReviewInfo[];
  location: LocationInfo;
  links: ExternalLinks;
}

export interface BrandInfo {
  name_ua: string;
  name_en: string;
  city: string;
  country: string;
  tagline_ua: string;
  tagline_en: string;
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
  instagramUrl: string;
  facebookUrl: string;
  bookingUrl: string;
  tripadvisorUrl: string;
  telegramUrl?: string;
  viberUrl?: string;
  whatsappUrl?: string;
}

export interface RoomInfo {
  id: string;
  name: string;
  sizeM2: number;
  shortDescription: string;
  features: string[];
  viewOptions: string[];
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
  rating: number;
  quote: string;
  author?: string;
}

export interface LocationInfo {
  mapEmbedUrl?: string;
  mapLink?: string;
  notes: string;
}

export interface ExternalLinks {
  githubRepoUrl: string;
}
