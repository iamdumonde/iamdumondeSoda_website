
"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
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

export default function Home() {
  const [currentVariantIndex, setCurrentVariantIndex] = useState(0);
  const [textAnimationState, setTextAnimationState] = useState<"in" | "out">("in");

  const currentVariant = useMemo(() => {
    return DRINK_VARIANTS[currentVariantIndex];
  }, [currentVariantIndex]);

  const { isLoading, progress } = useImagePreloader(
    currentVariant.imageSequence
  );

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
            
            <section id="product" className="scroll-mt-20">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-4">
                   <h2 className="text-3xl sm:text-4xl font-bold font-headline">
                    A Modern Classic
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Iamdumonde is a modern functional soda brand inspired by classic flavors but crafted with better ingredients. We believe in flavor that feels good, a nostalgic taste with a contemporary twist.
                  </p>
                </div>
                <div>
                   <Image
                    src={placeholderImages["product-can"].src}
                    alt="Iamdumonde soda can"
                    width={placeholderImages["product-can"].width}
                    height={placeholderImages["product-can"].height}
                    className="rounded-lg shadow-2xl mx-auto"
                    data-ai-hint={placeholderImages["product-can"].hint}
                  />
                </div>
              </div>
            </section>

            <section id="ingredients" className="text-center scroll-mt-20">
              <h2 className="text-3xl sm:text-4xl font-bold mb-12 font-headline">
                Naturally Sourced Ingredients
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <Card className="bg-card border-border/50 text-left">
                  <CardHeader>
                    <CardTitle>Sparkling Water</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>The crisp, effervescent base of our soda.</p>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border/50 text-left">
                  <CardHeader>
                    <CardTitle>Natural Flavors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Exotic fruit extracts for a unique taste.</p>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border/50 text-left">
                  <CardHeader>
                    <CardTitle>Cane Sugar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Just a touch for perfectly balanced sweetness.</p>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border/50 text-left">
                  <CardHeader>
                    <CardTitle>Functional Botanicals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Adaptogens and nootropics to elevate your day.</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="nutrition" className="scroll-mt-20">
              <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 font-headline">
                Nutrition Facts
              </h2>
              <Card className="max-w-md mx-auto bg-card border-2 border-foreground p-4 font-sans">
                <CardHeader className="p-2 border-b-8 border-foreground">
                  <CardTitle className="text-4xl font-black">Nutrition Facts</CardTitle>
                  <CardDescription className="text-card-foreground">Serving Size 1 can (12 fl oz)</CardDescription>
                </CardHeader>
                <CardContent className="p-2 space-y-1 text-card-foreground">
                  <div className="flex justify-between font-bold border-b-4 border-foreground py-1"><span>Calories</span> <span>35</span></div>
                  <div className="flex justify-between font-bold border-b-2 border-foreground py-1"><span className="pl-4">Total Fat</span> <span>0g</span></div>
                  <div className="flex justify-between font-bold border-b-2 border-foreground py-1"><span className="pl-4">Sodium</span> <span>0mg</span></div>
                  <div className="flex justify-between font-bold border-b-2 border-foreground py-1"><span className="pl-4">Total Carbohydrate</span> <span>9g</span></div>
                  <div className="flex justify-between border-b-2 border-foreground py-1"><span className="pl-8">Total Sugars</span> <span>5g</span></div>
                  <div className="flex justify-between font-bold border-b-8 border-foreground py-1"><span className="pl-4">Protein</span> <span>0g</span></div>
                  <p className="text-xs pt-2 text-muted-foreground">Not a significant source of other nutrients.</p>
                </CardContent>
              </Card>
            </section>

            <section id="reviews" className="scroll-mt-20">
              <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 font-headline">
                What Our Fans Say
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { review: "The perfect blend of nostalgia and modern wellness. I'm hooked!", author: "Alex R." },
                  { review: "Finally, a soda I can feel good about drinking. CocoBenco is my new afternoon ritual.", author: "Jessica M." },
                  { review: "IamBenco's ginger kick is unreal. So refreshing and so much better than other ginger ales.", author: "David L." }
                ].map((item, i) => (
                  <Card key={i} className="bg-card border-border/50 flex flex-col">
                    <CardHeader>
                      <div className="flex gap-1">{[...Array(5)].map((_, j) => <Star key={j} className="text-yellow-400 fill-yellow-400 h-5 w-5"/>)}</div>
                    </CardHeader>
                    <CardContent className="space-y-4 flex-grow flex flex-col justify-between">
                      <p className="text-lg">"{item.review}"</p>
                      <p className="font-bold text-muted-foreground">- {item.author}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section id="faq" className="scroll-mt-20 max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 font-headline">
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is there caffeine in your sodas?</AccordionTrigger>
                  <AccordionContent>No, all our sodas are caffeine-free. We use natural botanicals for a gentle lift without the jitters.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Where can I buy Iamdumonde?</AccordionTrigger>
                  <AccordionContent>Currently, we're available exclusively online through our website. We're working on bringing Iamdumonde to a retailer near you!</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Are your products vegan and gluten-free?</AccordionTrigger>
                  <AccordionContent>Yes! All our ingredients are plant-based, and our sodas are certified vegan and gluten-free, making them suitable for various dietary needs.</AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            <section id="contact" className="text-center scroll-mt-20 bg-card rounded-lg p-12 shadow-2xl">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-headline">
                Ready to Taste the Difference?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join the soda revolution. Order your first case of Iamdumonde today and rediscover your love for fizzy drinks.
              </p>
              <Button size="lg" className="rounded-full px-10 py-7 text-lg">Shop All Flavors</Button>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
