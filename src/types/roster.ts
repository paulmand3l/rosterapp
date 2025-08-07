export interface Entry {
  id: string;
  name: string;
  emoji: string;
  ratings: {
    [key: string]: number;
  };
  dates: DateEvent[];
  notes: string;
  flags: string[];
  howWeMet: string;
  age?: number;
  height?: string;
  createdAt: string;
  updatedAt: string;
  order?: number;
}

export interface DateEvent {
  id: string;
  location: string;
  date: string;
  notes: string;
  rating: number;
}
