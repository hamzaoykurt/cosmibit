# System Patterns - CosmiBit

## Architecture Overview

### Decoupled (Headless) Architecture
```
┌─────────────────────────────────────────────────────┐
│                   FRONTEND                          │
│              React SPA (Port 3000)                  │
│  ┌────────────────────────────────────────────┐    │
│  │  Components Layer                          │    │
│  │  - Pages (Home, About, Projects, etc.)    │    │
│  │  - Reusable Components (Nav, 3D, etc.)    │    │
│  └────────────────────────────────────────────┘    │
│  ┌────────────────────────────────────────────┐    │
│  │  Services Layer                            │    │
│  │  - API Client (Axios)                      │    │
│  │  - API Service Methods                     │    │
│  └────────────────────────────────────────────┘    │
└───────────────────┬─────────────────────────────────┘
                    │
                    │ HTTP/REST (CORS Enabled)
                    │
┌───────────────────▼─────────────────────────────────┐
│                   BACKEND                           │
│           Spring Boot API (Port 8080)               │
│  ┌────────────────────────────────────────────┐    │
│  │  Controller Layer                          │    │
│  │  - REST Endpoints                          │    │
│  │  - Request/Response Handling               │    │
│  └────────────────────────────────────────────┘    │
│  ┌────────────────────────────────────────────┐    │
│  │  Repository Layer                          │    │
│  │  - MongoDB Data Access                     │    │
│  └────────────────────────────────────────────┘    │
│  ┌────────────────────────────────────────────┐    │
│  │  Model Layer                               │    │
│  │  - Document Models                         │    │
│  └────────────────────────────────────────────┘    │
└───────────────────┬─────────────────────────────────┘
                    │
                    │ MongoDB Protocol
                    │
┌───────────────────▼─────────────────────────────────┐
│                  DATABASE                           │
│              MongoDB (Port 27017)                   │
│  - Projects Collection                              │
│  - Team Members Collection                          │
│  - Services Collection                              │
│  - Contact Messages Collection                      │
└─────────────────────────────────────────────────────┘
```

## Key Technical Decisions

### 1. Decoupled Architecture
**Decision**: Separate frontend and backend completely
**Reasoning**:
- Frontend can be replaced without affecting backend
- Backend can serve multiple clients (web, mobile, etc.)
- Independent deployment and scaling
- Clear separation of concerns
- API-first approach enables future integrations

### 2. MongoDB (NoSQL)
**Decision**: Use MongoDB instead of relational database
**Reasoning**:
- Flexible schema for dynamic content
- JSON-like documents match frontend data structure
- Easy to modify schema during development
- Good performance for read-heavy operations
- Spring Data MongoDB provides excellent integration

### 3. React Three Fiber for 3D
**Decision**: Use R3F instead of vanilla Three.js
**Reasoning**:
- Declarative 3D programming fits React paradigm
- Better component reusability
- Easier state management with React hooks
- Performance optimizations built-in
- Large ecosystem (@react-three/drei helpers)

### 4. TailwindCSS for Styling
**Decision**: Utility-first CSS framework
**Reasoning**:
- Rapid development with utility classes
- Consistent design system
- Easy to customize (tailwind.config.js)
- Small production bundle (unused classes purged)
- Great for glassmorphism effects

### 5. Vite as Build Tool
**Decision**: Vite instead of Create React App
**Reasoning**:
- Lightning-fast HMR (Hot Module Replacement)
- Modern, ES modules-based
- Faster build times
- Better developer experience
- Growing ecosystem and adoption

## Design Patterns

### Backend Patterns

#### Repository Pattern
```java
@Repository
public interface ProjectRepository extends MongoRepository<Project, String> {
    List<Project> findByStatus(String status);
}
```
- Abstracts data access logic
- Clean separation from business logic
- Easy to test with mocks
- Spring Data provides implementation

#### Controller → Repository Pattern
```java
@RestController
@RequestMapping("/api/v1/projects")
public class ProjectController {
    private final ProjectRepository repository;

    @GetMapping
    public List<Project> getAllProjects() {
        return repository.findAll();
    }
}
```
- Simple, direct data access
- No service layer (simple CRUD operations)
- Controllers directly use repositories
- Validation in DTOs

#### CORS Configuration Pattern
```java
@Configuration
public class SecurityConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        // Allow frontend origin only
    }
}
```
- Centralized CORS configuration
- Security through origin whitelisting
- Environment-based configuration

### Frontend Patterns

#### Component Composition
```jsx
<AmbientBackground />
<Navigation />
<PageTransition>
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
</PageTransition>
```
- Small, reusable components
- Composition over inheritance
- Clear component hierarchy

