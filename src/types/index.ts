export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  features: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Websites' | 'Applications' | 'Software';
  shortDesc: string;
  fullDesc: string;
  technologies: string[];
  thumbnail: string;
  isDemoAvailable: boolean;
  demoUrl?: string;
  highlights: string[];
}

export interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  thumbnail: string;
  keyFeatures: string[];
  modules: string[];
  status: 'Available' | 'Beta' | 'Concept';
}

export interface TeamMemberItem {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  isFounder?: boolean;
  socials: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

export interface PricingPlanItem {
  id: string;
  name: string;
  tagline: string;
  price: string;
  period: string;
  popular?: boolean;
  features: string[];
  supportTerms: string;
}

export interface BlogPostItem {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  publishDate: string;
  readTime: string;
  author: string;
  imageUrl?: string;
}

export interface InquiryItem {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  projectDetails: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Closed';
  createdAt: string;
}

export interface DemoRequestItem {
  id: string;
  productName: string;
  fullName: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  status: 'Pending' | 'Scheduled' | 'Completed';
  createdAt: string;
}

export interface SiteStats {
  projectsCompleted: string;
  happyClients: string;
  yearsExperience: string;
  technicalSupport: string;
}

export interface SiteSettings {
  companyName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  stats: SiteStats;
  notice: string;
}
