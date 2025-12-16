
"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navLinks = [
  { name: 'Produit', href: '#produit' },
  { name: 'Ingrédients', href: '#ingredients' },
  { name: 'Nutrition', href: '#nutrition' },
  { name: 'Avis', href: '#avis' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setActiveSection(entry.target.id);
            }
        });
    };
  
    observer.current = new IntersectionObserver(observerCallback, { 
      rootMargin: '-40% 0px -60% 0px',
      threshold: 0,
    });
  
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.current?.observe(section));
  
    return () => {
      sections.forEach((section) => observer.current?.unobserve(section));
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-sm border-b border-border/50" : "bg-transparent border-b border-transparent"
      )}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <span>Iamdumonde</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    activeSection === link.href.substring(1)
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  )}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">Ouvrir le menu</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 z-50 md:hidden bg-background/95 backdrop-blur-xl transition-transform duration-300 ease-in-out",
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="container mx-auto h-full">
            <div className="flex justify-between items-center h-16">
                 <Link href="/" className="flex items-center gap-2 font-bold text-lg" onClick={handleLinkClick}>
                    <span>Iamdumonde</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={toggleMenu}>
                    <X className="h-6 w-6" />
                    <span className="sr-only">Fermer le menu</span>
                </Button>
            </div>
            <nav className="flex flex-col items-center justify-center h-[calc(100%-4rem)] space-y-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                className={cn(
                  "text-2xl font-medium transition-colors hover:text-primary",
                  activeSection === link.href.substring(1)
                    ? 'text-primary'
                    : 'text-foreground'
                )}
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
