import { motion } from 'motion/react';
import { MapPin, Home, IndianRupee, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Project } from '../types/project';

interface ProjectCardProps extends Project {
  onBookVisit: () => void;
  onViewDetails: () => void;
}

export default function ProjectCard({
  title,
  location,
  image,
  type,
  price,
  status,
  units,
  completion,
  onBookVisit,
  onViewDetails,
}: ProjectCardProps) {
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

  return (
    <motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{ duration: 0.5 }}
  whileHover={{ y: -10, scale: 1.03 }}
  className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group bg-white"
>

      <div className="relative overflow-hidden h-64">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4">
          <Badge className={`${statusColors[status]} text-white border-0 px-3 py-1`}>
            {statusLabels[status]}
          </Badge>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6">
        <h3 className="text-2xl mb-2 text-gray-800 group-hover:text-green-700 transition-colors duration-300">
          {title}
        </h3>

        <div className="flex items-center text-gray-600 mb-4">
          <MapPin size={18} className="mr-2 text-green-600" />
          <span>{location}</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center text-gray-700">
            <Home size={18} className="mr-2 text-green-600" />
            <span className="text-sm">{type}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <IndianRupee size={18} className="mr-2 text-green-600" />
            <span className="text-sm">{price}</span>
          </div>
          {units && (
            <div className="flex items-center text-gray-700">
              <Home size={18} className="mr-2 text-green-600" />
              <span className="text-sm">{units}</span>
            </div>
          )}
          {completion && (
            <div className="flex items-center text-gray-700">
              <Calendar size={18} className="mr-2 text-green-600" />
              <span className="text-sm">{completion}</span>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            onClick={onBookVisit}
            className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-md hover:shadow-lg transition-all duration-300"
          >
            Book Visit
          </Button>
          <Button
            onClick={onViewDetails}
            variant="outline"
            className="flex-1 border-2 border-green-600 text-green-700 hover:bg-green-50 transition-all duration-300"
          >
            View Details
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
