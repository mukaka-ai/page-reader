// Mock data for the application (replacing Firebase)

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  type: "competition" | "seminar" | "workshop" | "exam";
  registrationLink?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: "high" | "medium" | "low";
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  category: string;
}

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Nairobi Open Championship 2024",
    description: "Annual regional Taekwondo competition featuring sparring and forms divisions for all belt levels.",
    date: "2024-06-15",
    location: "Kasarani Indoor Arena, Nairobi",
    type: "competition",
    registrationLink: "/join"
  },
  {
    id: "2",
    title: "Black Belt Grading Ceremony",
    description: "Testing ceremony for candidates advancing to Dan ranks. Candidates must pre-register.",
    date: "2024-05-20",
    location: "Nairobi TKD Headquarters",
    type: "exam"
  },
  {
    id: "3",
    title: "International Referee Seminar",
    description: "Learn the latest WTF competition rules and refereeing techniques from international instructors.",
    date: "2024-07-10",
    location: "KICC Conference Center",
    type: "seminar"
  },
  {
    id: "4",
    title: "Youth Summer Camp",
    description: "Week-long intensive training camp for young athletes aged 8-17. Includes sparring, forms, and leadership training.",
    date: "2024-08-05",
    location: "Naivasha Sports Resort",
    type: "workshop"
  }
];

export const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "New Training Schedule",
    content: "Starting next month, we'll have additional Saturday morning classes for beginners.",
    date: "2024-04-01",
    priority: "high"
  },
  {
    id: "2",
    title: "Equipment Sale",
    content: "Get 20% off on all training equipment this month. Visit our pro shop!",
    date: "2024-03-28",
    priority: "medium"
  },
  {
    id: "3",
    title: "Holiday Schedule",
    content: "The academy will be closed on Easter weekend. Regular classes resume on Tuesday.",
    date: "2024-03-25",
    priority: "low"
  }
];

export const mockGalleryImages: GalleryImage[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800",
    caption: "Training session",
    category: "training"
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?w=800",
    caption: "Competition day",
    category: "competition"
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800",
    caption: "Belt ceremony",
    category: "events"
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=800",
    caption: "Kids class",
    category: "training"
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
    caption: "Adult sparring",
    category: "training"
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800",
    caption: "Team photo",
    category: "events"
  }
];
