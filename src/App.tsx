import { useState } from "react";
import { LoadingScreen } from "./components/LoadingScreen";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { Stats } from "./components/Stats";
import { ContactFooter } from "./components/ContactFooter";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="bg-bg min-h-screen text-text-primary">
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
  );
}

export default App;
