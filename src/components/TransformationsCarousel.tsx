import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

export interface TransformationShowcase {
  name: string;
  beforeImage: string;
  afterImage: string;
  reversed?: boolean; // If true, swap before/after positions
}

interface TransformationsCarouselProps {
  transformationShowcases: TransformationShowcase[];
  isFrench: boolean;
}

const TransformationsCarousel = ({ transformationShowcases, isFrench }: TransformationsCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });
  
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Set up the onSelect callback
  if (emblaApi) {
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mb-20"
    >
      <h3 className="text-center font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
        {isFrench ? "Transformations en Images" : "Transformations in Pictures"}
      </h3>
      
      <div className="relative">
        {/* Navigation Arrows */}
        <button
          onClick={scrollPrev}
          className="absolute left-0 md:-left-4 lg:-left-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-card/90 backdrop-blur-sm border border-border/50 rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!canScrollPrev}
          aria-label={isFrench ? "Précédent" : "Previous"}
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        
        <button
          onClick={scrollNext}
          className="absolute right-0 md:-right-4 lg:-right-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-card/90 backdrop-blur-sm border border-border/50 rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!canScrollNext}
          aria-label={isFrench ? "Suivant" : "Next"}
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Carousel Container */}
        <div className="overflow-hidden mx-8 md:mx-0" ref={emblaRef}>
          <div className="flex gap-4 sm:gap-6">
            {transformationShowcases.map((showcase, index) => {
              // For reversed cards, swap the images
              const leftImage = showcase.reversed ? showcase.afterImage : showcase.beforeImage;
              const rightImage = showcase.reversed ? showcase.beforeImage : showcase.afterImage;
              const leftLabel = showcase.reversed 
                ? (isFrench ? "Après" : "After") 
                : (isFrench ? "Avant" : "Before");
              const rightLabel = showcase.reversed 
                ? (isFrench ? "Avant" : "Before") 
                : (isFrench ? "Après" : "After");
              
              return (
                <motion.div
                  key={showcase.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[350px] lg:w-[300px] group relative overflow-hidden rounded-xl sm:rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-500 shadow-lg hover:shadow-2xl"
                  whileHover={{ y: -5 }}
                >
                  {/* Before/After comparison */}
                  <div className="relative aspect-[3/4]">
                    <div className="absolute inset-0 grid grid-cols-2">
                      <div className="relative overflow-hidden">
                        <img
                          src={leftImage}
                          alt={leftLabel}
                          className="w-full h-full object-cover object-center"
                        />
                        <div className={`absolute bottom-1.5 sm:bottom-2 left-1.5 sm:left-2 ${showcase.reversed ? 'bg-primary/90' : 'bg-black/80'} backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-bold ${showcase.reversed ? 'text-primary-foreground' : 'text-white'} shadow-lg`}>
                          {leftLabel}
                        </div>
                      </div>
                      <div className="relative overflow-hidden">
                        <img
                          src={rightImage}
                          alt={rightLabel}
                          className="w-full h-full object-cover object-center"
                        />
                        <div className={`absolute bottom-1.5 sm:bottom-2 right-1.5 sm:right-2 ${showcase.reversed ? 'bg-black/80' : 'bg-primary/90'} backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-bold ${showcase.reversed ? 'text-white' : 'text-primary-foreground'} shadow-lg`}>
                          {rightLabel}
                        </div>
                      </div>
                    </div>
                    {/* Center divider */}
                    <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 sm:w-1 bg-gold/70 shadow-[0_0_10px_rgba(255,215,0,0.5)]" />
                    
                    {/* Name overlay at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 sm:p-4">
                      <h4 className="text-center font-display text-lg sm:text-xl font-bold text-white drop-shadow-lg">
                        {showcase.name}
                      </h4>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {transformationShowcases.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className="w-2 h-2 rounded-full bg-border/50 hover:bg-primary/50 transition-colors"
              aria-label={`${isFrench ? "Aller à la transformation" : "Go to transformation"} ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TransformationsCarousel;
