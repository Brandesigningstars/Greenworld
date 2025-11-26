import { useState } from 'react';
import { Toaster } from './components/ui/sonner';
import { AdminProvider, useAdmin } from './contexts/AdminContext';
import { VisitorProvider } from './contexts/VisitorContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import MissionVision from './components/MissionVision';
import Projects from './components/Projects';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import OurClients from './components/OurClients';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BookVisitDialog from './components/BookVisitDialog';
import WhatsAppFloat from './components/WhatsAppFloat';
import AdminDashboard from './components/AdminDashboard';
import { Project } from './types/project';
import { Client } from './types/client';
import AdminLoginPage from './components/AdminLoginPage';

function AppContent() {
  const [isBookVisitOpen, setIsBookVisitOpen] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [projects, setProjects] = useState<{
    featured: Project[];
    ongoing: Project[];
    completed: Project[];
    upcoming: Project[];
  } | undefined>(undefined);
  const [clients, setClients] = useState<Client[] | undefined>(undefined);
  
  const { isAdminLoggedIn } = useAdmin();

  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

  const handleAdminClick = () => {
    if (isAdminLoggedIn) {
      setShowDashboard(true);
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdminLoginOpen(false);
    setShowDashboard(true);
  };

  if (showDashboard) {
    return (
      <>
        <AdminDashboard 
          onClose={() => setShowDashboard(false)} 
          projects={projects || {
            featured: [],
            ongoing: [],
            completed: [],
            upcoming: []
          }}
          onProjectsUpdate={setProjects}
          clients={clients}
          onClientsUpdate={setClients}
        />
        <Toaster position="top-center" richColors />
      </>
    );
  }

  return (
    <div className="min-h-screen">
      <Header 
        onBookVisitClick={() => setIsBookVisitOpen(true)} 
        onAdminClick={handleAdminClick}
      />
      <Hero onBookVisitClick={() => setIsBookVisitOpen(true)} />
      <Stats />
      <About />
      <MissionVision />
      <Projects 
        onBookVisitClick={() => setIsBookVisitOpen(true)} 
        projects={projects}
      />
      <Gallery />
      <OurClients clients={clients} />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      <BookVisitDialog open={isBookVisitOpen} onOpenChange={setIsBookVisitOpen} />
      <WhatsAppFloat />
      <AdminLoginPage open={isAdminLoginOpen} onOpenChange={setIsAdminLoginOpen} onLoginSuccess={handleLoginSuccess} />
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <VisitorProvider>
        <AppContent />
      </VisitorProvider>
    </AdminProvider>
  );
}
