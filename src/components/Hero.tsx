import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ROLES = ["Archetypal Genius", "Landlord", "Extraordinary Man"];
const HLS_URL = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

const LINKEDIN_URL = "https://www.linkedin.com/in/jiarenlyu";
const EMAIL = "jiarenlyu@gmail.com";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  useEffect(() => {
    // HLS Video Setup
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({
        startPosition: -1,
        capLevelToPlayerSize: true,
      });
      hls.loadSource(HLS_URL);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => console.log("Autoplay prevented"));
      });
      return () => hls.destroy();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = HLS_URL;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch(() => console.log("Autoplay prevented"));
      });
    }
  }, []);

  useEffect(() => {
    // Role cycling
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Scroll listener for navbar
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      ".name-reveal",
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.8, delay: 0.2 }
    ).fromTo(
      ".blur-in",
      { opacity: 0, filter: "blur(12px)", y: 30 },
      { opacity: 1, filter: "blur(0px)", y: 0, duration: 1.4, stagger: 0.18 },
      "-=1.2"
    );
  }, []);

  const handleReachOut = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const scrollToSection = (selector: string) => {
    const element = document.querySelector(selector);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
        <div
          className={cn(
            "inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-shadow duration-300",
            isScrolled && "shadow-md shadow-black/10"
          )}
        >
          {/* Logo */}
          <div className="group relative w-9 h-9 rounded-full cursor-pointer flex items-center justify-center transition-transform hover:scale-110">
            <div className="absolute inset-0 rounded-full accent-gradient group-hover:animate-gradient-shift" />
            <div className="absolute inset-[1.5px] bg-bg rounded-full flex items-center justify-center">
              <span className="font-display italic text-[13px] leading-none">JA</span>
            </div>
          </div>

          <div className="hidden md:block w-px h-5 bg-stroke mx-3" />

          {/* Links */}
          <div className="flex items-center gap-1 mx-2">
            {[
              { label: "Home", href: "#" },
              { label: "Work", href: "#work" },
              { label: "Resume", href: "#resume" }
            ].map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  if (link.href.startsWith("#")) {
                    e.preventDefault();
                    if (link.href === "#") {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    } else {
                      scrollToSection(link.href);
                    }
                  }
                }}
                className={cn(
                  "text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors",
                  i === 0
                    ? "text-text-primary bg-stroke/50"
                    : "text-muted hover:text-text-primary hover:bg-stroke/50"
                )}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="w-px h-5 bg-stroke mx-2" />

          {/* Say Hi Button */}
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2"
          >
            <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 accent-gradient transition-opacity" />
            <div className="relative flex items-center gap-1.5 bg-surface rounded-full backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 text-text-primary">
              Say hi <ArrowUpRight className="w-3 h-3" />
            </div>
          </a>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 mt-20">
        <div className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8">
          COLLECTION '26
        </div>
        
        <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6">
          Jiaren
        </h1>
        
        <div className="blur-in text-xl md:text-2xl lg:text-3xl text-text-primary/90 mb-6 flex items-center gap-2">
          A <span key={roleIndex} className="font-display italic text-text-primary animate-role-fade-in inline-block min-w-[120px] text-left">{ROLES[roleIndex]}</span> who will change the trajectory our species
        </div>
        
        <p className="blur-in text-sm md:text-base text-muted max-w-md mb-12">
         "Rather than fame, than money, than power, give me truth"
        </p>
        
        <div className="blur-in flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => scrollToSection("#work")}
            className="group relative rounded-full text-sm px-7 py-3.5 bg-text-primary text-bg hover:text-text-primary transition-all hover:scale-105 overflow-hidden"
          >
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 accent-gradient transition-opacity" />
            <span className="absolute inset-[2px] bg-bg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 font-medium">See Works</span>
          </button>
          
          <button
            type="button"
            onClick={handleReachOut}
            className="group relative rounded-full text-sm px-7 py-3.5 border-2 border-stroke bg-bg text-text-primary hover:border-transparent transition-all hover:scale-105 overflow-hidden min-w-[140px]"
          >
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 accent-gradient transition-opacity" />
            <span className="absolute inset-[2px] bg-bg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 font-medium">
              {emailCopied ? "Copied!" : "Reach out..."}
            </span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <span className="text-xs text-muted uppercase tracking-[0.2em]">SCROLL</span>
        <div className="w-px h-10 bg-stroke overflow-hidden relative">
          <div className="absolute top-0 w-full h-full bg-text-primary/50 animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
