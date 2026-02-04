import { motion } from "framer-motion";

export interface TransformationShowcase {
  name: string;
  beforeImage: string;
  afterImage: string;
  reversed?: boolean; // If true, swap before/after positions
  description?: string;
  descriptionEn?: string;
}

interface TransformationsCarouselProps {
  transformationShowcases: TransformationShowcase[];
  isFrench: boolean;
}

const TransformationsCarousel = ({ transformationShowcases, isFrench }: TransformationsCarouselProps) => {
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
      
      {/* Grid layout - all items visible */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
        {transformationShowcases.map((showcase, index) => {
          // Always show beforeImage on left, afterImage on right
          const leftImage = showcase.beforeImage;
          const rightImage = showcase.afterImage;
          // Labels stay in their original positions (Avant always left, Après always right)
          const leftLabel = isFrench ? "Avant" : "Before";
          const rightLabel = isFrench ? "Après" : "After";
          
          return (
            <motion.div
              key={showcase.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-500 shadow-lg hover:shadow-2xl"
              whileHover={{ y: -5 }}
            >
              {/* Before/After comparison */}
              <div className="relative aspect-[3/4]">
                <div className="absolute inset-0 grid grid-cols-2">
                  <div className="relative overflow-hidden bg-black/20">
                    <img
                      src={leftImage}
                      alt={leftLabel}
                      className="w-full h-full object-contain object-center"
                    />
                    <div className={`absolute bottom-1.5 sm:bottom-2 left-1.5 sm:left-2 ${showcase.reversed ? 'bg-primary/90' : 'bg-black/80'} backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-bold ${showcase.reversed ? 'text-primary-foreground' : 'text-white'} shadow-lg`}>
                      {leftLabel}
                    </div>
                  </div>
                  <div className="relative overflow-hidden bg-black/20">
                    <img
                      src={rightImage}
                      alt={rightLabel}
                      className="w-full h-full object-contain object-center"
                    />
                    <div className={`absolute bottom-1.5 sm:bottom-2 right-1.5 sm:right-2 ${showcase.reversed ? 'bg-black/80' : 'bg-primary/90'} backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-bold ${showcase.reversed ? 'text-white' : 'text-primary-foreground'} shadow-lg`}>
                      {rightLabel}
                    </div>
                  </div>
                </div>
                {/* Center divider */}
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 sm:w-1 bg-gold/70 shadow-[0_0_10px_rgba(255,215,0,0.5)]" />
                
                {/* Name and description overlay at top left */}
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
                  <div className="bg-black/60 backdrop-blur-sm px-2 py-1.5 rounded-md">
                    <h4 className="font-display text-sm sm:text-base font-bold text-white drop-shadow-lg">
                      {showcase.name}
                    </h4>
                    {(showcase.description || showcase.descriptionEn) && (
                      <p className="text-[9px] sm:text-xs text-white/80 mt-0.5 leading-tight">
                        {isFrench ? showcase.description : showcase.descriptionEn}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default TransformationsCarousel;
