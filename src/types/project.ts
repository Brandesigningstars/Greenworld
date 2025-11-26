// MongoDB Schema Interface for Projects (for future backend integration)
export interface ProjectSchema {
  _id?: string;
  title: string;
  location: string;
  image: string;
  type: string;
  price: string;
  status: 'featured' | 'ongoing' | 'completed' | 'upcoming';
  units?: string;
  completion?: string;
  description?: string;
  features?: string[];
  amenities?: string[];
  gallery?: string[];
  dtcpNumber?: string;
  reraNumber?: string;
  plotSizes?: string[];
  contactPerson?: string;
  contactPhone?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isActive?: boolean;
}

export interface Project {
  id?: string;
  title: string;
  location: string;
  image: string;
  type: string;
  price: string;
  status: 'featured' | 'ongoing' | 'completed' | 'upcoming';
  units?: string;
  completion?: string;
  description?: string;
  features?: string[];
  amenities?: string[];
  gallery?: string[];
  dtcpNumber?: string;
  reraNumber?: string;
  plotSizes?: string[];
  contactPerson?: string;
  contactPhone?: string;
}
