"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} Iamdumonde. Tous droits réservés.
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm">
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              À Propos
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Contact
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Politique de Confidentialité
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              Termes & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
