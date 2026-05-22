import { useEffect, useState } from 'react';
import { IconArrowUp } from './Icons.jsx';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`back-to-top ${visible ? 'visible' : ''}`}
      onClick={handleClick}
      aria-label="Back to top"
    >
      <IconArrowUp width={20} height={20} />
    </button>
  );
}
