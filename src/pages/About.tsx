import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Target,
  Zap,
  Globe,
  Award,
  Heart,
  Rocket,
  Shield,
  TrendingUp,
  Bot,
  Star,
  CheckCircle,
} from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const About: React.FC = () => {
  const stats = [
    { label: 'AI Agents', value: '2,847', icon: <Bot className="w-5 h-5" /> },
    {
      label: 'Active Users',
      value: '12.5K',
      icon: <Users className="w-5 h-5" />,
    },
    { label: 'Countries', value: '45+', icon: <Globe className="w-5 h-5" /> },
    {
      label: 'Success Rate',
      value: '99.9%',
      icon: <TrendingUp className="w-5 h-5" />,
    },
  ];

  const team = [
    {
      name: 'Olusegun Micheal',
      role: 'CEO & Founder',
      bio: 'Founder and Designer at Givestation, Bantah, passionate about democratizing AI for African businesses.',
      image:
        'https://media.licdn.com/dms/image/v2/D4D03AQFiea-AFohHug/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1694896705481?e=1756944000&v=beta&t=VOsFrG-OMvpprldz3K_Hqdg772If-_js4AqpDuj9dxQ',
      linkedin: 'https://www.linkedin.com/in/micheal-olusegun-a10850199/',
    },
    {
      name: 'Kemi Adebisi',
      role: 'CTO',
      bio: 'Full-stack engineer with 10+ years building scalable platforms for emerging markets.',
      image: '',
      linkedin: '#',
    },
    {
      name: 'Chidi Okwu',
      role: 'Head of Product',
      bio: 'Product strategist focused on creating intuitive AI experiences for non-technical users.',
      image: '',
      linkedin: '#',
    },
  ];

  const values = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Trust & Security',
      description:
        'Every agent is thoroughly vetted. Your data and transactions are always protected with enterprise-grade security.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Community First',
      description:
        'We believe in the power of community. Our platform is built by developers, for developers and businesses.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Innovation',
      description:
        "We're constantly pushing the boundaries of what's possible with AI automation and intelligent agents.",
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Global Impact',
      description:
        "Starting from Nigeria, we're building AI solutions that can transform businesses worldwide.",
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const milestones = [
    {
      year: '2023',
      title: 'Company Founded',
      description:
        'Started with a vision to democratize AI for Nigerian businesses',
    },
    {
      year: '2024',
      title: 'Platform Launch',
      description: 'Launched the first AI agent marketplace in Nigeria',
    },
    {
      year: '2024',
      title: '1K+ Agents',
      description: 'Reached our first milestone of 1,000 active AI agents',
    },
    {
      year: '2024',
      title: 'International Expansion',
      description: 'Expanded to serve businesses across West Africa',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge
              variant="primary"
              className="mb-6 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
            >
              <Heart className="w-4 h-4 mr-2" />
              About 9jaAgents
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              Democratizing AI for
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                African Businesses
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-12">
              We're building the future of AI automation, starting from Nigeria.
              Our platform connects businesses with powerful AI agents that
              solve real problems.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center mb-3 text-blue-600 dark:text-blue-400">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge
                variant="success"
                className="mb-6 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
              >
                <Target className="w-4 h-4 mr-2" />
                Our Mission
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                Making AI Accessible to Every Business
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                We believe that every business, regardless of size or technical
                expertise, should have access to powerful AI automation. Our
                platform bridges the gap between complex AI technology and
                practical business solutions.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      Democratize AI
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300">
                      Make AI accessible to businesses of all sizes
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      Empower Innovation
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300">
                      Enable developers to monetize their AI creations
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      Drive Growth
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300">
                      Help businesses automate and scale efficiently
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2"
                alt="Team collaboration"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">
                      2.4M+
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Tasks Automated
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge
              variant="warning"
              className="mb-6 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
            >
              <Star className="w-4 h-4 mr-2" />
              Our Values
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              What Drives Us Forward
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Our core values guide every decision we make and every feature we
              build.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full text-center p-8 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-0 shadow-xl">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white`}
                  >
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge
              variant="secondary"
              className="mb-6 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
            >
              <Users className="w-4 h-4 mr-2" />
              Our Team
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              Meet the Visionaries
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Our diverse team brings together expertise in AI, software
              engineering, and business strategy to build the future of
              automation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="text-center p-8 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-0 shadow-xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
                  />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {member.bio}
                  </p>
                  <Button variant="outline" size="sm">
                    Connect on LinkedIn
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge
              variant="primary"
              className="mb-6 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
            >
              <Award className="w-4 h-4 mr-2" />
              Our Journey
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              Milestones & Achievements
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              From a simple idea to a thriving marketplace - here's our story.
            </p>
          </motion.div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex items-center space-x-8 ${
                  index % 2 === 1 ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div className="flex-1">
                  <Card className="p-6 bg-white dark:bg-slate-800 border-0 shadow-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <Badge variant="primary" size="sm">
                        {milestone.year}
                      </Badge>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {milestone.title}
                      </h3>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300">
                      {milestone.description}
                    </p>
                  </Card>
                </div>

                <div className="w-4 h-4 bg-blue-600 rounded-full flex-shrink-0 relative">
                  {index < milestones.length - 1 && (
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-blue-200 dark:bg-blue-800" />
                  )}
                </div>

                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Join Our Mission?
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
              Whether you're a developer looking to monetize your AI creations
              or a business seeking automation solutions, we'd love to have you
              on board.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="xl"
                className="bg-white text-blue-600 hover:bg-slate-100"
              >
                <Rocket className="mr-3 w-5 h-5" />
                Start Building
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600"
              >
                <Users className="mr-3 w-5 h-5" />
                Join Community
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
