import { useEffect, useState } from "react";
import { LoadingScreen } from "./components/LoadingScreen";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { Stats } from "./components/Stats";
import { ContactFooter } from "./components/ContactFooter";
import { CustomCursor } from "./components/CustomCursor";
import { SmoothScroll } from "./components/SmoothScroll";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      window.scrollTo(0, 0);
    }
  }, [isLoading]);

  return (
    <SmoothScroll>
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
          <ContactFooter />
        </div>
      </main>
    </SmoothScroll>
  );
}

export default App;
