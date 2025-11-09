# CosmiBit Frontend - React Application

High-end React SPA with advanced 3D visuals and glassmorphism design.

## Technology Stack

- **React** 18.2 - UI library
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **React Three Fiber** - 3D rendering with Three.js
- **@react-three/drei** - Useful helpers for R3F
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **Axios** - HTTP client

## Features

### Visual Features
- **Glassmorphism UI** - Frosted glass effect throughout
- **Ambient 3D Background** - Interactive particle system with liquid glass sphere
- **3D Project Gallery** - Projects displayed as interactive 3D cards
- **Fluid Animations** - Smooth page transitions and hover effects
- **Responsive Design** - Mobile-first approach

### Pages
- **Home** (`/`) - Hero section with 3D background
- **About** (`/about`) - Team members display
- **Projects** (`/projects`) - 3D interactive project gallery
- **Services** (`/services`) - Service offerings
- **Contact** (`/contact`) - Contact form with validation

## Getting Started

### Install Dependencies
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Opens at `http://localhost:3000`

### Build for Production
```bash
npm run build
```
Output in `dist/` directory

### Preview Production Build
```bash
npm run preview
```

## Configuration

### Environment Variables
Create a `.env` file:
```env
VITE_API_URL=http://localhost:8080/api/v1
```

## Key Components

### AmbientBackground
Full-screen 3D canvas with:
- Floating particles
- Liquid glass sphere with distortion
- Mouse-reactive animations

Location: `src/components/AmbientBackground.jsx`

### ProjectGallery3D
Interactive 3D project display:
- Circular card layout
- Hover effects
- Auto-rotation
- Data fetched from API

Location: `src/components/ProjectGallery3D.jsx`

### PageTransition
Wrapper for smooth page transitions using Framer Motion.

Location: `src/components/PageTransition.jsx`

## Styling

### Custom Tailwind Classes

#### Glass Effects
```css
.glass-card - Standard glass card
.glass-button - Glass button with hover effects
.glass-nav - Navigation bar glass effect
.liquid-glass - Enhanced liquid glass
```

#### Colors
- `glass-light` - rgba(255, 255, 255, 0.1)
- `glass-medium` - rgba(255, 255, 255, 0.15)
- `glass-dark` - rgba(0, 0, 0, 0.2)

#### Animations
- `animate-float` - Floating animation
- `animate-glow` - Glowing effect

### Customization
Edit `tailwind.config.js` to customize:
- Colors
- Animations
- Breakpoints
- Utilities

## API Integration

The `api.js` service provides methods for all backend endpoints:

```javascript
import api from './services/api';

// Projects
const projects = await api.projects.getAll();

// Team
const team = await api.team.getAll();

// Services
const services = await api.services.getAll();

// Contact
await api.contact.submit({ name, email, message });
```

## Performance Tips

- **Code Splitting**: Vite automatically code-splits
- **3D Optimization**: Particle count can be adjusted in `AmbientBackground.jsx`
- **Image Optimization**: Use WebP format for images
- **Lazy Loading**: Consider lazy loading for heavy 3D components

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers with WebGL support

**Note**: 3D features require WebGL support.

## Troubleshooting

### 3D Canvas Not Rendering
- Check browser WebGL support
- Check console for Three.js errors
- Ensure GPU acceleration is enabled

### API Connection Issues
- Verify backend is running on port 8080
- Check CORS configuration
- Verify `.env` file is configured

### Build Errors
- Clear `node_modules` and reinstall
- Check Node.js version (18+ required)
- Verify all dependencies are installed

## Development Workflow

1. Start backend server (port 8080)
2. Start frontend dev server (port 3000)
3. Make changes - hot reload active
4. Test across different browsers
5. Build for production

## License

Proprietary and confidential.
