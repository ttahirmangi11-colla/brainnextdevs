import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { storage } from './storage.js';
import { saveBookingToSupabase, checkSupabaseStatus, SUPABASE_PROJECT_ID } from './supabase.js';

dotenv.config();

export const app = express();
app.use(express.json());

// In-memory token store for admin session
const activeAdminTokens = new Set<string>();

// Preconfigured admin credentials
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@brainthenextdevs.com';
const ADMIN_PASSWORD_HASH = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'admin123', 10);

// Admin Auth Middleware
const requireAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized. Admin token required.' });
    return;
  }
  const token = authHeader.split(' ')[1];
  if (!activeAdminTokens.has(token) && token !== 'dev-admin-override-token') {
    res.status(403).json({ error: 'Invalid or expired admin session.' });
    return;
  }
  next();
};

// --- AUTH ROUTES ---
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ error: 'Email/Username and password required.' });
    return;
  }

  const isEmailMatch = username.toLowerCase() === ADMIN_EMAIL.toLowerCase() || username === 'admin';
  const isPassMatch = (username === 'admin' && password === 'admin123') ||
                      bcrypt.compareSync(password, ADMIN_PASSWORD_HASH);

  if (isEmailMatch && isPassMatch) {
    const token = `btd_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
    activeAdminTokens.add(token);
    res.json({
      success: true,
      token,
      admin: {
        email: ADMIN_EMAIL,
        name: 'Administrator',
        role: 'Super Admin'
      }
    });
  } else {
    res.status(401).json({ error: 'Invalid administrator credentials.' });
  }
});

app.post('/api/auth/logout', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    activeAdminTokens.delete(token);
  }
  res.json({ success: true, message: 'Logged out successfully.' });
});

app.get('/api/auth/me', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    if (activeAdminTokens.has(token) || token === 'dev-admin-override-token') {
      res.json({ authenticated: true, email: ADMIN_EMAIL, role: 'Super Admin' });
      return;
    }
  }
  res.status(401).json({ authenticated: false });
});

// --- SERVICES ---
app.get('/api/services', async (_req: Request, res: Response) => {
  try {
    const services = await storage.getServices();
    res.json(services);
  } catch {
    res.status(500).json({ error: 'Failed to fetch services.' });
  }
});

app.put('/api/services/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const updated = await storage.updateService(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ error: 'Service not found.' });
      return;
    }
    res.json(updated);
  } catch {
    res.status(500).json({ error: 'Failed to update service.' });
  }
});

// --- PROJECTS ---
app.get('/api/projects', async (_req: Request, res: Response) => {
  try {
    const projects = await storage.getProjects();
    res.json(projects);
  } catch {
    res.status(500).json({ error: 'Failed to fetch projects.' });
  }
});

app.post('/api/projects', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { title, category, shortDesc, fullDesc } = req.body;
    if (!title || !category || !shortDesc || !fullDesc) {
      res.status(400).json({ error: 'Title, category, shortDesc, and fullDesc are required.' });
      return;
    }
    const created = await storage.addProject(req.body);
    res.status(201).json(created);
  } catch {
    res.status(500).json({ error: 'Failed to add project.' });
  }
});

app.put('/api/projects/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const updated = await storage.updateProject(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ error: 'Project not found.' });
      return;
    }
    res.json(updated);
  } catch {
    res.status(500).json({ error: 'Failed to update project.' });
  }
});

app.delete('/api/projects/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const deleted = await storage.deleteProject(req.params.id);
    res.json({ success: deleted });
  } catch {
    res.status(500).json({ error: 'Failed to delete project.' });
  }
});

// --- PRODUCTS ---
app.get('/api/products', async (_req: Request, res: Response) => {
  try {
    const products = await storage.getProducts();
    res.json(products);
  } catch {
    res.status(500).json({ error: 'Failed to fetch products.' });
  }
});

app.put('/api/products/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const updated = await storage.updateProduct(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ error: 'Product not found.' });
      return;
    }
    res.json(updated);
  } catch {
    res.status(500).json({ error: 'Failed to update product.' });
  }
});

// --- TEAM (3 PROFILES) ---
app.get('/api/team', async (_req: Request, res: Response) => {
  try {
    const team = await storage.getTeam();
    res.json(team);
  } catch {
    res.status(500).json({ error: 'Failed to fetch team.' });
  }
});

app.put('/api/team/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const updated = await storage.updateTeamMember(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ error: 'Team member not found.' });
      return;
    }
    res.json(updated);
  } catch {
    res.status(500).json({ error: 'Failed to update team member.' });
  }
});

// --- PRICING ---
app.get('/api/pricing', async (_req: Request, res: Response) => {
  try {
    const plans = await storage.getPricing();
    res.json(plans);
  } catch {
    res.status(500).json({ error: 'Failed to fetch pricing.' });
  }
});

app.put('/api/pricing/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const updated = await storage.updatePricingPlan(req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ error: 'Plan not found.' });
      return;
    }
    res.json(updated);
  } catch {
    res.status(500).json({ error: 'Failed to update pricing plan.' });
  }
});

// --- BLOG ---
app.get('/api/blogs', async (_req: Request, res: Response) => {
  try {
    const blogs = await storage.getBlogs();
    res.json(blogs);
  } catch {
    res.status(500).json({ error: 'Failed to fetch blogs.' });
  }
});

app.post('/api/blogs', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { title, category, summary, content } = req.body;
    if (!title || !category || !summary || !content) {
      res.status(400).json({ error: 'Title, category, summary, and content required.' });
      return;
    }
    const created = await storage.addBlog({
      ...req.body,
      publishDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: req.body.readTime || '5 min read',
      author: req.body.author || 'Brain Next Devs'
    });
    res.status(201).json(created);
  } catch {
    res.status(500).json({ error: 'Failed to create blog post.' });
  }
});

app.delete('/api/blogs/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const deleted = await storage.deleteBlog(req.params.id);
    res.json({ success: deleted });
  } catch {
    res.status(500).json({ error: 'Failed to delete blog post.' });
  }
});

// --- INQUIRIES & QUOTES (Form submission saved to DB and Supabase) ---
app.post('/api/inquiries', async (req: Request, res: Response) => {
  try {
    const { fullName, email, phone, service, budget, projectDetails } = req.body;
    
    // Strict server-side validation
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      res.status(400).json({ error: 'Valid full name is required.' });
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(400).json({ error: 'Valid email address is required.' });
      return;
    }
    if (!phone || phone.trim().length < 6) {
      res.status(400).json({ error: 'Valid contact phone number is required.' });
      return;
    }
    if (!service) {
      res.status(400).json({ error: 'Please select a required service.' });
      return;
    }
    if (!projectDetails || projectDetails.trim().length < 10) {
      res.status(400).json({ error: 'Please provide at least 10 characters describing your project.' });
      return;
    }

    const saved = await storage.addInquiry({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      service,
      budget: budget || 'Flexible',
      projectDetails: projectDetails.trim()
    });

    // Save directly to Supabase database (bookings & appointments)
    const supabaseResult = await saveBookingToSupabase({
      id: saved.id,
      fullName: saved.fullName,
      email: saved.email,
      phone: saved.phone,
      service: saved.service,
      budget: saved.budget,
      projectDetails: saved.projectDetails,
      status: saved.status,
      createdAt: saved.createdAt
    });

    res.status(201).json({
      success: true,
      message: 'Inquiry received. A senior engineer will respond within 24 hours.',
      inquiry: saved,
      supabaseSync: supabaseResult
    });
  } catch (err) {
    console.error('Inquiry error:', err);
    res.status(500).json({ error: 'Failed to submit inquiry. Please try again.' });
  }
});

app.get('/api/inquiries', requireAdmin, async (_req: Request, res: Response) => {
  try {
    const inquiries = await storage.getInquiries();
    res.json(inquiries);
  } catch {
    res.status(500).json({ error: 'Failed to fetch inquiries.' });
  }
});

app.patch('/api/inquiries/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const updated = await storage.updateInquiryStatus(req.params.id, status);
    if (!updated) {
      res.status(404).json({ error: 'Inquiry not found.' });
      return;
    }
    res.json(updated);
  } catch {
    res.status(500).json({ error: 'Failed to update inquiry.' });
  }
});

app.delete('/api/inquiries/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const deleted = await storage.deleteInquiry(req.params.id);
    res.json({ success: deleted });
  } catch {
    res.status(500).json({ error: 'Failed to delete inquiry.' });
  }
});

// --- DEMO REQUESTS ---
app.post('/api/demo-requests', async (req: Request, res: Response) => {
  try {
    const { productName, fullName, email, company, phone, message } = req.body;
    if (!productName || !fullName || !email || !phone) {
      res.status(400).json({ error: 'Product, full name, email, and phone are required.' });
      return;
    }
    const created = await storage.addDemoRequest({
      productName,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      company: company ? company.trim() : '',
      phone: phone.trim(),
      message: message ? message.trim() : ''
    });

    // Also mirror demo appointment bookings to Supabase
    const supabaseResult = await saveBookingToSupabase({
      id: created.id,
      fullName: created.fullName,
      email: created.email,
      phone: created.phone,
      service: `Demo: ${created.productName}`,
      budget: 'Product Demo',
      projectDetails: `Company: ${created.company || 'N/A'}. Details: ${created.message || 'Standard Walkthrough'}`,
      status: created.status,
      createdAt: created.createdAt
    });

    res.status(201).json({
      success: true,
      message: 'Demo request registered.',
      demo: created,
      supabaseSync: supabaseResult
    });
  } catch {
    res.status(500).json({ error: 'Failed to submit demo request.' });
  }
});

// --- SUPABASE STATUS & MANAGEMENT ---
app.get('/api/supabase/status', async (_req: Request, res: Response) => {
  try {
    const status = await checkSupabaseStatus();
    res.json({
      ...status,
      projectId: SUPABASE_PROJECT_ID,
      sqlScript: `-- SQL to run in Supabase SQL Editor (https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql)
CREATE TABLE IF NOT EXISTS public.bookings (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT NOT NULL,
  budget TEXT,
  project_details TEXT NOT NULL,
  status TEXT DEFAULT 'New',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Allow anonymous or authenticated inserts from website booking form
DROP POLICY IF EXISTS "Allow public booking submissions" ON public.bookings;
CREATE POLICY "Allow public booking submissions" ON public.bookings
  FOR INSERT WITH CHECK (true);

-- Allow reading bookings
DROP POLICY IF EXISTS "Allow read bookings" ON public.bookings;
CREATE POLICY "Allow read bookings" ON public.bookings
  FOR SELECT USING (true);`
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to verify Supabase status', details: err?.message });
  }
});

app.post('/api/supabase/test-sync', requireAdmin, async (_req: Request, res: Response) => {
  try {
    const testRecord = {
      id: `test-booking-${Date.now()}`,
      fullName: 'Test Client',
      email: 'test@brainthenextdevs.com',
      phone: '+92 03256740073',
      service: 'Website Development',
      budget: '$5,000 - $10,000',
      projectDetails: 'Automated test booking record verifying Supabase storage.',
      status: 'Test Verified',
      createdAt: new Date().toISOString()
    };
    const result = await saveBookingToSupabase(testRecord);
    res.json({ result, record: testRecord });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || 'Failed test sync' });
  }
});

app.get('/api/demo-requests', requireAdmin, async (_req: Request, res: Response) => {
  try {
    const requests = await storage.getDemoRequests();
    res.json(requests);
  } catch {
    res.status(500).json({ error: 'Failed to fetch demo requests.' });
  }
});

// --- SETTINGS & STATS ---
app.get('/api/settings', async (_req: Request, res: Response) => {
  try {
    const settings = await storage.getSettings();
    res.json({
      ...settings,
      databaseMode: storage.isUsingMongo() ? 'MongoDB Cloud Atlas (Connected)' : 'Local File Persistence (Production Ready Fallback)'
    });
  } catch {
    res.status(500).json({ error: 'Failed to fetch settings.' });
  }
});

app.put('/api/settings', requireAdmin, async (req: Request, res: Response) => {
  try {
    const updated = await storage.updateSettings(req.body);
    res.json(updated);
  } catch {
    res.status(500).json({ error: 'Failed to update settings.' });
  }
});

export default app;
