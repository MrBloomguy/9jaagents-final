import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageSquare,
  Users,
  Headphones,
  Globe,
  Twitter,
  Linkedin,
  Github
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: 'general' | 'support' | 'business' | 'press';
}

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    reset();
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Us',
      description: 'Send us an email anytime',
      value: 'hello@9jaagents.com',
      action: 'mailto:hello@9jaagents.com',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Call Us',
      description: 'Mon-Fri from 8am to 6pm',
      value: '+234 (0) 123 456 7890',
      action: 'tel:+2341234567890',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Visit Us',
      description: 'Come say hello at our office',
      value: 'Lagos, Nigeria',
      action: '#',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Working Hours',
      description: 'Monday to Friday',
      value: '8:00 AM - 6:00 PM WAT',
      action: '#',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const supportOptions = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'General Inquiries',
      description: 'Questions about our platform, pricing, or features',
      response: 'Usually responds within 2-4 hours',
      color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: 'Technical Support',
      description: 'Help with integration, bugs, or technical issues',
      response: 'Usually responds within 1-2 hours',
      color: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Business Partnerships',
      description: 'Interested in partnering or enterprise solutions',
      response: 'Usually responds within 24 hours',
      color: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Press & Media',
      description: 'Media inquiries, interviews, and press releases',
      response: 'Usually responds within 12 hours',
      color: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
    }
  ];

  const socialLinks = [
    { icon: <Twitter className="w-5 h-5" />, name: 'Twitter', url: '#', color: 'hover:text-blue-400' },
    { icon: <Linkedin className="w-5 h-5" />, name: 'LinkedIn', url: '#', color: 'hover:text-blue-600' },
    { icon: <Github className="w-5 h-5" />, name: 'GitHub', url: '#', color: 'hover:text-gray-600' }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge variant="primary" className="mb-6 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              <MessageSquare className="w-4 h-4 mr-2" />
              Get in Touch
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              We'd Love to Hear From You
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-12">
              Have questions about our platform? Need help with integration? 
              Want to partner with us? We're here to help and would love to chat.
            </p>
            
            {/* Quick Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.action}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="block"
                >
                  <Card className="p-6 text-center h-full bg-white dark:bg-slate-800 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className={`w-12 h-12 bg-gradient-to-r ${info.color} rounded-xl flex items-center justify-center mx-auto mb-4 text-white`}>
                      {info.icon}
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                      {info.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                      {info.description}
                    </p>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {info.value}
                    </p>
                  </Card>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              How Can We Help You?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Choose the type of support you need and we'll connect you with the right team member.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {supportOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className={`p-8 h-full border-2 ${option.color} hover:shadow-lg transition-all duration-300`}>
                  <div className="flex items-start space-x-4">
                    <div className="text-slate-600 dark:text-slate-400">
                      {option.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                        {option.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 mb-4">
                        {option.description}
                      </p>
                      <Badge variant="neutral" size="sm" className="bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                        {option.response}
                      </Badge>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              Send Us a Message
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 lg:p-12">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    placeholder="Your full name"
                    error={errors.name?.message}
                    {...register('name', { required: 'Name is required' })}
                  />
                  
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="your.email@example.com"
                    error={errors.email?.message}
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Inquiry Type
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register('type', { required: 'Please select an inquiry type' })}
                    >
                      <option value="">Select inquiry type</option>
                      <option value="general">General Inquiries</option>
                      <option value="support">Technical Support</option>
                      <option value="business">Business Partnerships</option>
                      <option value="press">Press & Media</option>
                    </select>
                    {errors.type && (
                      <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                        {errors.type.message}
                      </p>
                    )}
                  </div>

                  <Input
                    label="Subject"
                    placeholder="Brief subject of your message"
                    error={errors.subject?.message}
                    {...register('subject', { required: 'Subject is required' })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Tell us more about your inquiry..."
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register('message', { 
                      required: 'Message is required',
                      minLength: { value: 20, message: 'Message must be at least 20 characters' }
                    })}
                  />
                  {errors.message && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    We'll get back to you within 24 hours.
                  </p>
                  <Button
                    type="submit"
                    size="lg"
                    loading={isSubmitting}
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Social & Community */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              Join Our Community
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-12">
              Connect with us on social media and stay updated with the latest news, 
              features, and community discussions.
            </p>
            
            <div className="flex justify-center space-x-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-600 dark:text-slate-400 ${social.color} transition-all duration-300 shadow-lg hover:shadow-xl`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;