import React, { useState, useEffect } from 'react';
import {
  Shield,
  LogOut,
  Mail,
  FolderGit2,
  Layers,
  Box,
  DollarSign,
  Users,
  FileText,
  Sliders,
  Database,
  Trash2,
  CheckCircle,
  Clock,
  RefreshCw,
  Plus,
  ExternalLink,
  Edit2,
  Save,
  X
} from 'lucide-react';
import {
  InquiryItem,
  DemoRequestItem,
  ProjectItem,
  ServiceItem,
  ProductItem,
  PricingPlanItem,
  TeamMemberItem,
  BlogPostItem,
  SiteSettings
} from '../types/index.js';

interface AdminDashboardProps {
  token: string;
  onLogout: () => void;
  onClose: () => void;
  onDataChanged: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  token,
  onLogout,
  onClose,
  onDataChanged
}) => {
  const [activeTab, setActiveTab] = useState<'inquiries' | 'demos' | 'projects' | 'services' | 'products' | 'pricing' | 'team' | 'blogs' | 'settings' | 'mongodb' | 'supabase'>('inquiries');
  
  // Data state
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [demos, setDemos] = useState<DemoRequestItem[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [pricing, setPricing] = useState<PricingPlanItem[]>([]);
  const [team, setTeam] = useState<TeamMemberItem[]>([]);
  const [blogs, setBlogs] = useState<BlogPostItem[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  const [loading, setLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // Editing state for Team
  const [editingTeamMember, setEditingTeamMember] = useState<TeamMemberItem | null>(null);
  
  // New Project Form
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'Websites' as 'Websites' | 'Applications' | 'Software',
    shortDesc: '',
    fullDesc: '',
    technologies: 'React, Node.js, TypeScript',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    isDemoAvailable: true,
    highlights: 'High throughput, Clean architecture'
  });

  // New Blog Form
  const [showAddBlog, setShowAddBlog] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: '',
    category: 'Software Development',
    summary: '',
    content: '',
    author: 'Brain Next Devs'
  });

  // Supabase states
  const [supabaseStatus, setSupabaseStatus] = useState<any>(null);
  const [isTestingSupabase, setIsTestingSupabase] = useState(false);
  const [supabaseTestMsg, setSupabaseTestMsg] = useState<string | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);

  const authHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [
        inqRes,
        demoRes,
        projRes,
        srvRes,
        prodRes,
        priceRes,
        teamRes,
        blogRes,
        settRes,
        supaRes
      ] = await Promise.all([
        fetch('/api/inquiries', { headers: authHeaders }),
        fetch('/api/demo-requests', { headers: authHeaders }),
        fetch('/api/projects'),
        fetch('/api/services'),
        fetch('/api/products'),
        fetch('/api/pricing'),
        fetch('/api/team'),
        fetch('/api/blogs'),
        fetch('/api/settings'),
        fetch('/api/supabase/status')
      ]);

      if (inqRes.ok) setInquiries(await inqRes.json());
      if (demoRes.ok) setDemos(await demoRes.json());
      if (projRes.ok) setProjects(await projRes.json());
      if (srvRes.ok) setServices(await srvRes.json());
      if (prodRes.ok) setProducts(await prodRes.json());
      if (priceRes.ok) setPricing(await priceRes.json());
      if (teamRes.ok) setTeam(await teamRes.json());
      if (blogRes.ok) setBlogs(await blogRes.json());
      if (settRes.ok) setSettings(await settRes.json());
      if (supaRes.ok) setSupabaseStatus(await supaRes.json());
    } catch (e) {
      console.error('Error fetching admin data:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleTestSupabaseSync = async () => {
    setIsTestingSupabase(true);
    setSupabaseTestMsg(null);
    try {
      const res = await fetch('/api/supabase/test-sync', {
        method: 'POST',
        headers: authHeaders
      });
      const data = await res.json();
      if (data.result?.success) {
        setSupabaseTestMsg('Successfully stored test booking appointment into Supabase!');
      } else {
        setSupabaseTestMsg(`Supabase response: ${data.result?.error || 'Table not found yet. Run the SQL script below.'}`);
      }
      // re-check status
      const supaRes = await fetch('/api/supabase/status');
      if (supaRes.ok) setSupabaseStatus(await supaRes.json());
    } catch (err: any) {
      setSupabaseTestMsg(`Connection error: ${err?.message}`);
    } finally {
      setIsTestingSupabase(false);
    }
  };

  const handleCopySql = () => {
    if (supabaseStatus?.sqlScript) {
      navigator.clipboard.writeText(supabaseStatus.sqlScript);
      setCopiedSql(true);
      setTimeout(() => setCopiedSql(false), 2500);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [token]);

  const showNotification = (msg: string) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(null), 3000);
  };

  // Inquiry Status Handler
  const handleUpdateInquiryStatus = async (id: string, status: InquiryItem['status']) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: authHeaders,
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status } : inq));
        showNotification(`Inquiry updated to "${status}"`);
      }
    } catch {
      showNotification('Failed to update inquiry status');
    }
  };

  // Delete Inquiry
  const handleDeleteInquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry record?')) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'DELETE',
        headers: authHeaders
      });
      if (res.ok) {
        setInquiries(prev => prev.filter(i => i.id !== id));
        showNotification('Inquiry record deleted from database');
      }
    } catch {
      showNotification('Failed to delete inquiry');
    }
  };

  // Add Project
  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({
          title: newProject.title,
          category: newProject.category,
          shortDesc: newProject.shortDesc,
          fullDesc: newProject.fullDesc || newProject.shortDesc,
          technologies: newProject.technologies.split(',').map(s => s.trim()),
          thumbnail: newProject.thumbnail,
          isDemoAvailable: newProject.isDemoAvailable,
          highlights: newProject.highlights.split(',').map(s => s.trim())
        })
      });

      if (res.ok) {
        const created = await res.json();
        setProjects(prev => [...prev, created]);
        setShowAddProject(false);
        showNotification('New project added to database.');
        onDataChanged();
      }
    } catch {
      showNotification('Error creating project');
    }
  };

  // Delete Project
  const handleDeleteProject = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: authHeaders
      });
      if (res.ok) {
        setProjects(prev => prev.filter(p => p.id !== id));
        showNotification('Project removed');
        onDataChanged();
      }
    } catch {
      showNotification('Failed to delete project');
    }
  };

  // Save Team Member Edits
  const handleSaveTeamMember = async () => {
    if (!editingTeamMember) return;
    try {
      const res = await fetch(`/api/team/${editingTeamMember.id}`, {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify(editingTeamMember)
      });
      if (res.ok) {
        const updated = await res.json();
        setTeam(prev => prev.map(m => m.id === updated.id ? updated : m));
        setEditingTeamMember(null);
        showNotification(`Team member ${updated.name} updated.`);
        onDataChanged();
      }
    } catch {
      showNotification('Failed to save team member profile');
    }
  };

  // Add Blog
  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify(newBlog)
      });
      if (res.ok) {
        const created = await res.json();
        setBlogs(prev => [created, ...prev]);
        setShowAddBlog(false);
        showNotification('Blog article published');
        onDataChanged();
      }
    } catch {
      showNotification('Failed to publish blog article');
    }
  };

  // Delete Blog
  const handleDeleteBlog = async (id: string) => {
    if (!confirm('Delete this article?')) return;
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
        headers: authHeaders
      });
      if (res.ok) {
        setBlogs(prev => prev.filter(b => b.id !== id));
        showNotification('Blog post removed');
        onDataChanged();
      }
    } catch {
      showNotification('Failed to delete blog post');
    }
  };

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        showNotification('Site settings & statistics updated successfully');
        onDataChanged();
      }
    } catch {
      showNotification('Failed to save settings');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#030712] text-slate-100 overflow-hidden">
      
      {/* Top Admin Header */}
      <header className="h-16 px-6 border-b border-cyan-950/80 bg-slate-950 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-400">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white flex items-center gap-2">
              Brain Next Devs <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60">Admin Console</span>
            </h1>
            <div className="text-[10px] font-mono text-slate-400">
              MongoDB / Node.js Express Architecture
            </div>
          </div>
        </div>

        {/* Global Action Banner */}
        {actionMessage && (
          <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-xs text-emerald-300 font-mono animate-in fade-in">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>{actionMessage}</span>
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            onClick={fetchAllData}
            title="Refresh database records"
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 cursor-pointer"
          >
            Back to Website
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-950/30 border border-rose-900/40 hover:bg-rose-950/60 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Container: Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar Nav */}
        <aside className="w-56 border-r border-slate-900 bg-slate-950/70 p-4 space-y-1.5 overflow-y-auto shrink-0">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-3 py-1">
            Data Collections
          </div>
          
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'inquiries' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4" />
              <span>Inquiries</span>
            </div>
            <span className="px-1.5 py-0.2 rounded-md bg-slate-900 text-[10px] font-mono text-cyan-400 border border-slate-800">
              {inquiries.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('demos')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'demos' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Box className="w-4 h-4" />
              <span>Demo Requests</span>
            </div>
            <span className="px-1.5 py-0.2 rounded-md bg-slate-900 text-[10px] font-mono text-cyan-400 border border-slate-800">
              {demos.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'projects' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Projects ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'services' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Services ({services.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'products' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <Box className="w-4 h-4" />
            <span>Products ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('pricing')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'pricing' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Pricing Plans ({pricing.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('team')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'team' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Team Profiles (3)</span>
          </button>

          <button
            onClick={() => setActiveTab('blogs')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'blogs' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Blog Articles ({blogs.length})</span>
          </button>

          <div className="pt-4 text-[10px] font-mono uppercase tracking-wider text-slate-500 px-3 py-1">
            System Config
          </div>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'settings' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Settings &amp; Stats</span>
          </button>

          <button
            onClick={() => setActiveTab('mongodb')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'mongodb' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>MongoDB Setup</span>
          </button>

          <button
            onClick={() => setActiveTab('supabase')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'supabase' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Database className="w-4 h-4 text-emerald-400" />
              <span>Supabase Cloud</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
          </button>
        </aside>

        {/* Content View */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto bg-[#030712]">
          
          {/* TAB 1: INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">Client Project Inquiries</h2>
                  <p className="text-xs text-slate-400">Incoming inquiries submitted through the website contact form.</p>
                </div>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/50 px-3 py-1 rounded border border-cyan-800/40">
                  Total: {inquiries.length}
                </span>
              </div>

              {inquiries.length === 0 ? (
                <div className="p-12 text-center text-slate-500 rounded-2xl border border-slate-900">
                  No inquiries received yet. Submit an inquiry through the Contact section to test.
                </div>
              ) : (
                <div className="space-y-4">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-white text-base">{inq.fullName}</span>
                          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-2 py-0.5 rounded">
                            {inq.service}
                          </span>
                          <span className="text-xs font-mono text-slate-400">
                            Budget: {inq.budget}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-4">
                          <span>{inq.email}</span>
                          <span>·</span>
                          <span>{inq.phone}</span>
                          <span>·</span>
                          <span className="text-slate-500">{new Date(inq.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-xs text-slate-300 pt-2 font-mono bg-slate-900/60 p-2.5 rounded-lg border border-slate-850">
                          &quot;{inq.projectDetails}&quot;
                        </p>
                      </div>

                      {/* Status Selector & Delete */}
                      <div className="flex items-center gap-3 shrink-0">
                        <select
                          value={inq.status}
                          onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value as any)}
                          className={`text-xs font-mono font-semibold rounded-lg px-3 py-1.5 border focus:outline-none cursor-pointer ${
                            inq.status === 'New'
                              ? 'bg-blue-950/70 border-blue-500/50 text-blue-300'
                              : inq.status === 'In Progress'
                              ? 'bg-amber-950/70 border-amber-500/50 text-amber-300'
                              : inq.status === 'Closed'
                              ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-300'
                              : 'bg-slate-900 border-slate-700 text-slate-300'
                          }`}
                        >
                          <option value="New">Status: New</option>
                          <option value="Contacted">Status: Contacted</option>
                          <option value="In Progress">Status: In Progress</option>
                          <option value="Closed">Status: Closed</option>
                        </select>

                        <button
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="p-2 rounded-lg text-slate-500 hover:text-rose-400 bg-slate-900 border border-slate-800 hover:border-rose-900 transition-colors cursor-pointer"
                          title="Delete inquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: DEMO REQUESTS */}
          {activeTab === 'demos' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">Product Demo Requests</h2>
                  <p className="text-xs text-slate-400">Requests for Brain ERP, Hospital System, and School System demos.</p>
                </div>
              </div>

              {demos.length === 0 ? (
                <div className="p-12 text-center text-slate-500 rounded-2xl border border-slate-900">
                  No demo requests registered yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {demos.map((d) => (
                    <div key={d.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-white">{d.productName}</span>
                          <span className="text-xs text-slate-400 font-mono">for {d.fullName} ({d.company || 'Enterprise'})</span>
                        </div>
                        <div className="text-xs text-slate-400">{d.email} · {d.phone}</div>
                        {d.message && <p className="text-xs text-slate-300 mt-2 font-mono">{d.message}</p>}
                      </div>
                      <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded border border-cyan-800/40">
                        {d.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PROJECTS */}
          {activeTab === 'projects' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">Featured Projects Manager</h2>
                  <p className="text-xs text-slate-400">Manage demonstration showcase projects, tags, and categories.</p>
                </div>
                <button
                  onClick={() => setShowAddProject(!showAddProject)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              </div>

              {/* Add Project Form */}
              {showAddProject && (
                <form onSubmit={handleCreateProject} className="p-6 mb-8 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-4">
                  <h3 className="text-sm font-bold text-white">Create New Demonstration Project</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="Project Title"
                      value={newProject.title}
                      onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                      className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                    />
                    <select
                      value={newProject.category}
                      onChange={e => setNewProject({ ...newProject, category: e.target.value as any })}
                      className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                    >
                      <option value="Websites">Websites</option>
                      <option value="Applications">Applications</option>
                      <option value="Software">Software</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Short Description"
                    value={newProject.shortDesc}
                    onChange={e => setNewProject({ ...newProject, shortDesc: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Technologies (comma separated, e.g. React, Node.js, MongoDB)"
                    value={newProject.technologies}
                    onChange={e => setNewProject({ ...newProject, technologies: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={newProject.thumbnail}
                    onChange={e => setNewProject({ ...newProject, thumbnail: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 cursor-pointer"
                    >
                      Save to Database
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddProject(false)}
                      className="px-4 py-2 rounded-lg text-xs text-slate-400 bg-slate-900 hover:text-white cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((p) => (
                  <div key={p.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex justify-between gap-4">
                    <div>
                      <div className="text-xs font-mono text-cyan-400">{p.category}</div>
                      <h4 className="font-bold text-white text-sm">{p.title}</h4>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1">{p.shortDesc}</p>
                      <div className="text-[10px] font-mono text-slate-500 mt-2">
                        {p.technologies.join(' · ')}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteProject(p.id)}
                      className="p-2 text-slate-500 hover:text-rose-400 self-start cursor-pointer"
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SERVICES */}
          {activeTab === 'services' && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white">Our 8 Services</h2>
                <p className="text-xs text-slate-400">View and adjust service descriptions.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((s) => (
                  <div key={s.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                    <div className="text-xs font-mono text-cyan-400">{s.category}</div>
                    <h4 className="text-base font-bold text-white mt-1">{s.title}</h4>
                    <p className="text-xs text-slate-300 mt-2">{s.shortDesc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PRODUCTS */}
          {activeTab === 'products' && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white">Software Products</h2>
                <p className="text-xs text-slate-400">Brain ERP, School Management, Inventory System, Hospital System.</p>
              </div>
              <div className="space-y-4">
                {products.map((prod) => (
                  <div key={prod.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row justify-between gap-4">
                    <div>
                      <span className="text-xs font-mono text-cyan-400">{prod.status}</span>
                      <h4 className="text-lg font-bold text-white">{prod.name}</h4>
                      <p className="text-xs text-cyan-200/80 mb-2">{prod.tagline}</p>
                      <p className="text-xs text-slate-400">{prod.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: PRICING */}
          {activeTab === 'pricing' && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white">Pricing Plans Manager</h2>
                <p className="text-xs text-slate-400">Edit package pricing, features, and support terms.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {pricing.map((p) => (
                  <div key={p.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-white text-lg">{p.name}</h4>
                        {p.popular && <span className="text-[10px] font-mono text-cyan-400">Popular</span>}
                      </div>
                      <div className="text-2xl font-bold font-mono text-cyan-300 my-2">{p.price}</div>
                      <div className="text-xs text-slate-400 mb-4">{p.tagline}</div>
                      <ul className="text-xs text-slate-300 space-y-1">
                        {p.features.map((f, i) => (
                          <li key={i}>• {f}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: TEAM (EXACTLY 3 PROFILES) */}
          {activeTab === 'team' && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white">Executive &amp; Core Team (3 Members)</h2>
                <p className="text-xs text-slate-400">Tahir Mangi (CEO &amp; Founder), Ayesha Khan (Project Manager), Bilal Khan (Lead Developer).</p>
              </div>

              {/* Editing Modal/Form */}
              {editingTeamMember && (
                <div className="p-6 mb-8 rounded-2xl bg-slate-950 border border-cyan-500/50 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white">Edit Profile: {editingTeamMember.name}</h3>
                    <button onClick={() => setEditingTeamMember(null)} className="text-slate-400 hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] text-slate-400 font-mono">Full Name</label>
                      <input
                        type="text"
                        value={editingTeamMember.name}
                        onChange={e => setEditingTeamMember({ ...editingTeamMember, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 font-mono">Role / Title</label>
                      <input
                        type="text"
                        value={editingTeamMember.role}
                        onChange={e => setEditingTeamMember({ ...editingTeamMember, role: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 font-mono">Biography</label>
                    <textarea
                      rows={3}
                      value={editingTeamMember.bio}
                      onChange={e => setEditingTeamMember({ ...editingTeamMember, bio: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                    />
                  </div>
                  <button
                    onClick={handleSaveTeamMember}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 cursor-pointer flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {team.map((member) => (
                  <div
                    key={member.id}
                    className={`p-6 rounded-2xl bg-slate-950 border flex flex-col justify-between ${
                      member.isFounder ? 'border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]' : 'border-slate-800'
                    }`}
                  >
                    <div>
                      <img
                        src={member.photoUrl}
                        alt={member.name}
                        className="w-20 h-20 rounded-xl object-cover mb-4 ring-1 ring-slate-700"
                        referrerPolicy="no-referrer"
                      />
                      <h4 className="font-bold text-white text-base">{member.name}</h4>
                      <div className="text-xs font-mono text-cyan-400 mb-3">{member.role}</div>
                      <p className="text-xs text-slate-300 leading-relaxed">{member.bio}</p>
                    </div>

                    <div className="pt-4 border-t border-slate-900 mt-4 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-500">ID: {member.id}</span>
                      <button
                        onClick={() => setEditingTeamMember(member)}
                        className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: BLOGS */}
          {activeTab === 'blogs' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">Blog &amp; Knowledge Base</h2>
                  <p className="text-xs text-slate-400">Publish technical articles and guides.</p>
                </div>
                <button
                  onClick={() => setShowAddBlog(!showAddBlog)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Article</span>
                </button>
              </div>

              {showAddBlog && (
                <form onSubmit={handleCreateBlog} className="p-6 mb-8 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-4">
                  <h3 className="text-sm font-bold text-white">Compose New Tech Article</h3>
                  <input
                    type="text"
                    required
                    placeholder="Article Title"
                    value={newBlog.title}
                    onChange={e => setNewBlog({ ...newBlog, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <select
                      value={newBlog.category}
                      onChange={e => setNewBlog({ ...newBlog, category: e.target.value })}
                      className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                    >
                      <option value="Software Development">Software Development</option>
                      <option value="AI Solutions">AI Solutions</option>
                      <option value="Website Development">Website Development</option>
                      <option value="Mobile Applications">Mobile Applications</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Author (e.g. Tahir Mangi)"
                      value={newBlog.author}
                      onChange={e => setNewBlog({ ...newBlog, author: e.target.value })}
                      className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                    />
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Short Summary / Abstract"
                    value={newBlog.summary}
                    onChange={e => setNewBlog({ ...newBlog, summary: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                  />
                  <textarea
                    rows={4}
                    placeholder="Full Article Content"
                    value={newBlog.content}
                    onChange={e => setNewBlog({ ...newBlog, content: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 cursor-pointer"
                    >
                      Publish
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddBlog(false)}
                      className="px-4 py-2 rounded-lg text-xs text-slate-400 bg-slate-900 hover:text-white cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-4">
                {blogs.map((b) => (
                  <div key={b.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono text-cyan-400">{b.category}</span>
                      <h4 className="font-bold text-white text-base mt-0.5">{b.title}</h4>
                      <div className="text-xs text-slate-400 mt-1">By {b.author} · {b.publishDate}</div>
                    </div>
                    <button
                      onClick={() => handleDeleteBlog(b.id)}
                      className="p-2 text-slate-500 hover:text-rose-400 cursor-pointer"
                      title="Delete article"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: SETTINGS & STATS */}
          {activeTab === 'settings' && settings && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white">Website Settings &amp; Editable Statistics</h2>
                <p className="text-xs text-slate-400">Configure public contact information and statistics row numbers.</p>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-6 max-w-2xl">
                <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                    Homepage Statistics Row (Configurable Sample Values)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] text-slate-400 font-mono">Projects Completed</label>
                      <input
                        type="text"
                        value={settings.stats.projectsCompleted}
                        onChange={e => setSettings({ ...settings, stats: { ...settings.stats, projectsCompleted: e.target.value } })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 font-mono">Happy Clients</label>
                      <input
                        type="text"
                        value={settings.stats.happyClients}
                        onChange={e => setSettings({ ...settings, stats: { ...settings.stats, happyClients: e.target.value } })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 font-mono">Years of Experience</label>
                      <input
                        type="text"
                        value={settings.stats.yearsExperience}
                        onChange={e => setSettings({ ...settings, stats: { ...settings.stats, yearsExperience: e.target.value } })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 font-mono">Technical Support</label>
                      <input
                        type="text"
                        value={settings.stats.technicalSupport}
                        onChange={e => setSettings({ ...settings, stats: { ...settings.stats, technicalSupport: e.target.value } })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                    Company Contact Information
                  </h3>
                  <div>
                    <label className="text-[11px] text-slate-400 font-mono">Public Contact Email</label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={e => setSettings({ ...settings, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 font-mono">Direct Phone</label>
                    <input
                      type="text"
                      value={settings.phone}
                      onChange={e => setSettings({ ...settings, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 font-mono">Office Address</label>
                    <input
                      type="text"
                      value={settings.address}
                      onChange={e => setSettings({ ...settings, address: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save All Settings</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 10: MONGODB & SETUP GUIDE */}
          {activeTab === 'mongodb' && (
            <div className="max-w-3xl space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Database Architecture &amp; Local Setup</h2>
                <p className="text-xs text-slate-400">Instructions for connecting MongoDB Atlas and local development.</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-4">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-sm font-bold text-white">Active Database Engine Status</h3>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300">
                  Mode: {(settings as any)?.databaseMode || 'Dual Engine (Mongoose / Local Persistent Storage)'}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Brain The Next Devs is architected with complete Mongoose schema models (<code className="text-cyan-400">src/server/models.ts</code>) ready for MongoDB Atlas. When <code className="text-cyan-400">MONGODB_URI</code> is specified in the environment, the server automatically connects to your MongoDB cluster and syncs collections. If <code className="text-cyan-400">MONGODB_URI</code> is unset, the system seamlessly uses the persistent JSON storage engine (<code className="text-cyan-400">data/store.json</code>) ensuring zero runtime downtime.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white">How to Connect Real MongoDB Atlas:</h3>
                <ol className="text-xs text-slate-300 space-y-2.5 list-decimal pl-4 font-mono leading-relaxed">
                  <li>Create a free cluster on <span className="text-cyan-400">mongodb.com/atlas</span>.</li>
                  <li>Click &quot;Connect&quot; and copy your connection string URI.</li>
                  <li>Add to your <code className="text-cyan-300">.env</code>:
                    <div className="my-1.5 p-2 bg-slate-900 rounded border border-slate-800 text-[11px] text-cyan-200">
                      MONGODB_URI=&quot;mongodb+srv://admin:YourPassword@cluster0.mongodb.net/brainthenextdevs?retryWrites=true&amp;w=majority&quot;
                    </div>
                  </li>
                  <li>Restart the server. The database automatically initializes all Mongoose collections and seeds initial records.</li>
                </ol>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white">Local Windows / Mac / Linux Testing Commands:</h3>
                <div className="p-3 rounded-xl bg-black font-mono text-xs text-cyan-300 border border-slate-800 space-y-1">
                  <div># 1. Install dependencies</div>
                  <div className="text-white">npm install</div>
                  <div className="pt-2"># 2. Launch full-stack dev server</div>
                  <div className="text-white">npm run dev</div>
                  <div className="pt-2"># 3. Build for production</div>
                  <div className="text-white">npm run build</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 11: SUPABASE CLOUD & BOOKINGS */}
          {activeTab === 'supabase' && (
            <div className="max-w-3xl space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <span>Supabase Cloud Integration</span>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Connected to huzrvybpywrzelmhlvlh
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400">All customer booking appointments and project inquiries automatically sync to your Supabase project.</p>
                </div>

                <a
                  href={`https://supabase.com/dashboard/project/huzrvybpywrzelmhlvlh`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg text-xs font-mono text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 border border-cyan-800/60 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Open Supabase Dashboard</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Status & Connection Details */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-sm font-bold text-white">Live Connection Parameters</h3>
                  </div>
                  <button
                    onClick={handleTestSupabaseSync}
                    disabled={isTestingSupabase}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isTestingSupabase ? 'animate-spin' : ''}`} />
                    <span>{isTestingSupabase ? 'Verifying Sync...' : 'Test Sync to Supabase'}</span>
                  </button>
                </div>

                {supabaseTestMsg && (
                  <div className={`p-3 rounded-xl text-xs font-mono border ${
                    supabaseTestMsg.includes('Successfully')
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                      : 'bg-amber-950/40 border-amber-500/40 text-amber-300'
                  }`}>
                    {supabaseTestMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-slate-400 text-[10px] uppercase">Project ID</div>
                    <div className="text-cyan-300 font-bold mt-0.5">huzrvybpywrzelmhlvlh</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-slate-400 text-[10px] uppercase">API Endpoint</div>
                    <div className="text-white truncate mt-0.5">https://huzrvybpywrzelmhlvlh.supabase.co</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
                  <div className="text-slate-400 text-[10px] uppercase">API Key (Publishable / Anon)</div>
                  <div className="text-emerald-300 truncate mt-0.5">sb_publishable_GKzkYbXl8wAcBnxYtCJDTA_iXmGUqNt</div>
                </div>
              </div>

              {/* Table Setup Instruction & Copyable SQL */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">Supabase Table Schema Setup</h3>
                    <p className="text-xs text-slate-400">If you haven&apos;t run this yet, execute this SQL script in your Supabase SQL Editor to initialize the <code className="text-cyan-300 font-mono">public.bookings</code> table with RLS enabled.</p>
                  </div>
                  <button
                    onClick={handleCopySql}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedSql ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Edit2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Copy SQL</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="p-4 rounded-xl bg-black font-mono text-[11px] text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
{supabaseStatus?.sqlScript || `-- SQL for Supabase SQL Editor
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

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public booking submissions" ON public.bookings;
CREATE POLICY "Allow public booking submissions" ON public.bookings
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow read bookings" ON public.bookings;
CREATE POLICY "Allow read bookings" ON public.bookings
  FOR SELECT USING (true);`}
                </pre>

                <div className="text-xs text-slate-400">
                  Direct link: <a href="https://supabase.com/dashboard/project/huzrvybpywrzelmhlvlh/sql" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">Open Supabase SQL Editor</a>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
};
