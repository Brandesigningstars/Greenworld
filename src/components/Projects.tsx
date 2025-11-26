import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import ProjectCard from './ProjectCard';
import ProjectDetailsDialog from './ProjectDetailsDialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Project } from '../types/project';

interface ProjectsProps {
  onBookVisitClick: () => void;
  projects?: {
    featured: Project[];
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
    featured: [
      {
        title: 'Green World Paradise',
        location: 'GST Road, Chennai',
        image: 'https://images.unsplash.com/photo-1611095210561-67f0832b1ca3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTk3MDI3MzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
        type: 'Residential Plots',
        price: '₹25L - 50L',
        status: 'featured' as const,
        units: 'DTCP Approved',
        completion: 'Ready to Register',
        description: 'Premium residential plots located on GST Road, Chennai. This DTCP approved layout offers excellent connectivity and modern amenities for a comfortable living experience.',
        features: [
          '24/7 Security with CCTV surveillance',
          'Wide 40ft & 30ft Roads',
          'Underground Drainage System',
          'Street Lights',
          'Avenue Plantation',
          'Children\'s Play Area',
          'Parks and Green Spaces',
          'Water Supply Connection'
        ],
        amenities: ['Clubhouse', 'Swimming Pool', 'Gym', 'Park', 'Security', 'Power Backup'],
        dtcpNumber: 'DTCP/CH/2024/001',
        reraNumber: 'TN/RERA/2024/001',
      },
      {
        title: 'Green Melmaruvathur Layout',
        location: 'Near Melmaruvathur Temple',
        image: 'https://png.pngtree.com/thumb_back/fw800/background/20221017/pngtree-a-housing-society-in-india-structure-modern-house-photo-image_28472096.jpg',
        type: 'Villa Plots',
        price: '₹30L - 60L',
        status: 'featured' as const,
        units: 'DTCP & RERA',
        completion: 'Ready to Book',
        description: 'Spacious villa plots near the famous Melmaruvathur Temple. Perfect for those seeking a peaceful environment with spiritual significance and modern infrastructure.',
        features: [
          'DTCP & RERA Approved',
          'Premium Location',
          'Vastu Compliant Plots',
          'Excellent Appreciation Potential',
          'Near Educational Institutions',
          'Shopping Complexes Nearby',
          'Good Public Transport',
          'Clear Title Deeds'
        ],
        amenities: ['Temple View', 'Landscaped Gardens', 'Community Hall', 'Jogging Track'],
        dtcpNumber: 'DTCP/ML/2024/002',
        reraNumber: 'TN/RERA/2024/002',
      },
      {
        title: 'Green Valley Farmlands',
        location: 'Kanchipuram District',
        image: 'https://images.unsplash.com/photo-1753505889211-9cfbac527474?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwcGVudGhvdXNlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU5NzI4MjkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
        type: 'Agricultural Land',
        price: '₹15L - 35L',
        status: 'featured' as const,
        units: 'Clear Title',
        completion: 'Available Now',
        description: 'Agricultural farmlands in the scenic Kanchipuram district. Ideal for farming, weekend getaways, or long-term investment with clear titles and excellent accessibility.',
        features: [
          'Clear Legal Title',
          'Fertile Soil',
          'Water Source Available',
          'Road Access',
          'Electricity Connection',
          'Low Maintenance',
          'High Investment Returns',
          'Peaceful Environment'
        ],
        amenities: ['Water Supply', 'Electricity', 'Road Access', 'Fencing'],
        dtcpNumber: 'N/A - Agricultural Land',
      },
    ],
    ongoing: [
      {
        title: 'Green City Extension',
        location: 'Tambaram, Chennai',
        image: 'https://images.unsplash.com/photo-1654000749275-7b032f760975?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwY29uc3RydWN0aW9ufGVufDF8fHx8MTc1OTcyODI5MXww&ixlib=rb-4.1.0&q=80&w=1080',
        type: 'Residential Plots',
        price: '₹28L - 55L',
        status: 'ongoing' as const,
        units: 'DTCP Layout',
        completion: 'Jun 2026',
        description: 'An extension of our successful Green City project in Tambaram. Modern infrastructure and strategic location make this an ideal investment opportunity.',
        features: [
          'DTCP Approved Layout',
          'Metro Rail Connectivity',
          'Near IT Corridor',
          'Premium Infrastructure',
          'Gated Community',
          'Smart City Features',
          'Investment Opportunity',
          'Early Bird Discounts'
        ],
        amenities: ['Metro Access', 'Shopping Mall', 'Hospital Nearby', 'Schools'],
      },
      {
        title: 'Green Acres Township',
        location: 'Chengalpattu',
        image: 'https://images.unsplash.com/photo-1689574666650-de9cd6056e82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMHByb3BlcnR5JTIwZGV2ZWxvcG1lbnR8ZW58MXx8fHwxNzU5NzI4MjkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
        type: 'Plotted Development',
        price: '₹20L - 45L',
        status: 'ongoing' as const,
        units: '180 Plots',
        completion: 'Sep 2026',
        description: 'A comprehensive township project with 180 plots, offering modern living with all essential amenities in Chengalpattu.',
        features: [
          '180 Premium Plots',
          'Modern Township',
          'All Amenities',
          'Gated Security',
          'Quality Infrastructure',
          'Flexible Payment Plans',
          'Investment Grade Project',
          'Family-Friendly Environment'
        ],
        amenities: ['Clubhouse', 'Sports Complex', 'School', 'Shopping Center'],
      },
      {
        title: 'Green Heritage Plots',
        location: 'Mahabalipuram Road',
        image: 'https://images.unsplash.com/photo-1592898918831-cc7eea4ea57c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBjb21wbGV4fGVufDF8fHx8MTc1OTcyODI5MXww&ixlib=rb-4.1.0&q=80&w=1080',
        type: 'Beach Side Plots',
        price: '₹35L - 75L',
        status: 'ongoing' as const,
        units: 'Premium Location',
        completion: 'Dec 2026',
        description: 'Exclusive beach-side plots on the scenic Mahabalipuram Road. A premium investment opportunity with stunning views and modern infrastructure.',
        features: [
          'Beach Proximity',
          'Premium Location',
          'Tourism Hub',
          'High Appreciation',
          'Scenic Views',
          'IT Corridor Access',
          'Luxury Development',
          'World Heritage Site Nearby'
        ],
        amenities: ['Beach Access', 'Resort Facilities', 'Restaurant', 'Recreation'],
      },
    ],
    completed: [
      {
        title: 'Green Enclave Phase 1',
        location: 'Guduvanchery, Chennai',
        image: 'https://images.unsplash.com/photo-1638284457192-27d3d0ec51aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob21lJTIwbGl2aW5nJTIwcm9vbXxlbnwxfHx8fDE3NTk2ODg4MDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
        type: 'Residential Plots',
        price: 'Sold Out',
        status: 'completed' as const,
        units: '200 Plots',
        completion: 'Completed 2024',
        description: 'Successfully completed project with 200 residential plots. All plots sold out, showcasing the trust customers place in Green World Realtors.',
        features: [
          'Fully Developed',
          '100% Sold Out',
          'Happy Residents',
          'Complete Infrastructure',
          'Active Community',
          'All Amenities Functional',
          'Successful Project',
          'Reference Available'
        ],
        amenities: ['All Amenities', 'Maintained Gardens', 'Security', 'Community Center'],
      },
      {
        title: 'Green Garden Layout',
        location: 'Singaperumal Koil',
        image: 'https://png.pngtree.com/thumb_back/fw800/background/20221017/pngtree-a-housing-society-in-india-structure-modern-house-photo-image_28472096.jpg',
        type: 'DTCP Plots',
        price: 'Sold Out',
        status: 'completed' as const,
        units: '150 Plots',
        completion: 'Completed 2023',
        description: 'Another successful project completed in 2023. All 150 DTCP approved plots were sold, creating a thriving residential community.',
        features: [
          'DTCP Approved',
          'Completed 2023',
          '150 Happy Families',
          'Excellent Infrastructure',
          'Well Maintained',
          'Active Community',
          'Proven Track Record',
          'Site Visits Welcome'
        ],
        amenities: ['Parks', 'Street Lights', 'Roads', 'Drainage'],
      },
    ],
    upcoming: [
      {
        title: 'Green Paradise Estates',
        location: 'OMR, Chennai',
        image: 'https://images.unsplash.com/photo-1753505889211-9cfbac527474?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwcGVudGhvdXNlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU5NzI4MjkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
        type: 'Premium Plots',
        price: 'Pre-Launch Offer',
        status: 'upcoming' as const,
        units: 'DTCP Approval',
        completion: 'Launch: Q2 2026',
        description: 'Upcoming premium project on OMR with modern infrastructure and proximity to IT parks. Pre-launch bookings now open with special prices.',
        features: [
          'Pre-Launch Offers',
          'IT Corridor Location',
          'Premium Development',
          'Future Growth Hub',
          'Special Pricing',
          'Limited Units',
          'Early Bird Benefits',
          'Investment Opportunity'
        ],
        amenities: ['To be Announced', 'Premium Facilities', 'Modern Infrastructure'],
      },
      {
        title: 'Green Horizon Phase 2',
        location: 'Urapakkam',
        image: 'https://images.unsplash.com/photo-1611095210561-67f0832b1ca3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTk3MDI3MzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
        type: 'Residential Layout',
        price: 'Early Bird Pricing',
        status: 'upcoming' as const,
        units: '220 Plots',
        completion: 'Launch: Q3 2026',
        description: 'Phase 2 of our successful Green Horizon project. 220 plots with modern amenities and excellent connectivity. Early bird pricing available.',
        features: [
          '220 Residential Plots',
          'Proven Developer',
          'Phase 2 Expansion',
          'Early Bird Discounts',
          'Modern Amenities',
          'Strategic Location',
          'Quick Approvals',
          'Flexible Payment'
        ],
        amenities: ['Clubhouse', 'Parks', 'Sports Facilities', 'Shopping Complex'],
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

        <Tabs defaultValue="featured">
          <TabsList className="flex justify-between w-full mb-12 bg-white border border-green-300 p-1 rounded-lg shadow-sm">
  <TabsTrigger
    value="featured"
    className="flex-1 text-center data-[state=active]:bg-green-600 data-[state=active]:text-white text-green-700 hover:bg-green-100 py-3 rounded-md font-semibold transition-all duration-300"
  >
    Featured
  </TabsTrigger>
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


            <TabsContent value="featured">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activeProjects.featured.map((project, index) => (
                  <ProjectCard 
                    key={index} 
                    {...project} 
                    onBookVisit={onBookVisitClick} 
                    onViewDetails={() => handleViewDetails(project)}
                  />
                ))}
              </div>
            </TabsContent>

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
