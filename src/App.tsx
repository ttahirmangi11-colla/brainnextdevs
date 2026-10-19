/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.js';
import { Hero } from './components/Hero.js';
import { ServicesSection } from './components/ServicesSection.js';
import { PortfolioSection } from './components/PortfolioSection.js';
import { ProductsSection } from './components/ProductsSection.js';
import { WhyChooseUs } from './components/WhyChooseUs.js';
import { AboutSection } from './components/AboutSection.js';
import { TeamSection } from './components/TeamSection.js';
import { PricingSection } from './components/PricingSection.js';
import { BlogSection } from './components/BlogSection.js';
import { ContactSection } from './components/ContactSection.js';
import { Footer } from './components/Footer.js';

// Modals
import { ProjectModal } from './components/modals/ProjectModal.js';
import { DemoRequestModal } from './components/modals/DemoRequestModal.js';
import { ServiceModal } from './components/modals/ServiceModal.js';
import { BlogModal } from './components/modals/BlogModal.js';
import { AdminLoginModal } from './components/modals/AdminLoginModal.js';
import { AdminDashboard } from './components/AdminDashboard.js';

import {
  ServiceItem,
  ProjectItem,
  ProductItem,
  TeamMemberItem,
  PricingPlanItem,
  BlogPostItem,
  SiteSettings
} from './types/index.js';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Core Data State
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [team, setTeam] = useState<TeamMemberItem[]>([]);
  const [pricing, setPricing] = useState<PricingPlanItem[]>([]);
  const [blogs, setBlogs] = useState<BlogPostItem[]>([]);
  const [settings, setSettings] = useState<SiteSettings>({
    companyName: 'Brain The Next Devs',
    tagline: 'Think Beyond. Build the Future.',
    email: 'brainnextdeve@gmail.com',
    phone: '+92 03256740073',
    address: 'Innovation Tech Park, Suite 400, Global Silicon District',
    stats: {
      projectsCompleted: '250+',
      happyClients: '180+',
      yearsExperience: '8+',
      technicalSupport: '24/7'
    },
    notice: 'Sample demonstration achievements. Custom metrics configurable in admin.'
  });

  // Modal State
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  const [selectedBlog, setSelectedBlog] = useState<BlogPostItem | null>(null);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);

  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [adminToken, setAdminToken] = useState<string | null>(() => {
    return localStorage.getItem('btd_admin_token');
  });

  // Prefilled contact form values
  const [prefilledService, setPrefilledService] = useState('');
  const [prefilledPlan, setPrefilledPlan] = useState('');

  // Fetch all live database records
  const fetchData = async () => {
    try {
      const [srvRes, projRes, prodRes, teamRes, priceRes, blogRes, settRes] = await Promise.all([
        fetch('/api/services'),
        fetch('/api/projects'),
        fetch('/api/products'),
        fetch('/api/team'),
        fetch('/api/pricing'),
        fetch('/api/blogs'),
        fetch('/api/settings')
      ]);

      if (srvRes.ok) setServices(await srvRes.json());
      if (projRes.ok) setProjects(await projRes.json());
      if (prodRes.ok) setProducts(await prodRes.json());
      if (teamRes.ok) setTeam(await teamRes.json());
      if (priceRes.ok) setPricing(await priceRes.json());
      if (blogRes.ok) setBlogs(await blogRes.json());
      if (settRes.ok) setSettings(await settRes.json());
    } catch (err) {
      console.error('Failed to load site data from backend:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Section observer for updating active nav link
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ['home', 'about', 'services', 'portfolio', 'products', 'pricing', 'blog', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenQuote = () => {
    handleNavigate('contact');
  };

  const handleStartProject = () => {
    handleNavigate('contact');
  };

  const handleExploreSolutions = () => {
    handleNavigate('services');
  };

  const handleSelectService = (srv: ServiceItem) => {
    setSelectedService(srv);
    setIsServiceModalOpen(true);
  };

  const handleRequestQuoteWithService = (serviceTitle: string) => {
    setPrefilledService(serviceTitle);
    handleNavigate('contact');
  };

  const handleOpenProjectDetails = (project: ProjectItem) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  const handleOpenLiveDemo = (project: ProjectItem) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  const handleRequestDemoProduct = (product: ProductItem) => {
    setSelectedProduct(product);
    setIsDemoModalOpen(true);
  };

  const handleSelectPlan = (plan: PricingPlanItem) => {
    setPrefilledPlan(plan.name);
    handleNavigate('contact');
  };

  const handleReadArticle = (blog: BlogPostItem) => {
    setSelectedBlog(blog);
    setIsBlogModalOpen(true);
  };

  const handleOpenAdmin = () => {
    if (adminToken) {
      setIsAdminDashboardOpen(true);
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  const handleSuccessLogin = (token: string) => {
    setAdminToken(token);
    localStorage.setItem('btd_admin_token', token);
    setIsAdminDashboardOpen(true);
  };

  const handleLogout = () => {
    setAdminToken(null);
    localStorage.removeItem('btd_admin_token');
    setIsAdminDashboardOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans">
      
      {/* Slim, professional navigation bar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenQuote={handleOpenQuote}
        onOpenAdmin={handleOpenAdmin}
        isAdminLoggedIn={!!adminToken}
      />

      <main className="flex-grow">
        {/* Homepage Hero Section with digital AI face and stats */}
        <div id="home">
          <Hero
            stats={settings.stats}
            notice={settings.notice}
            onStartProject={handleStartProject}
            onExploreSolutions={handleExploreSolutions}
          />
        </div>

        {/* About Us */}
        <AboutSection onStartProject={handleStartProject} />

        {/* 8 Services */}
        <ServicesSection
          services={services}
          onSelectService={handleSelectService}
          onRequestQuoteWithService={handleRequestQuoteWithService}
        />

        {/* Featured Projects with category filters */}
        <PortfolioSection
          projects={projects}
          onOpenProjectDetails={handleOpenProjectDetails}
          onOpenLiveDemo={handleOpenLiveDemo}
        />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Software Products Showcase (Brain ERP, School, Inventory, Hospital) */}
        <ProductsSection
          products={products}
          onRequestDemo={handleRequestDemoProduct}
        />

        {/* Exactly 3 Team Profiles (Tahir Mangi CEO, Ayesha Khan, Bilal Khan) */}
        <TeamSection team={team} />

        {/* 3 Editable Pricing Plans */}
        <PricingSection
          plans={pricing}
          onSelectPlan={handleSelectPlan}
        />

        {/* Blog & Tutorials */}
        <BlogSection
          blogs={blogs}
          onReadArticle={handleReadArticle}
        />

        {/* Contact Form & Information */}
        <ContactSection
          settings={settings}
          prefilledService={prefilledService}
          prefilledPlan={prefilledPlan}
          onInquirySubmitted={() => fetchData()}
        />
      </main>

      {/* Footer */}
      <Footer
        settings={settings}
        onNavigate={handleNavigate}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Modals */}
      <ProjectModal
        project={selectedProject}
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onRequestQuoteWithProject={(title) => {
          setPrefilledService(title);
          handleNavigate('contact');
        }}
      />

      <DemoRequestModal
        product={selectedProduct}
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />

      <ServiceModal
        service={selectedService}
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        onRequestQuoteWithService={handleRequestQuoteWithService}
      />

      <BlogModal
        blog={selectedBlog}
        isOpen={isBlogModalOpen}
        onClose={() => setIsBlogModalOpen(false)}
      />

      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onSuccessLogin={handleSuccessLogin}
      />

      {isAdminDashboardOpen && adminToken && (
        <AdminDashboard
          token={adminToken}
          onLogout={handleLogout}
          onClose={() => setIsAdminDashboardOpen(false)}
          onDataChanged={() => fetchData()}
        />
      )}

    </div>
  );
}
