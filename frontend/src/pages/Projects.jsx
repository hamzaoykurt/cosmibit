import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import ProjectGallery3D from '../components/ProjectGallery3D';

const Projects = () => {
  return (
    <PageTransition>
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Our Projects
          </h1>
          <p className="text-xl text-gray-300">
            Explore our portfolio in an immersive 3D environment
          </p>
        </motion.div>

        {/* 3D Project Gallery */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card overflow-hidden"
        >
          <ProjectGallery3D />
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Projects;
