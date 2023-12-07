export interface Page {
  title: string;
  content: string;
}

export interface ApiPage {
  [key: string]: Page
}