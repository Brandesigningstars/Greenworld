import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useAdmin } from '../contexts/AdminContext';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { 
  Users, 
  Eye, 
  TrendingUp, 
  LogOut, 
  Plus, 
  Trash2,
  BarChart3,
  Home,
  Edit,
  Image as ImageIcon,
  Building2,
  UserCircle
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { toast } from 'sonner';
import { Project } from '../types/project';
import { Client } from '../types/client';

interface AdminDashboardProps {
  onClose: () => void;
  projects: {
    featured: Project[];
    ongoing: Project[];
    completed: Project[];
    upcoming: Project[];
  };
  onProjectsUpdate: (projects: {
    featured: Project[];
    ongoing: Project[];
    completed: Project[];
    upcoming: Project[];
  }) => void;
  clients?: Client[];
  onClientsUpdate?: (clients: Client[]) => void;
}

export default function AdminDashboard({ onClose, projects, onProjectsUpdate, clients: externalClients, onClientsUpdate }: AdminDashboardProps) {
  const { logout, adminData } = useAdmin();
  const [visitorStats, setVisitorStats] = useState<any>(null);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [isEditProjectOpen, setIsEditProjectOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<{project: Project, category: keyof typeof projects, index: number} | null>(null);
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  
  const defaultClients: Client[] = [
    { id: '1', name: 'DTCP Tamil Nadu', logo: 'https://images.unsplash.com/photo-1693801873650-b1091c25abbf?w=200', category: 'Government' },
    { id: '2', name: 'RERA Certified', logo: 'https://images.unsplash.com/photo-1759174712773-bd301ffa2993?w=200', category: 'Certification' },
    { id: '3', name: 'ISO Certified', logo: 'https://images.unsplash.com/photo-1745847768380-2caeadbb3b71?w=200', category: 'Certification' },
    { id: '4', name: 'Banking Partners', logo: 'https://images.unsplash.com/photo-1683770997177-0603bd44d070?w=200', category: 'Finance' },
  ];
  
  const [clients, setClients] = useState<Client[]>(externalClients || defaultClients);

  useEffect(() => {
    loadVisitorStats();
  }, []);

  const loadVisitorStats = () => {
    // TODO: Replace with MongoDB API call
    // Example: const response = await fetch('/api/visitors/stats');
    
    // Mock data for demo
    const visitors = JSON.parse(localStorage.getItem('visitorData') || '[]');
    const totalVisitors = visitors.length;
    
    const totalProjects = Object.values(projects).reduce((sum, arr) => sum + arr.length, 0);
    
    // Generate visitor chart data (last 7 days)
    const chartData = generateVisitorChartData();
    
    setVisitorStats({
      total: totalVisitors + 3456, // Add base number for demo
      totalProjects: totalProjects,
      totalClients: clients.length,
      growth: '+12.5%',
      chartData: chartData
    });
  };

  const generateVisitorChartData = () => {
    // Generate mock data for the last 7 days
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const today = new Date().getDay();
    
    return days.map((day, index) => ({
      day: day,
      visitors: Math.floor(Math.random() * 150) + 80, // Random visitors between 80-230
      pageViews: Math.floor(Math.random() * 400) + 200, // Random page views
      bookings: Math.floor(Math.random() * 15) + 5, // Random bookings
    }));
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    onClose();
  };

  const handleDeleteProject = (category: keyof typeof projects, index: number) => {
    const updatedProjects = { ...projects };
    const projectTitle = updatedProjects[category][index].title;
    updatedProjects[category].splice(index, 1);
    onProjectsUpdate(updatedProjects);
    
    // TODO: Delete from MongoDB
    // await fetch('/api/projects/' + projectId, { method: 'DELETE' });
    
    toast.success(`Deleted "${projectTitle}" successfully`);
    loadVisitorStats();
  };

  const handleEditProject = (category: keyof typeof projects, index: number) => {
    setEditingProject({
      project: projects[category][index],
      category,
      index
    });
    setIsEditProjectOpen(true);
  };

  const handleUpdateProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingProject) return;

    const formData = new FormData(e.currentTarget);
    
    const updatedProject: Project = {
      title: formData.get('title') as string,
      location: formData.get('location') as string,
      image: (formData.get('image') as File).size > 0 
        ? URL.createObjectURL(formData.get('image') as File) 
        : editingProject.project.image,
      type: formData.get('type') as string,
      price: formData.get('price') as string,
      status: formData.get('status') as any,
      units: formData.get('units') as string,
      completion: formData.get('completion') as string,
      description: formData.get('description') as string,
      features: (formData.get('features') as string).split('\n').filter(f => f.trim()),
      amenities: (formData.get('amenities') as string).split('\n').filter(a => a.trim()),
      dtcpNumber: formData.get('dtcpNumber') as string,
      reraNumber: formData.get('reraNumber') as string,
    };

    const updatedProjects = { ...projects };
    const newCategory = updatedProject.status;
    const oldCategory = editingProject.category;

    // Remove from old category
    updatedProjects[oldCategory].splice(editingProject.index, 1);
    
    // Add to new category
    updatedProjects[newCategory].push(updatedProject);
    
    onProjectsUpdate(updatedProjects);
    
    // TODO: Update in MongoDB
    // await fetch('/api/projects/' + projectId, { method: 'PUT', body: JSON.stringify(updatedProject) });
    
    toast.success(`Updated "${updatedProject.title}" successfully`);
    setIsEditProjectOpen(false);
    setEditingProject(null);
  };

  const handleAddProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newProject: Project = {
      title: formData.get('title') as string,
      location: formData.get('location') as string,
      image: formData.get('image')
        ? URL.createObjectURL(formData.get('image') as File)
        : '',
      type: formData.get('type') as string,
      price: formData.get('price') as string,
      status: formData.get('status') as any,
      units: formData.get('units') as string,
      completion: formData.get('completion') as string,
      description: formData.get('description') as string,
      features: (formData.get('features') as string).split('\n').filter(f => f.trim()),
      amenities: (formData.get('amenities') as string).split('\n').filter(a => a.trim()),
      dtcpNumber: formData.get('dtcpNumber') as string,
      reraNumber: formData.get('reraNumber') as string,
    };

    const category = newProject.status;
    const updatedProjects = { ...projects };
    updatedProjects[category].push(newProject);
    onProjectsUpdate(updatedProjects);
    
    // TODO: Save to MongoDB
    // await fetch('/api/projects', { method: 'POST', body: JSON.stringify(newProject) });
    
    toast.success(`Added "${newProject.title}" successfully`);
    setIsAddProjectOpen(false);
    e.currentTarget.reset();
    loadVisitorStats();
  };

  const handleAddClient = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newClient: Client = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      logo: formData.get('logo')
        ? URL.createObjectURL(formData.get('logo') as File)
        : '',
      category: formData.get('category') as string,
    };

    const updatedClients = [...clients, newClient];
    setClients(updatedClients);
    
    if (onClientsUpdate) {
      onClientsUpdate(updatedClients);
    }
    
    // TODO: Save to MongoDB
    // await fetch('/api/clients', { method: 'POST', body: JSON.stringify(newClient) });
    
    toast.success(`Added "${newClient.name}" successfully`);
    setIsAddClientOpen(false);
    e.currentTarget.reset();
    loadVisitorStats();
  };

  const handleDeleteClient = (id: string) => {
    const client = clients.find(c => c.id === id);
    const updatedClients = clients.filter(c => c.id !== id);
    setClients(updatedClients);
    
    if (onClientsUpdate) {
      onClientsUpdate(updatedClients);
    }
    
    // TODO: Delete from MongoDB
    // await fetch('/api/clients/' + id, { method: 'DELETE' });
    
    toast.success(`Deleted "${client?.name}" successfully`);
    loadVisitorStats();
  };

  const totalProjects = Object.values(projects).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl text-green-800">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, {adminData?.username}</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="border-gray-300"
            >
              <Home size={18} className="mr-2" />
              Back to Site
            </Button>
            <Button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="bg-white p-1 shadow-sm">
            <TabsTrigger value="analytics" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <BarChart3 size={18} className="mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <Home size={18} className="mr-2" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="clients" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <UserCircle size={18} className="mr-2" />
              Clients
            </TabsTrigger>
          </TabsList>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            {/* Animated Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="border-l-4 border-l-green-600 hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm">Total Visitors</CardTitle>
                    <Users className="h-5 w-5 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                      className="text-3xl"
                    >
                      {visitorStats?.total.toLocaleString() || '0'}
                    </motion.div>
                    <p className="text-xs text-gray-600 mt-1">All time visits</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="border-l-4 border-l-blue-600 hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm">Active Projects</CardTitle>
                    <Building2 className="h-5 w-5 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4, type: "spring" }}
                      className="text-3xl"
                    >
                      {totalProjects}
                    </motion.div>
                    <p className="text-xs text-gray-600 mt-1">Total projects</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="border-l-4 border-l-purple-600 hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm">Client Count</CardTitle>
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                  </CardHeader>
                  <CardContent>
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      className="text-3xl"
                    >
                      {clients.length}
                    </motion.div>
                    <p className="text-xs text-gray-600 mt-1">Total clients & partners</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Analytics Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Visitor Analytics
                  </CardTitle>
                  <CardDescription>Website traffic and engagement over the last 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={visitorStats?.chartData || []}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                          </linearGradient>
                          <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                          </linearGradient>
                          <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#a855f7" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis 
                          dataKey="day" 
                          stroke="#6b7280"
                          style={{ fontSize: '14px' }}
                        />
                        <YAxis 
                          stroke="#6b7280"
                          style={{ fontSize: '14px' }}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                          }}
                        />
                        <Legend 
                          wrapperStyle={{
                            paddingTop: '20px'
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="visitors"
                          stroke="#10b981"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#colorVisitors)"
                          name="Visitors"
                        />
                        <Area
                          type="monotone"
                          dataKey="pageViews"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#colorPageViews)"
                          name="Page Views"
                        />
                        <Area
                          type="monotone"
                          dataKey="bookings"
                          stroke="#a855f7"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#colorBookings)"
                          name="Bookings"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <p className="text-sm text-gray-600">Avg. Visitors/Day</p>
                      </div>
                      <p className="text-2xl text-gray-800">
                        {visitorStats?.chartData 
                          ? Math.round(visitorStats.chartData.reduce((sum: number, d: any) => sum + d.visitors, 0) / 7)
                          : 0}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <p className="text-sm text-gray-600">Avg. Page Views/Day</p>
                      </div>
                      <p className="text-2xl text-gray-800">
                        {visitorStats?.chartData 
                          ? Math.round(visitorStats.chartData.reduce((sum: number, d: any) => sum + d.pageViews, 0) / 7)
                          : 0}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <div className="w-3 h-3 rounded-full bg-purple-500" />
                        <p className="text-sm text-gray-600">Avg. Bookings/Day</p>
                      </div>
                      <p className="text-2xl text-gray-800">
                        {visitorStats?.chartData 
                          ? Math.round(visitorStats.chartData.reduce((sum: number, d: any) => sum + d.bookings, 0) / 7)
                          : 0}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* MongoDB Integration Notice */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">MongoDB Integration Ready</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-blue-700">
                <p className="mb-2">This dashboard is prepared for MongoDB backend integration. Data structures are ready for:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Visitor tracking and analytics storage</li>
                  <li>Real-time visitor statistics</li>
                  <li>User session management</li>
                  <li>Historical data analysis</li>
                  <li>Project and client management</li>
                </ul>
                <p className="mt-3 text-xs">
                  <strong>API Endpoints to implement:</strong> /api/visitors/track, /api/visitors/stats, /api/projects, /api/clients
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl text-gray-800">Manage Projects</h2>
              <Dialog open={isAddProjectOpen} onOpenChange={setIsAddProjectOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white">
                    <Plus size={18} className="mr-2" />
                    Add New Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Project</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddProject} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title">Project Title*</Label>
                        <Input id="title" name="title" required />
                      </div>
                      <div>
                        <Label htmlFor="location">Location*</Label>
                        <Input id="location" name="location" required />
                      </div>
                      <div>
                        <Label htmlFor="type">Type*</Label>
                        <Input id="type" name="type" placeholder="e.g., Residential Plots" required />
                      </div>
                      <div>
                        <Label htmlFor="price">Price*</Label>
                        <Input id="price" name="price" placeholder="e.g., ₹25L - 50L" required />
                      </div>
                      <div>
                        <Label htmlFor="status">Category*</Label>
                        <Select name="status" required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="featured">Featured</SelectItem>
                            <SelectItem value="ongoing">Ongoing</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="upcoming">Upcoming</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="units">Units</Label>
                        <Input id="units" name="units" placeholder="e.g., 200 Plots" />
                      </div>
                      <div>
                        <Label htmlFor="completion">Completion</Label>
                        <Input id="completion" name="completion" placeholder="e.g., Dec 2026" />
                      </div>
                      <div>
                        <Label htmlFor="image">Project Image*</Label>
                        <Input id="image" name="image" type="file" accept="image/*" required />
                      </div>
                      <div>
                        <Label htmlFor="dtcpNumber">DTCP Number</Label>
                        <Input id="dtcpNumber" name="dtcpNumber" />
                      </div>
                      <div>
                        <Label htmlFor="reraNumber">RERA Number</Label>
                        <Input id="reraNumber" name="reraNumber" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" name="description" rows={3} />
                    </div>
                    <div>
                      <Label htmlFor="features">Features (one per line)</Label>
                      <Textarea id="features" name="features" rows={4} />
                    </div>
                    <div>
                      <Label htmlFor="amenities">Amenities (one per line)</Label>
                      <Textarea id="amenities" name="amenities" rows={4} />
                    </div>
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                      Add Project
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Edit Project Dialog */}
            <Dialog open={isEditProjectOpen} onOpenChange={setIsEditProjectOpen}>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit Project</DialogTitle>
                </DialogHeader>
                {editingProject && (
                  <form onSubmit={handleUpdateProject} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="edit-title">Project Title*</Label>
                        <Input id="edit-title" name="title" defaultValue={editingProject.project.title} required />
                      </div>
                      <div>
                        <Label htmlFor="edit-location">Location*</Label>
                        <Input id="edit-location" name="location" defaultValue={editingProject.project.location} required />
                      </div>
                      <div>
                        <Label htmlFor="edit-type">Type*</Label>
                        <Input id="edit-type" name="type" defaultValue={editingProject.project.type} required />
                      </div>
                      <div>
                        <Label htmlFor="edit-price">Price*</Label>
                        <Input id="edit-price" name="price" defaultValue={editingProject.project.price} required />
                      </div>
                      <div>
                        <Label htmlFor="edit-status">Category*</Label>
                        <Select name="status" defaultValue={editingProject.project.status} required>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="featured">Featured</SelectItem>
                            <SelectItem value="ongoing">Ongoing</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="upcoming">Upcoming</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="edit-units">Units</Label>
                        <Input id="edit-units" name="units" defaultValue={editingProject.project.units} />
                      </div>
                      <div>
                        <Label htmlFor="edit-completion">Completion</Label>
                        <Input id="edit-completion" name="completion" defaultValue={editingProject.project.completion} />
                      </div>
                      <div>
                        <Label htmlFor="edit-image">New Project Image</Label>
                        <Input id="edit-image" name="image" type="file" accept="image/*" />
                      </div>
                      <div>
                        <Label htmlFor="edit-dtcpNumber">DTCP Number</Label>
                        <Input id="edit-dtcpNumber" name="dtcpNumber" defaultValue={editingProject.project.dtcpNumber} />
                      </div>
                      <div>
                        <Label htmlFor="edit-reraNumber">RERA Number</Label>
                        <Input id="edit-reraNumber" name="reraNumber" defaultValue={editingProject.project.reraNumber} />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="edit-description">Description</Label>
                      <Textarea id="edit-description" name="description" defaultValue={editingProject.project.description} rows={3} />
                    </div>
                    <div>
                      <Label htmlFor="edit-features">Features (one per line)</Label>
                      <Textarea id="edit-features" name="features" defaultValue={editingProject.project.features?.join('\n')} rows={4} />
                    </div>
                    <div>
                      <Label htmlFor="edit-amenities">Amenities (one per line)</Label>
                      <Textarea id="edit-amenities" name="amenities" defaultValue={editingProject.project.amenities?.join('\n')} rows={4} />
                    </div>
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                      Update Project
                    </Button>
                  </form>
                )}
              </DialogContent>
            </Dialog>

            {/* Project Lists */}
            <Tabs defaultValue="featured" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4 bg-white">
                <TabsTrigger value="featured">Featured ({projects.featured.length})</TabsTrigger>
                <TabsTrigger value="ongoing">Ongoing ({projects.ongoing.length})</TabsTrigger>
                <TabsTrigger value="completed">Completed ({projects.completed.length})</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming ({projects.upcoming.length})</TabsTrigger>
              </TabsList>

              {(['featured', 'ongoing', 'completed', 'upcoming'] as const).map((category) => (
                <TabsContent key={category} value={category}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="capitalize">{category} Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {projects[category].length === 0 ? (
                          <p className="text-gray-500 text-center py-8">No projects in this category</p>
                        ) : (
                          projects[category].map((project, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                              <div className="flex items-center gap-4 flex-1">
                                <img
                                  src={project.image}
                                  alt={project.title}
                                  className="w-16 h-16 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                  <h4 className="text-gray-800">{project.title}</h4>
                                  <p className="text-sm text-gray-600">{project.location}</p>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  onClick={() => handleEditProject(category, index)}
                                  variant="outline"
                                  size="sm"
                                  className="border-green-600 text-green-700 hover:bg-green-50"
                                >
                                  <Edit size={16} />
                                </Button>
                                <Button
                                  onClick={() => handleDeleteProject(category, index)}
                                  variant="destructive"
                                  size="sm"
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </div>
                            </motion.div>
                          ))
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>

            {/* MongoDB Integration Notice */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">MongoDB Integration Ready</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-blue-700">
                <p className="mb-2">Project management is ready for MongoDB integration with:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Complete CRUD operations for projects</li>
                  <li>Image upload and storage</li>
                  <li>Category-based filtering</li>
                  <li>Project approval workflow</li>
                </ul>
                <p className="mt-3 text-xs">
                  <strong>API Endpoints to implement:</strong> /api/projects (GET, POST, PUT, DELETE)
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Clients Tab */}
          <TabsContent value="clients" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl text-gray-800">Manage Clients & Partners</h2>
              <Dialog open={isAddClientOpen} onOpenChange={setIsAddClientOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white">
                    <Plus size={18} className="mr-2" />
                    Add New Client
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Client / Partner</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddClient} className="space-y-4">
                    <div>
                      <Label htmlFor="client-name">Client Name*</Label>
                      <Input id="client-name" name="name" required placeholder="e.g., State Bank of India" />
                    </div>
                    <div>
                      <Label htmlFor="client-logo">Client Logo*</Label>
                      <Input id="client-logo" name="logo" type="file" accept="image/*" required />
                    </div>
                    <div>
                      <Label htmlFor="client-category">Category</Label>
                      <Input id="client-category" name="category" placeholder="e.g., Banking, Certification" />
                    </div>
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                      Add Client
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Clients & Partners ({clients.length})</CardTitle>
                <CardDescription>Manage your certifications and banking partners</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {clients.map((client) => (
                    <motion.div
                      key={client.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-white flex items-center justify-center border border-gray-200">
                          <img
                            src={client.logo}
                            alt={client.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-gray-800">{client.name}</h4>
                          {client.category && (
                            <p className="text-xs text-gray-500">{client.category}</p>
                          )}
                        </div>
                      </div>
                      <Button
                        onClick={() => handleDeleteClient(client.id!)}
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* MongoDB Integration Notice */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">MongoDB Integration Ready</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-blue-700">
                <p className="mb-2">Client management is ready for MongoDB integration with:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Complete CRUD operations for clients</li>
                  <li>Logo image storage</li>
                  <li>Category-based organization</li>
                  <li>Display order management</li>
                </ul>
                <p className="mt-3 text-xs">
                  <strong>API Endpoints to implement:</strong> /api/clients (GET, POST, DELETE)
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}