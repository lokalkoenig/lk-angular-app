import { Kampagne } from './../kampagne';

export class KampagnenEntity {
  id: number;
  title: string;
  thumbnail: string;
  subtitle: string;
  teaser: string;
  sid: string;
  print_title: string;
  print_text: string;
  print_versions: string;
  print_mockup: string;
  online_title: string;
  online_text: string;
  online_versions: string;
  online_mockup: string;
  mlt: Kampagne[];
  
  marked: boolean;
}