import { motion } from 'motion/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MapPin, Home, IndianRupee, Calendar, CheckCircle, Phone, MessageCircle } from 'lucide-react';
import { Project } from '../types/project';

interface ProjectDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project | null;
  onBookVisit: () => void;
}

export default function ProjectDetailsDialog({ 
  open, 
  onOpenChange, 
  project,
  onBookVisit 
}: ProjectDetailsDialogProps) {
  if (!project) return null;

  const statusColors = {
    featured: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    ongoing: 'bg-gradient-to-r from-blue-500 to-blue-600',
    completed: 'bg-gradient-to-r from-green-500 to-green-600',
    upcoming: 'bg-gradient-to-r from-purple-500 to-purple-600',
  };

  const statusLabels = {
    featured: 'Featured',
    ongoing: 'Ongoing',
    completed: 'Completed',
    upcoming: 'Upcoming',
  };

  const handleWhatsApp = () => {
    const message = `Hi, I'm interested in ${project.title} located at ${project.location}. Please provide more details.`;
    const phoneNumber = '919600077816';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:+919600077816';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl text-green-800">{project.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Main Image */}
          <div className="relative overflow-hidden rounded-xl h-80">
            <ImageWithFallback
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <Badge className={`${statusColors[project.status]} text-white border-0 px-4 py-2 text-sm`}>
                {statusLabels[project.status]}
              </Badge>
            </div>
          </div>

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div>
              <h3 className="text-xl mb-3 text-gray-800">Gallery</h3>
              <div className="grid grid-cols-3 gap-3">
                {project.gallery.map((img, idx) => (
                  <div key={idx} className="relative overflow-hidden rounded-lg h-32">
                    <ImageWithFallback
                      src={img}
                      alt={`${project.title} ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Details */}
          <div className="grid md:grid-cols-2 gap-4 p-4 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <MapPin className="text-green-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="text-gray-800">{project.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Home className="text-green-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Type</p>
                <p className="text-gray-800">{project.type}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <IndianRupee className="text-green-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Price</p>
                <p className="text-gray-800">{project.price}</p>
              </div>
            </div>
            {project.completion && (
              <div className="flex items-center gap-3">
                <Calendar className="text-green-600" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Completion</p>
                  <p className="text-gray-800">{project.completion}</p>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          {project.description && (
            <div>
              <h3 className="text-xl mb-3 text-gray-800">About This Project</h3>
              <p className="text-gray-600 leading-relaxed">{project.description}</p>
            </div>
          )}

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <div>
              <h3 className="text-xl mb-3 text-gray-800">Key Features</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {project.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-2"
                  >
                    <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={18} />
                    <span className="text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Amenities */}
          {project.amenities && project.amenities.length > 0 && (
            <div>
              <h3 className="text-xl mb-3 text-gray-800">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {project.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                  >
                    <CheckCircle className="text-green-600" size={16} />
                    <span className="text-sm text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Approvals */}
          {(project.dtcpNumber || project.reraNumber) && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-lg mb-2 text-gray-800">Legal Approvals</h3>
              {project.dtcpNumber && (
                <p className="text-sm text-gray-700">
                  <strong>DTCP Number:</strong> {project.dtcpNumber}
                </p>
              )}
              {project.reraNumber && (
                <p className="text-sm text-gray-700">
                  <strong>RERA Number:</strong> {project.reraNumber}
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button
              onClick={() => {
                onBookVisit();
                onOpenChange(false);
              }}
              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
            >
              Book a Visit
            </Button>
            <Button
              onClick={handleWhatsApp}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white"
            >
              <MessageCircle size={18} className="mr-2" />
              WhatsApp
            </Button>
            <Button
              onClick={handleCall}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
            >
              <Phone size={18} className="mr-2" />
              Call Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
