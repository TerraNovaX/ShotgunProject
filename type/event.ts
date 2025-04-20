export interface Event {
    id: string;
    created_at: string;
    title: string;
    description: string;
    date: string;
    location: {
      name:string;
      city:string;
      latitude: number;
      longitude: number;
    };
    category: string;
    is_premium: boolean;
  }