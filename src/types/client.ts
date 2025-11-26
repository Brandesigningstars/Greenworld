// MongoDB Schema Interface for Clients (for future backend integration)
export interface ClientSchema {
  _id?: string;
  name: string;
  logo: string;
  category?: string;
  displayOrder?: number;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Client {
  id?: string;
  name: string;
  logo: string;
  category?: string;
}
