# Technical Context - CosmiBit

## Technology Stack

### Backend
- **Framework**: Spring Boot 3.2.0
- **Language**: Java 17
- **Database**: MongoDB (NoSQL)
- **Security**: Spring Security with CORS configuration
- **Validation**: Jakarta Validation API
- **Build Tool**: Maven 3.6+
- **Additional**: Lombok for cleaner code

### Frontend
- **Framework**: React 18.2
- **Build Tool**: Vite (fast, modern build tool)
- **Styling**: TailwindCSS 3.x with custom utilities
- **3D Rendering**: React Three Fiber (@react-three/fiber)
- **3D Helpers**: @react-three/drei
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Node Version**: 18+

### Development Tools
- **Version Control**: Git
- **Package Management**: npm (frontend), Maven (backend)
- **Hot Reload**: Vite HMR (frontend), Spring Boot DevTools (backend)
- **Database Tools**: MongoDB Compass for visualization

## Development Setup

### Prerequisites
```bash
# Required software
- Java 17 or higher
- Maven 3.6+
- MongoDB 4.4+ (local or cloud)
- Node.js 18+
- npm (comes with Node.js)
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Configure MongoDB in application.properties
# spring.data.mongodb.uri=mongodb://localhost:27017/cosmibit

# Build and run
mvn clean install
mvn spring-boot:run

# Server starts on http://localhost:8080
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
# VITE_API_URL=http://localhost:8080/api/v1

# Start dev server
npm run dev

# App opens on http://localhost:3000
```

## Environment Variables

### Backend (application.properties)
```properties
# MongoDB Connection
spring.data.mongodb.uri=mongodb://localhost:27017/cosmibit

# CORS Configuration
cosmibit.frontend.url=http://localhost:3000

# Server Port
server.port=8080
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8080/api/v1
```

## Technical Constraints

### Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- **WebGL Required**: 3D features require WebGL support
- Mobile browsers with GPU acceleration

### Performance Considerations
- 3D particle count affects performance
- Backdrop blur can be GPU-intensive
- Image optimization recommended (WebP format)
- Code splitting via Vite for faster loads

### Security
- CORS configured to allow only frontend URL
- Input validation on all API endpoints
- MongoDB connection string should be secured (environment variables)
- No authentication currently implemented (future consideration)

## Dependencies Management

### Backend Dependencies (pom.xml)
- Spring Boot Starter Web
- Spring Boot Starter Data MongoDB
- Spring Boot Starter Security
- Spring Boot Starter Validation
- Lombok
- Spring Boot DevTools (dev only)

### Frontend Dependencies (package.json)
- react, react-dom
- @react-three/fiber, @react-three/drei
- three (Three.js)
- framer-motion
- react-router-dom
- axios
- tailwindcss, postcss, autoprefixer

## Build & Deployment

### Backend Production Build
```bash
cd backend
mvn clean package
# Output: target/cosmibit-backend-0.0.1-SNAPSHOT.jar

# Run production
java -jar target/cosmibit-backend-0.0.1-SNAPSHOT.jar
```

### Frontend Production Build
```bash
cd frontend
npm run build
# Output: dist/ directory

# Preview build locally
npm run preview
```

## Database Schema

### Collections
- `projects` - Project information
- `team_members` - Team member profiles
- `services` - Service offerings
- `contact_messages` - Contact form submissions

### Document Structure
```javascript
// Project
{
  id: String,
  title: String,
  description: String,
  imageUrl: String,
  status: String, // "COMPLETED", "IN_PROGRESS", "UPCOMING"
  technologies: [String]
}

// TeamMember
{
  id: String,
  name: String,
  title: String,
  bio: String,
  profileImageUrl: String
}

// Service
{
  id: String,
  title: String,
  description: String,
  iconIdentifier: String
}

// ContactMessage
{
  id: String,
  name: String,
  email: String,
  message: String,
  submissionDate: DateTime
}
```

## Tool Usage Patterns

### Development Workflow
1. Start backend server first (port 8080)
2. Start frontend dev server (port 3000)
3. Frontend makes API calls to backend
4. Hot reload active on both sides
5. MongoDB Compass for database inspection

### Testing Approach
- Backend: Postman or curl for API testing
- Frontend: Browser DevTools, React DevTools
- 3D: Check WebGL performance in browser

### Common Commands
```bash
# Backend
mvn clean install          # Build project
mvn spring-boot:run        # Run dev server
mvn clean package          # Production build

# Frontend
npm install                # Install dependencies
npm run dev                # Development server
npm run build              # Production build
npm run preview            # Preview production build

# MongoDB
mongosh                    # Connect to local MongoDB
```

## Known Technical Limitations
- 3D features require WebGL support (not all mobile devices)
- Glass effects may have performance impact on low-end devices
- No authentication system currently (all endpoints public)
- No admin panel for content management (manual MongoDB updates)
