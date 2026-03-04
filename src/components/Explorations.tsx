import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const EXPLORATIONS = [
  { id: 1, title: "Celestial Planets", category: "3D Visualization", image: "/explorations/planet.jpeg" },
  { id: 2, title: "ASCII Art Study", category: "Generative Art", image: "/explorations/ascii.jpeg" },
  { id: 3, title: "Atmospheric Smoke", category: "Visual Effects", image: "/explorations/smoke.jpeg" },
  { id: 4, title: "Abstract Cylinder", category: "3D Rendering", image: "/explorations/cylinder.jpeg" },
  { id: 5, title: "Organic Waves", category: "Motion Design", image: "/explorations/wave.jpeg" },
  { id: 6, title: "Geometric Cubes", category: "3D Composition", image: "/explorations/cubes.jpeg" },
];

export function Explorations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the center content
      if (pinnedRef.current && containerRef.current) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: pinnedRef.current,
          pinSpacing: false,
        });
      }

      // Parallax left column
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          { y: "10vh" },
          {
            y: "-120vh",
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      }

      // Parallax right column
      if (rightColRef.current) {
        gsap.fromTo(
          rightColRef.current,
          { y: "40vh" },
          {
            y: "-100vh",
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Handle escape key for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const renderCard = (item: typeof EXPLORATIONS[0]) => {
    const rotation = (item.id % 2 === 0 ? 1 : -1) * (1.5 + (item.id % 3));

    return (
      <div
        key={item.id}
        onClick={() => setSelectedImage(item.image)}
        className="group relative aspect-square max-w-[320px] w-full mx-auto cursor-pointer"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {/* Outer border frame */}
        <div className="absolute -inset-4 rounded-[40px] border border-stroke/30 bg-surface/10 backdrop-blur-sm transition-colors duration-500 group-hover:border-stroke/80" />
        
        {/* Card content */}
        <div className="relative w-full h-full rounded-[24px] overflow-hidden border border-stroke">
          {/* Base image */}
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Blue tint overlay */}
          <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay" />
          
          {/* Halftone texture */}
          <div 
            className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
            style={{
              backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "4px 4px"
            }}
          />

          {/* Hover state */}
          <div className="absolute inset-0 bg-bg/80 opacity-0 group-hover:opacity-100 backdrop-blur-sm transition-all duration-500 flex flex-col items-center justify-center p-6 text-center">
            <span className="text-xs text-muted uppercase tracking-[0.2em] mb-2 transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              {item.category}
            </span>
            <h3 className="font-display italic text-2xl md:text-3xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
              {item.title}
            </h3>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <section ref={containerRef} className="relative min-h-[300vh] bg-bg">
        {/* Pinned Center Content (Layer 1) */}
        <div ref={pinnedRef} className="absolute inset-0 h-screen w-full flex items-center justify-center z-10 pointer-events-none">
          <div className="flex flex-col items-center text-center px-6 pointer-events-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Explorations</span>
              <div className="w-8 h-px bg-stroke" />
            </div>
            
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-6">
              Visual <span className="font-display italic text-text-primary/90">playground</span>
            </h2>
            
            <p className="text-muted md:text-lg max-w-md mx-auto mb-10">
              A space for creative experiments, motion studies, and visual explorations.
            </p>

            <button className="group relative rounded-full px-8 py-4 bg-surface border border-stroke hover:border-transparent transition-colors">
              <span className="absolute inset-[-1px] rounded-full opacity-0 group-hover:opacity-100 accent-gradient transition-opacity -z-10" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-5 h-5 rounded-full bg-[#ea4c89] flex items-center justify-center" />
                <span className="text-sm font-medium">View on Dribbble</span>
                <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-text-primary transition-colors" />
              </div>
            </button>
          </div>
        </div>

        {/* Parallax Columns (Layer 2) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-20">
          <div className="max-w-[1400px] mx-auto w-full h-full relative px-6 md:px-12 pointer-events-auto">
            <div className="grid grid-cols-2 gap-12 md:gap-40 h-full">
              {/* Left Column */}
              <div ref={leftColRef} className="flex flex-col gap-[20vh] pt-[20vh]">
                {EXPLORATIONS.filter((_, i) => i % 2 === 0).map(renderCard)}
                <div className="h-[20vh]" />
              </div>

              {/* Right Column */}
              <div ref={rightColRef} className="flex flex-col gap-[30vh]">
                {EXPLORATIONS.filter((_, i) => i % 2 !== 0).map(renderCard)}
                <div className="h-[40vh]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage}
              alt="Exploration full size"
              className="max-w-full max-h-full w-auto h-auto object-contain aspect-[16/10] rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button 
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <span className="text-xl leading-none">&times;</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
