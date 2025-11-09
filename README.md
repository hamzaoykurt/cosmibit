# CosmiBit - Corporate & Portfolio Website

A high-end, visually rich corporate and portfolio website built with a decoupled (headless) architecture. Features advanced 3D visuals, "liquid glass" effects, and fluid animations for a perfect user experience.

## Project Architecture

This project follows a **headless/decoupled architecture**:

- **Backend**: Spring Boot REST API with MongoDB (NoSQL database)
- **Frontend**: React SPA with advanced 3D rendering capabilities

## Technology Stack

### Backend
- **Framework**: Spring Boot 3.2.0
- **Database**: MongoDB (NoSQL)
- **Security**: Spring Security with CORS
- **Build Tool**: Maven
- **Java Version**: 17

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: TailwindCSS with custom Glassmorphism utilities
- **3D Rendering**: React Three Fiber (@react-three/fiber) + Three.js
- **3D Utilities**: @react-three/drei
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **HTTP Client**: Axios

## Project Structure

```
cosmibit/
├── backend/                          # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/cosmibit/
│   │   │   │   ├── model/           # MongoDB Document Models
│   │   │   │   │   ├── Project.java
│   │   │   │   │   ├── TeamMember.java
│   │   │   │   │   ├── Service.java
│   │   │   │   │   └── ContactMessage.java
│   │   │   │   ├── repository/      # MongoDB Repositories
│   │   │   │   │   ├── ProjectRepository.java
│   │   │   │   │   ├── TeamMemberRepository.java
│   │   │   │   │   ├── ServiceRepository.java
│   │   │   │   │   └── ContactMessageRepository.java
│   │   │   │   ├── controller/      # REST Controllers
│   │   │   │   │   ├── ProjectController.java
│   │   │   │   │   ├── TeamController.java
│   │   │   │   │   ├── ServiceController.java
│   │   │   │   │   └── ContactController.java
│   │   │   │   ├── config/          # Configuration Classes
│   │   │   │   │   └── SecurityConfig.java
│   │   │   │   ├── dto/             # Data Transfer Objects
│   │   │   │   │   └── ContactMessageRequest.java
│   │   │   │   └── CosmiBitApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   └── pom.xml
│
└── frontend/                         # React Frontend
    ├── public/
    ├── src/
    │   ├── components/              # Reusable Components
    │   │   ├── AmbientBackground.jsx      # 3D Background
    │   │   ├── ProjectGallery3D.jsx       # 3D Project Gallery
    │   │   ├── Navigation.jsx             # Navigation Bar
    │   │   └── PageTransition.jsx         # Page Transitions
    │   ├── pages/                   # Page Components
    │   │   ├── Home.jsx
    │   │   ├── About.jsx
    │   │   ├── Projects.jsx
    │   │   ├── Services.jsx
    │   │   └── Contact.jsx
    │   ├── services/                # API Services
    │   │   └── api.js
    │   ├── styles/                  # Stylesheets
    │   │   └── index.css
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── postcss.config.js
```

## Key Features

### Backend Features
- **RESTful API** with Spring Boot
- **MongoDB Integration** using Spring Data MongoDB
- **CORS Configuration** for secure cross-origin requests
- **Input Validation** using Jakarta Validation
- **Clean Architecture** with separation of concerns

### Frontend Features
- **Glassmorphism Design Language** throughout the UI
- **Ambient 3D Background** with React Three Fiber
  - Interactive particle system
  - Liquid glass sphere with distortion effects
  - Mouse-reactive animations
- **3D Project Gallery**
  - Interactive 3D cards arranged in circular layout
  - Hover effects with smooth transitions
  - Fetches data from backend API
- **Fluid Page Transitions** using Framer Motion
- **Responsive Design** with TailwindCSS
- **Contact Form** with validation and API integration

## API Endpoints

### Projects
- `GET /api/v1/projects` - Get all projects
- `GET /api/v1/projects/{id}` - Get project by ID
- `GET /api/v1/projects/status/{status}` - Get projects by status

