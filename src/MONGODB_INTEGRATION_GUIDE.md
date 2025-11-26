# MongoDB Integration Guide for Green World Realtors

This document provides instructions for integrating MongoDB with the Green World Realtors website.

## Overview

The application is fully prepared for MongoDB backend integration with the following features:
- Admin authentication and authorization
- Visitor tracking and analytics
- Project management (CRUD operations - Create, Read, Update, Delete)
- Client/Partner management (CRUD operations)
- Secure data storage
- Real-time statistics and analytics

## Database Schemas

### 1. Admin Schema (adminSchema)
```javascript
{
  _id: ObjectId,
  username: String (required, unique),
  password: String (required, hashed with bcrypt),
  email: String (required, unique),
  createdAt: Date (default: Date.now),
  lastLogin: Date
}
```

### 2. Visitor Schema (visitorSchema)
```javascript
{
  _id: ObjectId,
  sessionId: String (required, unique),
  ipAddress: String,
  userAgent: String,
  visitedAt: Date (default: Date.now, indexed),
  pages: [String],
  duration: Number,
  referrer: String
}
```

### 3. Project Schema (projectSchema)
```javascript
{
  _id: ObjectId,
  title: String (required),
  location: String (required),
  image: String (required, URL),
  type: String (required),
  price: String (required),
  status: String (required, enum: ['featured', 'ongoing', 'completed', 'upcoming']),
  units: String,
  completion: String,
  description: String,
  features: [String],
  amenities: [String],
  gallery: [String],
  dtcpNumber: String,
  reraNumber: String,
  plotSizes: [String],
  contactPerson: String,
  contactPhone: String,
  isActive: Boolean (default: true),
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now)
}
```

### 4. Client Schema (clientSchema)
```javascript
{
  _id: ObjectId,
  name: String (required),
  logo: String (required, URL),
  category: String,
  displayOrder: Number (default: 0),
  isActive: Boolean (default: true),
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now)
}
```

## API Endpoints to Implement

### Admin Authentication
- **POST** `/api/admin/login` - Admin login
  - Body: `{ username: string, password: string }`
  - Returns: `{ success: boolean, token: string, user: { username, email } }`

- **POST** `/api/admin/logout` - Admin logout
  - Headers: `Authorization: Bearer <token>`
  - Returns: `{ success: boolean }`

- **GET** `/api/admin/verify` - Verify admin token
  - Headers: `Authorization: Bearer <token>`
  - Returns: `{ success: boolean, user: { username, email } }`

### Visitor Analytics
- **POST** `/api/visitors/track` - Track new visitor
  - Body: `{ sessionId: string, userAgent: string, referrer: string }`
  - Returns: `{ success: boolean }`

- **GET** `/api/visitors/stats` - Get visitor statistics
  - Query: `?month=<0-11>` (optional)
  - Headers: `Authorization: Bearer <token>`
  - Returns: `{ total: number, thisMonth: number, monthlyData: [], growth: string }`

- **GET** `/api/visitors/count` - Get total visitor count
  - Returns: `{ count: number }`

### Project Management
- **GET** `/api/projects` - Get all projects
  - Query: `?status=<featured|ongoing|completed|upcoming>` (optional)
  - Returns: `{ projects: [] }`

- **GET** `/api/projects/:id` - Get single project
  - Returns: `{ project: {} }`

- **POST** `/api/projects` - Create new project (Admin only)
  - Headers: `Authorization: Bearer <token>`
  - Body: Project object
  - Returns: `{ success: boolean, project: {} }`

- **PUT** `/api/projects/:id` - Update project (Admin only)
  - Headers: `Authorization: Bearer <token>`
  - Body: Updated fields
  - Returns: `{ success: boolean, project: {} }`

- **DELETE** `/api/projects/:id` - Delete project (Admin only)
  - Headers: `Authorization: Bearer <token>`
  - Returns: `{ success: boolean }`

### Client Management
- **GET** `/api/clients` - Get all clients
  - Returns: `{ clients: [] }`

- **GET** `/api/clients/:id` - Get single client
  - Returns: `{ client: {} }`

- **POST** `/api/clients` - Create new client (Admin only)
  - Headers: `Authorization: Bearer <token>`
  - Body: Client object
  - Returns: `{ success: boolean, client: {} }`