#### Custom Hooks Pattern
```jsx
// Example: useProjects hook
const useProjects = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    api.projects.getAll().then(setProjects);
  }, []);
  return projects;
};
```
- Reusable stateful logic
- Separation of concerns
- Easy to test

#### Service Layer Pattern (Frontend)
```javascript
// api.js
export default {
  projects: {
    getAll: () => axios.get('/projects'),
    getById: (id) => axios.get(`/projects/${id}`)
  }
};
```
- Centralized API calls
- Single source of truth for endpoints
- Easy to modify API logic
- Type-safe API calls (future: TypeScript)

#### Layout Component Pattern
```jsx
<div className="glass-card">
  <h2>{title}</h2>
  <p>{description}</p>
</div>
```
- Consistent styling through utility classes
- Reusable glass effect classes
- TailwindCSS @apply in CSS

## Component Relationships

### Frontend Component Tree
```
App
├── AmbientBackground (3D Canvas)
├── Navigation (Glass Nav Bar)
└── PageTransition (Framer Motion Wrapper)
    └── Routes
        ├── Home
        ├── About
        │   └── Team Members (from API)
        ├── Projects
        │   └── ProjectGallery3D
        │       └── Project Cards (from API)
        ├── Services
        │   └── Service Cards (from API)
        └── Contact
            └── Contact Form → API
```

### Backend Package Structure
```
com.cosmibit
├── model/              # MongoDB Document Models
│   ├── Project.java
│   ├── TeamMember.java
│   ├── Service.java
│   └── ContactMessage.java
├── repository/         # MongoDB Repositories
│   ├── ProjectRepository.java
│   ├── TeamMemberRepository.java
│   ├── ServiceRepository.java
│   └── ContactMessageRepository.java
├── controller/         # REST Controllers
│   ├── ProjectController.java
│   ├── TeamController.java
│   ├── ServiceController.java
│   └── ContactController.java
├── dto/                # Data Transfer Objects
│   └── ContactMessageRequest.java
└── config/             # Configuration
    └── SecurityConfig.java
```

## Critical Implementation Paths

### Data Flow: Displaying Projects
1. User navigates to /projects
2. Projects component mounts
3. useEffect hook triggers API call
4. api.projects.getAll() calls backend
5. ProjectController.getAllProjects() executes
6. ProjectRepository.findAll() queries MongoDB
7. Data returns as JSON
8. Frontend updates state
9. ProjectGallery3D renders 3D cards
10. React Three Fiber renders scene

### Data Flow: Contact Form Submission
1. User fills contact form
2. Form validation (client-side)
3. api.contact.submit() sends POST request
4. ContactController.submitContact() receives data
5. @Valid annotation triggers Jakarta Validation
6. ContactMessage saved to MongoDB
7. Success response returned
8. Frontend shows confirmation

### Rendering Flow: 3D Background
1. AmbientBackground component mounts
2. Canvas from @react-three/fiber creates WebGL context
3. Particles component generates particle positions
4. LiquidGlassSphere component creates sphere mesh
5. Animation loop starts (60fps target)
6. Mouse movement updates camera/object positions
7. Three.js renders scene each frame

## Performance Patterns

### Code Splitting
- Vite automatically splits code by routes
- React.lazy() for heavy components (if needed)
- Dynamic imports for large libraries

### 3D Optimization
- Particle count limited (configurable)
- Geometry reuse (instanced meshes)
- Texture optimization
- Frame rate monitoring

### API Optimization
- MongoDB indexing on frequently queried fields
- Batch queries where possible
- CORS configured for single origin (security + performance)

## Styling Patterns

### Glassmorphism Implementation
```css
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```
- Low opacity backgrounds (0.05 - 0.1)
- Backdrop blur for frosted glass effect
- Subtle borders for depth
- Gradient backgrounds for variation

### Custom Tailwind Utilities
- `glass-light`, `glass-medium`, `glass-dark` colors
- Custom opacity values (8, 15)
- Custom animations (float, glow)
- Extended backdrop blur values

### Animation Patterns
- Framer Motion for page transitions
- CSS animations for subtle effects
- Three.js animation loop for 3D
- Hover states for interactivity

## Error Handling

### Backend
- Jakarta Validation for input validation
- Exception handling returns proper HTTP status codes
- Validation errors return 400 Bad Request

### Frontend
- Try-catch blocks in async API calls
- Error states in components
- User-friendly error messages
- Graceful degradation for 3D (fallback to 2D)

## Security Considerations

### Current Implementation
- CORS restricted to frontend URL
- Input validation on all endpoints
- MongoDB connection string in properties (should be env var)

### Future Considerations
- JWT authentication for admin endpoints
- Rate limiting on contact form
- HTTPS in production
- Environment variables for sensitive data
