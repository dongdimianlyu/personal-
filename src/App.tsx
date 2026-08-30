import { useEffect, useState } from "react";
import { LoadingScreen } from "./components/LoadingScreen";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { Stats } from "./components/Stats";
import { GeniusInsights } from "./components/GeniusInsights";
import { ContactFooter } from "./components/ContactFooter";
import { CustomCursor } from "./components/CustomCursor";
import { SmoothScroll } from "./components/SmoothScroll";
import { ScrollRestoration } from "./components/ScrollRestoration";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <SmoothScroll>
      <ScrollRestoration active={!isLoading} />
      <main className="bg-bg min-h-screen text-text-primary">
        <CustomCursor disabled={isLoading} />
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

        <div
          className="transition-opacity duration-1000"
          style={{ opacity: isLoading ? 0 : 1 }}
        >
          <Hero />
          <Projects />
          <Stats />
          <GeniusInsights />
          <ContactFooter />
        </div>
      </main>
    </SmoothScroll>
  );
}

export default App;
