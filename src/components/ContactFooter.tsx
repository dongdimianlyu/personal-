import { useEffect, useRef } from "react";
import Hls from "hls.js";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const HLS_URL = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

export function ContactFooter() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

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
    // GSAP Marquee
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 40,
        repeat: -1,
      });
    }
  }, []);

  return (
    <section className="relative bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden flex flex-col justify-between min-h-screen">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <video
          ref={videoRef}
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1]"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-bg to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* Marquee */}
      <div className="relative mt-20 mb-auto w-full overflow-hidden flex whitespace-nowrap">
        <div ref={marqueeRef} className="flex">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex whitespace-nowrap">
              {[...Array(10)].map((_, j) => (
                <span
                  key={`${i}-${j}`}
                  className="text-5xl md:text-7xl lg:text-8xl font-display italic text-text-primary/10 tracking-tight pr-8"
                >
                  BUILDING THE FUTURE •
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 mt-auto">
        {/* CTA */}
        <div className="flex flex-col items-center text-center mb-24 md:mb-32">
          <p className="text-xl md:text-3xl text-text-primary/80 max-w-2xl mx-auto mb-10 leading-relaxed font-display">
            Have a project in mind? I'm always open to new ideas and collaborations.
          </p>

          <motion.a
            href="dongdimian@gmail.com"
            whileTap={{ scale: 0.97 }}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-bg border-2 border-stroke rounded-full transition-colors hover:border-transparent"
          >
            <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 accent-gradient transition-opacity -z-10" />
            <span className="text-lg font-medium">hello@michaelsmith.com</span>
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </motion.a>
        </div>

        {/* Footer Bar */}
        <div className="border-t border-stroke pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {["Twitter", "LinkedIn", "Dribbble", "GitHub"].map((platform) => (
              <a
                key={platform}
                href="#"
                className="text-sm text-muted hover:text-text-primary transition-all duration-300 hover:-translate-y-0.5"
              >
                {platform}
              </a>
            ))}
          </div>

          {/* Availability */}
          <div className="flex items-center gap-3 bg-surface/50 border border-stroke/50 rounded-full px-4 py-2 backdrop-blur-sm">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </div>
            <span className="text-sm text-muted">Available for projects</span>
          </div>
        </div>
      </div>
    </section>
  );
}
