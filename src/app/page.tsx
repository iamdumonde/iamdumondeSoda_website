
"use client";

import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Image from "next/image";
import { DRINK_VARIANTS } from "@/lib/drink-data";
import type { DrinkVariant } from "@/lib/types";
import { useImagePreloader } from "@/hooks/use-image-preloader";
import Header from "@/components/header";
import Footer from "@/components/footer";
import LoadingScreen from "@/components/loading-screen";
import HeroAnimation from "@/components/hero-animation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import placeholderImages from "@/lib/placeholder-images.json";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const useIntersectionObserver = (options: IntersectionObserverInit) => {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const [node, setNode] = useState<HTMLElement | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(([entry]) => setEntry(entry), options);

    const currentObserver = observer.current;

    if (node) currentObserver.observe(node);

    return () => currentObserver?.disconnect();
  }, [node, options]);

  return [setNode, entry] as const;
};

const AnimatedSection: React.FC<{children: React.ReactNode, className?: string, style?: React.CSSProperties}> = ({ children, className, style }) => {
  const [ref, entry] = useIntersectionObserver({ threshold: 0.1 });
  const isVisible = entry?.isIntersecting;

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-1000 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};

export default function Home() {
  const [currentVariantIndex, setCurrentVariantIndex] = useState(0);
  const [textAnimationState, setTextAnimationState] = useState<"in" | "out">("in");

  const allImageUrls = useMemo(() => {
    return DRINK_VARIANTS.flatMap(v => v.imageSequence);
  }, []);

  const { isLoading, progress } = useImagePreloader(allImageUrls);

  const currentVariant = useMemo(() => {
    return DRINK_VARIANTS[currentVariantIndex];
  }, [currentVariantIndex]);
  

  const changeVariant = useCallback((newIndex: number) => {
    setTextAnimationState("out");
    setTimeout(() => {
      setCurrentVariantIndex(newIndex);
      setTextAnimationState("in");
    }, 500); // Corresponds to animation duration
  }, []);

  const handleNextVariant = useCallback(() => {
    changeVariant((currentVariantIndex + 1) % DRINK_VARIANTS.length);
  }, [currentVariantIndex, changeVariant]);

  const handlePrevVariant = useCallback(() => {
    changeVariant(
      (currentVariantIndex - 1 + DRINK_VARIANTS.length) % DRINK_VARIANTS.length
    );
  }, [currentVariantIndex, changeVariant]);

  if (isLoading) {
    return <LoadingScreen progress={progress} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />

      <main className="flex-grow">
        <HeroAnimation
          key={currentVariant.id} // Re-mount component on variant change for clean state
          imageUrls={currentVariant.imageSequence}
          name={currentVariant.name}
          subtitle={currentVariant.subtitle}
          description={currentVariant.description}
          onNext={handleNextVariant}
          onPrev={handlePrevVariant}
          currentIndex={currentVariantIndex}
          totalVariants={DRINK_VARIANTS.length}
          textAnimationState={textAnimationState}
        />

        <div className="relative z-10 bg-background w-full">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 space-y-24 md:space-y-32">
            
            <AnimatedSection>
              <section id="produit" className="scroll-mt-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-4">
                     <h2 className="text-3xl sm:text-4xl font-bold font-headline">
                      Un Classique Moderne
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      Iamdumonde est un soda fonctionnel moderne inspiré des saveurs classiques mais élaboré avec de meilleurs ingrédients. Nous croyons en une saveur qui fait du bien, un goût nostalgique avec une touche contemporaine.
                    </p>
                  </div>
                  <div className="overflow-hidden rounded-lg shadow-2xl">
                     <Image
                      src={placeholderImages["product-can"].src}
                      alt="Canettes de soda Iamdumonde"
                      width={placeholderImages["product-can"].width}
                      height={placeholderImages["product-can"].height}
                      className="w-full h-auto object-cover transform transition-transform duration-500 hover:scale-105"
                      data-ai-hint={placeholderImages["product-can"].hint}
                    />
                  </div>
                </div>
              </section>
            </AnimatedSection>

            <AnimatedSection>
              <section id="ingredients" className="text-center scroll-mt-20">
                <h2 className="text-3xl sm:text-4xl font-bold mb-12 font-headline">
                  Ingrédients d'Origine Naturelle
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  <Card className="bg-card border-border/50 text-left transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-2">
                    <CardHeader>
                      <CardTitle>Eau Pétillante</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>La base vive et effervescente de notre soda.</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-card border-border/50 text-left transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-2 [transition-delay:50ms]">
                    <CardHeader>
                      <CardTitle>Arômes Naturels</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Extraits de fruits exotiques pour un goût unique.</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-card border-border/50 text-left transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-2 [transition-delay:100ms]">
                    <CardHeader>
                      <CardTitle>Sucre de Canne</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Juste une touche pour une douceur parfaitement équilibrée.</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-card border-border/50 text-left transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-2 [transition-delay:150ms]">
                    <CardHeader>
                      <CardTitle>Botaniques Fonctionnels</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Adaptogènes et nootropiques pour élever votre journée.</p>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </AnimatedSection>
            
            <AnimatedSection>
              <section id="nutrition" className="scroll-mt-20">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 font-headline">
                  Informations Nutritionnelles
                </h2>
                <Card className="max-w-md mx-auto bg-card border-2 border-primary/50 p-4 font-sans transition-all duration-500 hover:shadow-xl hover:shadow-primary/10">
                  <CardHeader className="p-2 border-b-8 border-foreground">
                    <CardTitle className="text-4xl font-black">Nutrition</CardTitle>
                    <CardDescription className="text-card-foreground">Portion : 1 canette (355 ml)</CardDescription>
                  </CardHeader>
                  <CardContent className="p-2 space-y-1 text-card-foreground">
                    <div className="flex justify-between font-bold border-b-4 border-foreground py-1"><span>Calories</span> <span>35</span></div>
                    <div className="flex justify-between font-bold border-b-2 border-foreground py-1"><span className="pl-4">Matières grasses</span> <span>0g</span></div>
                    <div className="flex justify-between font-bold border-b-2 border-foreground py-1"><span className="pl-4">Sodium</span> <span>0mg</span></div>
                    <div className="flex justify-between font-bold border-b-2 border-foreground py-1"><span className="pl-4">Glucides</span> <span>9g</span></div>
                    <div className="flex justify-between border-b-2 border-foreground py-1"><span className="pl-8">Sucres totaux</span> <span>5g</span></div>
                    <div className="flex justify-between font-bold border-b-8 border-foreground py-1"><span className="pl-4">Protéines</span> <span>0g</span></div>
                    <p className="text-xs pt-2 text-muted-foreground">Source négligeable d'autres nutriments.</p>
                  </CardContent>
                </Card>
              </section>
            </AnimatedSection>

            <section id="avis" className="scroll-mt-20">
              <AnimatedSection>
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 font-headline">
                  Ce Que Disent Nos Clients
                </h2>
              </AnimatedSection>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { review: "Le mélange parfait de nostalgie et de bien-être moderne. Je suis accro !", author: "Alex R." },
                  { review: "Enfin, un soda que je peux boire sans culpabiliser. CocoBenco est mon nouveau rituel de l'après-midi.", author: "Jessica M." },
                  { review: "Le piquant du gingembre dans IamBenco est incroyable. Si rafraîchissant et tellement meilleur que les autres ginger ales.", author: "David L." }
                ].map((item, i) => (
                  <AnimatedSection key={i} style={{ transitionDelay: `${i * 150}ms` }}>
                    <Card className="bg-card border-border/50 flex flex-col h-full transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-2">
                      <CardHeader>
                        <div className="flex gap-1">{[...Array(5)].map((_, j) => <Star key={j} className="text-primary fill-primary h-5 w-5"/>)}</div>
                      </CardHeader>
                      <CardContent className="space-y-4 flex-grow flex flex-col justify-between">
                        <p className="text-lg">"{item.review}"</p>
                        <p className="font-bold text-muted-foreground">- {item.author}</p>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                ))}
              </div>
            </section>

            <AnimatedSection>
              <section id="faq" className="scroll-mt-20 max-w-3xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 font-headline">
                  Questions Fréquemment Posées
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Y a-t-il de la caféine dans vos sodas ?</AccordionTrigger>
                    <AccordionContent>Non, tous nos sodas sont sans caféine. Nous utilisons des extraits botaniques naturels pour un léger coup de fouet sans l'énervement.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Où puis-je acheter Iamdumonde ?</AccordionTrigger>
                    <AccordionContent>Actuellement, nous sommes disponibles exclusivement en ligne sur notre site web. Nous travaillons à rendre Iamdumonde disponible chez un détaillant près de chez vous !</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Vos produits sont-ils végétaliens et sans gluten ?</AccordionTrigger>
                    <AccordionContent>Oui ! Tous nos ingrédients sont d'origine végétale, et nos sodas sont certifiés végétaliens et sans gluten, ce qui les rend adaptés à divers besoins alimentaires.</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </section>
            </AnimatedSection>

            <AnimatedSection>
              <section id="contact" className="text-center scroll-mt-20 bg-card rounded-lg p-12 shadow-2xl">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-headline">
                  Prêt à Goûter la Différence ?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Rejoignez la révolution du soda. Commandez votre première caisse d'Iamdumonde aujourd'hui et redécouvrez votre amour pour les boissons pétillantes.
                </p>
                <Button 
                  size="lg" 
                  className="
                    group relative rounded-full px-10 py-7 text-lg font-bold text-primary-foreground 
                    transition-all duration-300 ease-in-out
                    hover:scale-105 active:scale-95
                    bg-primary overflow-hidden
                  "
                >
                  <span 
                    className="
                      absolute inset-0 z-0
                      bg-primary-foreground/30
                      rounded-full
                      scale-0 group-hover:scale-125
                      transition-transform duration-500 ease-in-out
                    "
                  ></span>
                  <span
                    className="
                      absolute inset-0 z-10 
                      bg-gradient-to-br from-primary via-primary to-primary-foreground/5
                      rounded-full
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-500
                    "
                  ></span>
                  <span className="relative z-20">Acheter Toutes les Saveurs</span>
                </Button>
              </section>
            </AnimatedSection>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

    