### Team
- `GET /api/v1/team` - Get all team members
- `GET /api/v1/team/{id}` - Get team member by ID

### Services
- `GET /api/v1/services` - Get all services
- `GET /api/v1/services/{id}` - Get service by ID

### Contact
- `POST /api/v1/contact` - Submit contact form

## Setup Instructions

### Prerequisites
- Java 17 or higher
- Maven 3.6+
- MongoDB 4.4+ (local or cloud instance)
- Node.js 18+ and npm

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Configure MongoDB connection in `src/main/resources/application.properties`:
   ```properties
   spring.data.mongodb.uri=mongodb://localhost:27017/cosmibit
   # For MongoDB Atlas:
   # spring.data.mongodb.uri=mongodb+srv://<username>:<password>@<cluster-url>/cosmibit
   ```

3. Build and run the application:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

   The backend will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will start on `http://localhost:3000`

## Database Schema

### Project Document
```javascript
{
  id: String,
  title: String,
  description: String,
  imageUrl: String,
  status: String, // "COMPLETED", "UPCOMING", "IN_PROGRESS"
  technologies: [String]
}
```

### TeamMember Document
```javascript
{
  id: String,
  name: String,
  title: String,
  bio: String,
  profileImageUrl: String
}
```

### Service Document
```javascript
{
  id: String,
  title: String,
  description: String,
  iconIdentifier: String
}
```

### ContactMessage Document
```javascript
{
  id: String,
  name: String,
  email: String,
  message: String,
  submissionDate: DateTime
}
```

## Sample Data

To populate the database with sample data, you can use MongoDB Compass or the MongoDB shell:

```javascript
// Projects
db.projects.insertMany([
  {
    title: "E-Commerce Platform",
    description: "A modern e-commerce solution with advanced features",
    imageUrl: "https://example.com/image1.jpg",
    status: "COMPLETED",
    technologies: ["React", "Node.js", "MongoDB"]
  },
  {
    title: "Mobile App",
    description: "Cross-platform mobile application",
    imageUrl: "https://example.com/image2.jpg",
    status: "IN_PROGRESS",
    technologies: ["React Native", "Firebase"]
  }
]);

// Team Members
db.team_members.insertMany([
  {
    name: "John Doe",
    title: "CEO & Founder",
    bio: "Passionate about creating amazing digital experiences",
    profileImageUrl: "https://example.com/profile1.jpg"
  }
]);

// Services
db.services.insertMany([
  {
    title: "Web Development",
    description: "Custom web applications built with modern technologies",
    iconIdentifier: "web"
  },
  {
    title: "Mobile Development",
    description: "Native and cross-platform mobile apps",
    iconIdentifier: "mobile"
  }
]);
```

## Development

### Backend Development
- **Hot Reload**: Spring Boot DevTools is included in the dependencies
- **API Testing**: Use Postman or curl to test endpoints
- **Logs**: Check console output for debugging

### Frontend Development
- **Hot Reload**: Vite provides instant HMR (Hot Module Replacement)
- **Component Development**: Components are in `src/components/`
- **Styling**: Custom Tailwind utilities available in `tailwind.config.js`

## Build for Production

### Backend
```bash
cd backend
mvn clean package
java -jar target/cosmibit-backend-0.0.1-SNAPSHOT.jar
```

### Frontend
```bash
cd frontend
npm run build
```

The production build will be in the `frontend/dist` directory.

## Design System

### Glassmorphism Classes
- `.glass-card` - Standard glass card with blur and transparency
- `.glass-button` - Interactive glass button
- `.glass-nav` - Navigation bar with glass effect
- `.liquid-glass` - Enhanced liquid glass effect

### Color Palette
- Primary: Purple/Blue gradient
- Background: Dark gradient (slate-900 → purple-900)
- Accents: Blue-400, Purple-500, Pink-500

### Animations
- `animate-float` - Floating animation
- `animate-glow` - Glowing effect
- Framer Motion for page and component transitions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is proprietary and confidential.

## Support

For questions or support, please contact the development team.

---

Built with ❤️ using Spring Boot, React, and Three.js
