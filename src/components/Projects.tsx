import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import ProjectCard from './ProjectCard';
import ProjectDetailsDialog from './ProjectDetailsDialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Project } from '../types/project';

interface ProjectsProps {
  onBookVisitClick: () => void;
  projects?: {
    ongoing: Project[];
    completed: Project[];
    upcoming: Project[];
  };
}

export default function Projects({ onBookVisitClick, projects: externalProjects }: ProjectsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Default projects data (can be overridden by props for admin management)
  const defaultProjects = {
    completed: [
      {
        title: 'SUBRAMANI NAGAR',
        location: 'GUDUVANCHERY',
        image: 'project/cp1.jpg',
        type: 'Residential Plots',
        price: 'Sold Out',
        status: 'completed' as const,
        year: 2002,
        dtcpApproved: true,
      },
      {
        title: 'SARUVAMANGALAM',
        location: 'GUDUVANCHERY',
        image: 'project/cp2.jpg',
        type: 'Residential Plots',
        price: 'Sold Out',
        status: 'completed' as const,
        year: 2004,
        dtcpApproved: true,
      },
      {
        title: 'SARUVAMANGALAM EXTN',
        location: 'GUDUVANCHERY',
        image: 'project/cp3.jpg',
        type: 'Residential Plots',
        price: 'Sold Out',
        status: 'completed' as const,
        year: 2005,
        dtcpApproved: true,
      },
      {
        title: 'SUBRAMANI NAGAR PHASE 1',
        location: 'KUNDRATHUR',
        image: '',
        type: 'Residential Plots',
        price: 'Sold Out',
        status: 'completed' as const,
        year: 2006,
        dtcpApproved: true,
      },
      {
        title: 'SUBRAMANI NAGAR PHASE 2',
        location: 'KUNDRATHUR',
        image: '',
        type: 'Residential Plots',
        price: 'Sold Out',
        status: 'completed' as const,
        year: 2007,
        dtcpApproved: true,
      },
      {
        title: 'SUBRAMANI NAGAR',
        location: 'OLD PALLAVARAM',
        image: '',
        type: 'Residential Plots',
        price: 'Sold Out',
        status: 'completed' as const,
        year: 2007,
        dtcpApproved: true,
      },
      {
        title: 'SUBRAMANI NAGAR PHASE 2',
        location: 'OLD PALLAVARAM',
        image: '',
        type: 'Residential Plots',
        price: 'Sold Out',
        status: 'completed' as const,
        year: 2008,
        dtcpApproved: true,
      },
      {
        title: 'SHANMUGHA NAGAR',
        location: 'POZHICHALUR',
        image: '',
        type: 'Residential Plots',
        price: 'Sold Out',
        status: 'completed' as const,
        year: 2009,
        dtcpApproved: true,
      },
      {
        title: 'SHANMUGHA NAGAR EXTN',
        location: 'POZHICHALUR',
        image: '',
        type: 'Residential Plots',
        price: 'Sold Out',
        status: 'completed' as const,
        year: 2009,
        dtcpApproved: true,
      },
      {
        title: 'BHAVANI NAGAR',
        location: 'POZHICHALUR',
        image: '',
        type: 'Residential Plots',
        price: 'Sold Out',
        status: 'completed' as const,
        year: 2005,
        dtcpApproved: true,
      },
      {
        title: 'BHAVANI NAGAR EXTN',
        location: 'POZHICHALUR',
        image: '',
        type: 'Residential Plots',
        price: 'Sold Out',
        status: 'completed' as const,
        year: 2006,
        dtcpApproved: true,
      },
      {
        title: 'MOOVAR NAGAR',
        location: 'POZHICHALUR',
        image: '',
        type: 'Residential Plots',
        price: 'Sold Out',
        status: 'completed' as const,
        year: 2000,
        dtcpApproved: true,
      },
      {
        title: 'MOOVAR NAGAR EXTN',
        location: 'POZHICHALUR',
        image: '',
        type: 'Residential Plots',
        price: 'Sold Out',
        status: 'completed' as const,
        year: 2001,
        dtcpApproved: true,
      },
      {
        title: 'ARJUN NAGAR',
        location: 'THIRUMBHAKADU',
        image: '',
        type: 'Residential Plots',
        price: 'Sold Out',
        status: 'completed' as const,
        year: 2006,
        dtcpApproved: true,
      },
      {
        title: 'ARJUN NAGAR',
        location: 'ARAPEDU',
        image: '',
        type: 'Residential Plots',
        price: 'Sold Out',
        status: 'completed' as const,
        year: 2010,
        dtcpApproved: true,
      },
      {
        title: 'MINNAL NAGAR',
        location: 'MINNAL VILLAGE',
        image: '',
        type: 'Residential Plots',
        price: 'Sold Out',
        status: 'completed' as const,
        year: 2011,
        dtcpApproved: true,
      },
      {
        title: 'T.G.NAGAR',
        location: 'IRUMBLIYUR GRAMMAM',
        image: '',
        type: 'Residential Plots',
        price: 'Sold Out',
        status: 'completed' as const,
        year: 2012,
        dtcpApproved: true,
      },
    ],
    ongoing: [
      {
        title: 'ARJUN NAGAR',
        location: 'ARAPEDU, ACHARAPAKKAM',
        image: 'project/op1.jpg',
        type: 'Residential Plots',
        price: 'Available',
        status: 'ongoing' as const,
        dtcpApproved: true,
      },
      {
        title: 'JAYALAKSHMI GARDEN',
        location: 'AYAKUNAM VILLAGE, ACHARAPAKKAM',
        image: 'project/op2.jpg',
        type: 'Residential Plots',
        price: 'Available',
        status: 'ongoing' as const,
        dtcpApproved: true,
      },
      {
        title: 'ARJUN NAGAR',
        location: 'AYAKUNAM VILLAGE, ACHARAPAKKAM',
        image: 'project/op3.jpg',
        type: 'Residential Plots',
        price: 'Available',
        status: 'ongoing' as const,
        dtcpApproved: true,
      },
      {
        title: 'BHARAHI NAGAR HIGHWAY CITY',
        location: 'THENPAKKAM VILLAGE, ACHARAPAKKAM',
        image: 'project/op4.jpg',
        type: 'Residential Plots',
        price: 'Available',
        status: 'ongoing' as const,
        dtcpApproved: true,
      },
    ],
    upcoming: [
      {
        title: 'KUNDRATHUR',
        location: 'KUNDRATHUR',
        image: '',
        type: 'Residential Plots',
        price: 'Pre-Launch',
        status: 'upcoming' as const,
        area: '3.5 ACRES',
        dtcpApproved: true,
      },
      {
        title: 'ACHRAPAKKAM',
        location: 'ACHRAPAKKAM',
        image: '',
        type: 'Residential Plots',
        price: 'Pre-Launch',
        status: 'upcoming' as const,
        area: '5 ACRES',
        dtcpApproved: true,
      },
      {
        title: 'CHENGALPATTU',
        location: 'CHENGALPATTU',
        image: '',
        type: 'Residential Plots',
        price: 'Pre-Launch',
        status: 'upcoming' as const,
        area: '10 ACRES',
        dtcpApproved: true,
      },
      {
        title: 'GUDUVANCHERY',
        location: 'GUDUVANCHERY',
        image: '',
        type: 'Residential Plots',
        price: 'Pre-Launch',
        status: 'upcoming' as const,
        area: '3 ACRES',
        dtcpApproved: true,
      },
      {
        title: 'S.P.KOIL',
        location: 'S.P.KOIL',
        image: '',
        type: 'Residential Plots',
        price: 'Pre-Launch',
        status: 'upcoming' as const,
        area: '4 ACRES',
        dtcpApproved: true,
      },
    ],
  };

  const activeProjects = externalProjects || defaultProjects;

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setIsDetailsOpen(true);
  };

  return (
   <section
  id="projects"
  ref={sectionRef}
  style={{ backgroundColor: "#073e04ff" }}
  className="py-20"
>
  <div className="container mx-auto px-4 lg:px-8">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >


          <h2 className="text-4xl md:text-5xl mb-4 text-white">Our Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-green-400 mx-auto mb-6"></div>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Discover our range of premium residential projects designed for modern living
          </p>
        </motion.div>

        <Tabs defaultValue="ongoing">
          <TabsList className="flex justify-between w-full mb-12 bg-white border border-green-300 p-1 rounded-lg shadow-sm">
  <TabsTrigger
    value="ongoing"
    className="flex-1 text-center data-[state=active]:bg-green-600 data-[state=active]:text-white text-green-700 hover:bg-green-100 py-3 rounded-md font-semibold transition-all duration-300"
  >
    Ongoing
  </TabsTrigger>
  <TabsTrigger
    value="completed"
    className="flex-1 text-center data-[state=active]:bg-green-600 data-[state=active]:text-white text-green-700 hover:bg-green-100 py-3 rounded-md font-semibold transition-all duration-300"
  >
    Completed
  </TabsTrigger>
  <TabsTrigger
    value="upcoming"
    className="flex-1 text-center data-[state=active]:bg-green-600 data-[state=active]:text-white text-green-700 hover:bg-green-100 py-3 rounded-md font-semibold transition-all duration-300"
  >
    Upcoming
  </TabsTrigger>
</TabsList>

            <TabsContent value="ongoing">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activeProjects.ongoing.map((project, index) => (
                  <ProjectCard 
                    key={index} 
                    {...project} 
                    onBookVisit={onBookVisitClick} 
                    onViewDetails={() => handleViewDetails(project)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="completed">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activeProjects.completed.map((project, index) => (
                  <ProjectCard 
                    key={index} 
                    {...project} 
                    onBookVisit={onBookVisitClick} 
                    onViewDetails={() => handleViewDetails(project)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="upcoming">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activeProjects.upcoming.map((project, index) => (
                  <ProjectCard 
                    key={index} 
                    {...project} 
                    onBookVisit={onBookVisitClick} 
                    onViewDetails={() => handleViewDetails(project)}
                  />
                ))}
              </div>
            </TabsContent>
        </Tabs>
      </div>

      <ProjectDetailsDialog
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        project={selectedProject}
        onBookVisit={onBookVisitClick}
      />
    </section>
  );
}
