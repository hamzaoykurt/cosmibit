import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AmbientBackground from '../components/AmbientBackground';
import PageTransition from '../components/PageTransition';

const Home = () => {
  return (
    <>
      <AmbientBackground />
      <PageTransition>
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            >
              CosmiBit
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl"
            >
              Crafting Digital Experiences with Cutting-Edge Technology and Liquid Glass Aesthetics
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link to="/projects">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-button text-lg"
                >
                  View Projects
                </motion.button>
              </Link>

              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-button text-lg bg-gradient-to-r from-blue-500 to-purple-600"
                >
                  Get in Touch
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            {[
              {
                title: 'Innovative Design',
                description: 'Pushing boundaries with glassmorphism and 3D interactions',
                icon: '✨',
              },
              {
                title: 'Performance First',
                description: 'Optimized for speed and seamless user experiences',
                icon: '⚡',
              },
              {
                title: 'Modern Stack',
                description: 'Built with cutting-edge technologies and best practices',
                icon: '🚀',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
                whileHover={{ y: -10 }}
                className="glass-card p-8 text-center"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </PageTransition>
    </>
  );
};

export default Home;
