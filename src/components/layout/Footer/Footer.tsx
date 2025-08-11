import React from 'react';
import { Heart, ExternalLink } from 'lucide-react';
import { cn } from '../../../utils/cn';

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface FooterProps {
  companyName?: string;
  companyLogo?: string;
  description?: string;
  sections?: FooterSection[];
  socialLinks?: SocialLink[];
  contactInfo?: {
    address?: string;
    phone?: string;
    email?: string;
  };
  showCopyright?: boolean;
  copyrightText?: string;
  className?: string;
  variant?: 'default' | 'minimal' | 'detailed';
}

const Footer: React.FC<FooterProps> = ({
  companyName = 'RentalApp',
  companyLogo,
  description = 'Professional rental management made simple.',
  sections = [],
  socialLinks = [],
  contactInfo,
  showCopyright = true,
  copyrightText,
  className,
  variant = 'default',
}) => {
  const currentYear = new Date().getFullYear();

  const defaultSections: FooterSection[] = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '/features' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Documentation', href: '/docs' },
        { label: 'API', href: '/api', external: true },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '/help' },
        { label: 'Community', href: '/community' },
        { label: 'Status', href: '/status', external: true },
        { label: 'Report Bug', href: '/report-bug' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
        { label: 'GDPR', href: '/gdpr' },
      ],
    },
  ];

  const footerSections = sections.length > 0 ? sections : defaultSections;

  const renderLink = (link: FooterLink) => (
    <a
      key={link.label}
      href={link.href}
      className="text-sm text-gray-600 hover:text-primary-600 transition-colors duration-200 flex items-center group"
      target={link.external ? '_blank' : undefined}
      rel={link.external ? 'noopener noreferrer' : undefined}
    >
      {link.label}
      {link.external && (
        <ExternalLink className="ml-1 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      )}
    </a>
  );

  if (variant === 'minimal') {
    return (
      <footer className={cn('bg-gray-50 border-t border-gray-200', className)}>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
            <div className="flex items-center space-x-2">
              {companyLogo ? (
                <img src={companyLogo} alt={companyName} className="h-6 w-auto" />
              ) : (
                <div className="w-6 h-6 bg-primary-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">R</span>
                </div>
              )}
              <span className="text-sm font-medium text-gray-900">{companyName}</span>
            </div>
            
            {showCopyright && (
              <p className="text-sm text-gray-600">
                {copyrightText || `© ${currentYear} ${companyName}. All rights reserved.`}
              </p>
            )}
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className={cn('bg-white border-t border-gray-200', className)}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {variant === 'detailed' && (
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            {/* Company info */}
            <div className="space-y-6 xl:col-span-1">
              <div className="flex items-center space-x-2">
                {companyLogo ? (
                  <img src={companyLogo} alt={companyName} className="h-8 w-auto" />
                ) : (
                  <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">R</span>
                  </div>
                )}
                <span className="text-xl font-bold text-gray-900">{companyName}</span>
              </div>
              
              {description && (
                <p className="text-gray-600 max-w-md">{description}</p>
              )}

              {contactInfo && (
                <div className="space-y-2">
                  {contactInfo.address && (
                    <p className="text-sm text-gray-600">{contactInfo.address}</p>
                  )}
                  {contactInfo.phone && (
                    <p className="text-sm text-gray-600">Phone: {contactInfo.phone}</p>
                  )}
                  {contactInfo.email && (
                    <p className="text-sm text-gray-600">Email: {contactInfo.email}</p>
                  )}
                </div>
              )}

              {socialLinks.length > 0 && (
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      className="text-gray-400 hover:text-primary-600 transition-colors duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="sr-only">{social.name}</span>
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation sections */}
            <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                {footerSections.slice(0, 2).map((section) => (
                  <div key={section.title}>
                    <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                      {section.title}
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {section.links.map((link) => (
                        <li key={link.label}>{renderLink(link)}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                {footerSections.slice(2, 4).map((section) => (
                  <div key={section.title}>
                    <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                      {section.title}
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {section.links.map((link) => (
                        <li key={link.label}>{renderLink(link)}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {variant === 'default' && (
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                  {section.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>{renderLink(link)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Bottom section */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            {showCopyright && (
              <div className="flex items-center space-x-1">
                <p className="text-sm text-gray-600">
                  {copyrightText || `© ${currentYear} ${companyName}. All rights reserved.`}
                </p>
                <span className="text-gray-400">•</span>
                <p className="text-sm text-gray-600 flex items-center">
                  Made with <Heart className="mx-1 w-3 h-3 text-red-500" /> for rental businesses
                </p>
              </div>
            )}

            {socialLinks.length > 0 && variant !== 'detailed' && (
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-gray-400 hover:text-primary-600 transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">{social.name}</span>
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
