import mongoose, { Schema } from 'mongoose';

// Service Schema
export const ServiceSchema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, default: 'General' },
  shortDesc: { type: String, required: true },
  fullDesc: { type: String, required: true },
  iconName: { type: String, default: 'Code' },
  features: [{ type: String }]
}, { timestamps: true });

// Project Schema
export const ProjectSchema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true, enum: ['Websites', 'Applications', 'Software'] },
  shortDesc: { type: String, required: true },
  fullDesc: { type: String, required: true },
  technologies: [{ type: String }],
  thumbnail: { type: String, default: '' },
  isDemoAvailable: { type: Boolean, default: false },
  demoUrl: { type: String, default: '' },
  highlights: [{ type: String }]
}, { timestamps: true });

// Product Schema
export const ProductSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  tagline: { type: String, default: '' },
  description: { type: String, required: true },
  thumbnail: { type: String, default: '' },
  keyFeatures: [{ type: String }],
  modules: [{ type: String }],
  status: { type: String, default: 'Concept', enum: ['Available', 'Beta', 'Concept'] }
}, { timestamps: true });

// Team Member Schema
export const TeamMemberSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  bio: { type: String, required: true },
  photoUrl: { type: String, default: '' },
  isFounder: { type: Boolean, default: false },
  socials: {
    linkedin: { type: String, default: '' },
    github: { type: String, default: '' },
    twitter: { type: String, default: '' }
  }
}, { timestamps: true });

// Pricing Plan Schema
export const PricingPlanSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  tagline: { type: String, default: '' },
  price: { type: String, required: true },
  period: { type: String, default: 'per project' },
  popular: { type: Boolean, default: false },
  features: [{ type: String }],
  supportTerms: { type: String, default: '' }
}, { timestamps: true });

// Blog Post Schema
export const BlogPostSchema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  publishDate: { type: String, required: true },
  readTime: { type: String, default: '5 min read' },
  author: { type: String, default: 'Brain Next Devs Team' },
  imageUrl: { type: String, default: '' }
}, { timestamps: true });

// Inquiry Schema
export const InquirySchema = new Schema({
  id: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, required: true },
  budget: { type: String, required: true },
  projectDetails: { type: String, required: true },
  status: { type: String, default: 'New', enum: ['New', 'Contacted', 'In Progress', 'Closed'] },
  createdAt: { type: String, default: () => new Date().toISOString() }
}, { timestamps: true });

// Demo Request Schema
export const DemoRequestSchema = new Schema({
  id: { type: String, required: true, unique: true },
  productName: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String, default: '' },
  phone: { type: String, required: true },
  message: { type: String, default: '' },
  status: { type: String, default: 'Pending', enum: ['Pending', 'Scheduled', 'Completed'] },
  createdAt: { type: String, default: () => new Date().toISOString() }
}, { timestamps: true });

// Settings Schema
export const SiteSettingSchema = new Schema({
  companyName: { type: String, default: 'Brain The Next Devs' },
  tagline: { type: String, default: 'Think Beyond. Build the Future.' },
  email: { type: String, default: 'brainnextdeve@gmail.com' },
  phone: { type: String, default: '+92 03256740073' },
  address: { type: String, default: 'Innovation Tech Park, Suite 400, Global Silicon District' },
  stats: {
    projectsCompleted: { type: String, default: '250+' },
    happyClients: { type: String, default: '180+' },
    yearsExperience: { type: String, default: '8+' },
    technicalSupport: { type: String, default: '24/7' }
  },
  notice: { type: String, default: 'Verified development agency sample metrics. Subject to contract verification.' }
}, { timestamps: true });

// Export Models
export const ServiceModel = mongoose.models.Service || mongoose.model('Service', ServiceSchema);
export const ProjectModel = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
export const ProductModel = mongoose.models.Product || mongoose.model('Product', ProductSchema);
export const TeamMemberModel = mongoose.models.TeamMember || mongoose.model('TeamMember', TeamMemberSchema);
export const PricingPlanModel = mongoose.models.PricingPlan || mongoose.model('PricingPlan', PricingPlanSchema);
export const BlogPostModel = mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema);
export const InquiryModel = mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema);
export const DemoRequestModel = mongoose.models.DemoRequest || mongoose.model('DemoRequest', DemoRequestSchema);
export const SiteSettingModel = mongoose.models.SiteSetting || mongoose.model('SiteSetting', SiteSettingSchema);
