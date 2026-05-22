import { useEffect, useState, useCallback } from 'react';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Programs from './components/Programs.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Curriculum from './components/Curriculum.jsx';
import Enrollment from './components/Enrollment.jsx';
import FAQ from './components/FAQ.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import FloatingCTA from './components/FloatingCTA.jsx';
import BackToTop from './components/BackToTop.jsx';
import Toast from './components/Toast.jsx';
import AIChat from './components/AIChat.jsx';

export default function App() {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, kind = 'success', duration = 4000) => {
    const id = Date.now();
    setToast({ id, message, kind });
    window.setTimeout(() => {
      setToast((t) => (t && t.id === id ? null : t));
    }, duration);
  }, []);

  // Global reveal-on-scroll observer for any element with class "reveal"
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });

  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <About />
        <Programs />
        <HowItWorks />
        <Curriculum />
        <Enrollment onSubmitSuccess={() => showToast('Opening WhatsApp — your message is ready to send!')} />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingCTA />
      <BackToTop />
      <AIChat />
      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </>
  );
}