- **DELETE** `/api/clients/:id` - Delete client (Admin only)
  - Headers: `Authorization: Bearer <token>`
  - Returns: `{ success: boolean }`

## Implementation Steps

### Step 1: Set Up MongoDB
```bash
# Install MongoDB Node.js driver
npm install mongodb

# Or use Mongoose ODM
npm install mongoose

# Install additional dependencies
npm install bcryptjs jsonwebtoken dotenv
```

### Step 2: Environment Variables
Create a `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/greenworld_realtors
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/greenworld_realtors

JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

ADMIN_EMAIL=greenworldrealtors012@gmail.com
```

### Step 3: Database Connection
Create `server/db/connection.js`:
```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
```

### Step 4: Create Models
Create `server/models/Admin.js`:
```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  lastLogin: Date
});

// Hash password before saving
adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
adminSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Admin', adminSchema);
```

Create `server/models/Visitor.js`:
```javascript
const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  ipAddress: String,
  userAgent: String,
  visitedAt: { type: Date, default: Date.now, index: true },
  pages: [String],
  duration: Number,
  referrer: String
});

module.exports = mongoose.model('Visitor', visitorSchema);
```

Create `server/models/Project.js`:
```javascript
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: String, required: true },
  status: { 
    type: String, 
    required: true, 
    enum: ['featured', 'ongoing', 'completed', 'upcoming'] 
  },
  units: String,
  completion: String,
  description: String,
  features: [String],
  amenities: [String],
  gallery: [String],
  dtcpNumber: String,
  reraNumber: String,
  plotSizes: [String],
  contactPerson: String,
  contactPhone: String,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

projectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Project', projectSchema);
```

Create `server/models/Client.js`:
```javascript
const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  category: String,
  displayOrder: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

clientSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Client', clientSchema);
```

### Step 5: Create API Routes
See the `/server/routes` directory for implementation of all API endpoints.

### Step 6: Update Frontend Code

In `contexts/AdminContext.tsx`, replace mock login with actual API call:
```typescript
const login = async (username: string, password: string): Promise<boolean> => {
  try {
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    
    if (data.success) {
      const adminSession = {
        username: data.user.username,
        email: data.user.email,
        token: data.token
      };
      
      setIsAdminLoggedIn(true);
      setAdminData(adminSession);
      localStorage.setItem('adminSession', JSON.stringify(adminSession));
      
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};
```

Similarly, update visitor tracking and project management with actual API calls.

## Security Considerations

1. **Password Security**: Always hash passwords using bcrypt before storing
2. **JWT Authentication**: Use secure JWT tokens for admin authentication
3. **CORS**: Configure CORS properly to allow only your domain
4. **Rate Limiting**: Implement rate limiting to prevent abuse
5. **Input Validation**: Validate all inputs on the server side
6. **HTTPS**: Use HTTPS in production
7. **Environment Variables**: Never commit `.env` file to version control

## Deployment

### MongoDB Atlas (Recommended)
1. Create a free cluster at mongodb.com/cloud/atlas
2. Whitelist your application's IP
3. Create database user
4. Get connection string
5. Update `MONGODB_URI` in `.env`

### Local MongoDB
```bash
# Install MongoDB locally
# Start MongoDB service
mongod --dbpath /path/to/data

# Connect to database
mongo greenworld_realtors
```

## Initial Admin Setup

After setting up MongoDB, create the initial admin user:
```javascript
// Run this script once: server/scripts/createAdmin.js
const Admin = require('../models/Admin');
const connectDB = require('../db/connection');

const createInitialAdmin = async () => {
  await connectDB();
  
  const admin = new Admin({
    username: 'admin',
    password: 'admin123', // Will be hashed automatically
    email: 'greenworldrealtors012@gmail.com'
  });
  
  await admin.save();
  console.log('Admin created successfully');
  process.exit(0);
};

createInitialAdmin();
```

## Testing

Use tools like Postman or Thunder Client to test all API endpoints before integrating with the frontend.

## Support

For questions or issues with MongoDB integration, refer to:
- MongoDB Documentation: https://docs.mongodb.com/
- Mongoose Documentation: https://mongoosejs.com/docs/
- Express.js Guide: https://expressjs.com/

---

**Note**: This website is currently using localStorage for demo purposes. All code is ready for MongoDB integration by simply uncommenting the API calls and setting up the backend server.
