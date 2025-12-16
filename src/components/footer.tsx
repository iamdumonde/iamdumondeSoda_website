
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Twitter, Instagram, Facebook } from 'lucide-react';
import { Button } from './ui/button';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-sm text-muted-foreground order-last md:order-first">
            &copy; {currentYear} Iamdumonde. Tous droits réservés.
          </p>

          <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="#">
                  <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#">
                  <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#">
                  <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                  <span className="sr-only">Facebook</span>
                </Link>
              </Button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Politique de Confidentialité
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Termes & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
