import { LucideIcon } from 'lucide-react';

export enum Tab {
  HOME = 'Home',
  ABOUT = 'About Us',
  EVENTS = 'Events',
  SCHEDULE = 'Schedule',
  SPEAKERS = 'Speaker',
  SPONSORS = 'Sponsors',
  CONTACT = 'Contact',
  LOGIN = 'Log in', // Internal
  TICKETS = 'Tickets' // Internal
}

export interface Speaker {
  id: number;
  name: string;
  designation: string;
  image: string;
}

export interface Vertical {
  id: number;
  title: string;
  icon: LucideIcon;
  color: string;
}

export interface Sponsor {
  id: number;
  name: string;
  tier: 'Platinum' | 'Gold' | 'Silver' | 'Partner';
  logo: string; // URL or placeholder text
}
