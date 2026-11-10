import { useEffect, useState } from 'react';
import CareerNav from './components/CareerNav.jsx';
import ProfilePage from './components/ProfilePage.jsx';
import SvgDefs from './components/SvgDefs.jsx';
import DeepSea from './components/DeepSea.jsx';
import Hero from './components/Hero/Hero.jsx';
import ProcessCard from './components/ProcessCard.jsx';
import ProjectsSection from './components/ProjectsSection.jsx';
import ToolboxSection from './components/ToolboxSection.jsx';
import ContactSection from './components/ContactSection.jsx';
import ShellSection from './components/ShellSection.jsx';
import Otter from './components/Otter.jsx';

export default function App() {
  const [paused, setPaused] = useState(false);
  const [isProfile, setIsProfile] = useState(() => window.location.hash === '#/about');
  useEffect(() => {
    const navigate = () => {
      const about = window.location.hash === '#/about';
      setIsProfile(about);
      requestAnimationFrame(() => {
        if (about) window.scrollTo({ top: 0, behavior: 'instant' });
        else document.getElementById(window.location.hash.slice(1) || 'page')?.scrollIntoView({ behavior: 'instant' });
      });
    };
    window.addEventListener('hashchange', navigate);
    return () => window.removeEventListener('hashchange', navigate);
  }, []);
  if (isProfile) return <div id="page" className="profile-route"><ProfilePage /></div>;
  return (
    <div id="page">
      <CareerNav paused={paused} setPaused={setPaused} />
      <SvgDefs />
      <DeepSea />
      <Hero />
      <main className="sea" id="sea">
        <section>
          <div className="inner">
            <ProjectsSection />
          </div>
        </section>
        <section id="approach"><div className="inner"><ProcessCard /></div></section>
        <ToolboxSection />
        <ContactSection />
        <ShellSection />
      </main>
      {!paused && <Otter />}
    </div>
  );
}
