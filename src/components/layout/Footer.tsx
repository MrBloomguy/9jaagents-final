import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'Platform',
      links: [
        { name: 'Marketplace', href: '/marketplace' },
        { name: 'Categories', href: '/categories' },
        { name: 'Create Agent', href: '/create-agent' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' }
      ]
    }
  ];

  return (
    <footer className="bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-6 h-6 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">9jaAgents</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
              Africa's premier AI agent marketplace.
            </p>
            <div className="flex space-x-3">
              <a href="https://www.x.com/9jaagents" className="text-slate-400 hover:text-primary-600 dark:hover:text-primary-400">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary-600 dark:hover:text-primary-400">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/company/9jaagents" className="text-slate-400 hover:text-primary-600 dark:hover:text-primary-400">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-xs text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              © 2024 9jaAgents. All rights reserved.
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 sm:mt-0">
              Made with ❤️ in Nigeria
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;