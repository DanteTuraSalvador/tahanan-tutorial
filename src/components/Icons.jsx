// Shared inline SVG icon components — consistent sizing & stroke
const baseProps = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
};

export const IconCheck   = (p) => (<svg {...baseProps} {...p}><path d="M20 7L9 18l-5-5" /></svg>);
export const IconMenu    = (p) => (<svg {...baseProps} strokeWidth={2.5} {...p}><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="17" x2="21" y2="17"/></svg>);
export const IconClose   = (p) => (<svg {...baseProps} strokeWidth={2.5} {...p}><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>);
export const IconUser    = (p) => (<svg {...baseProps} {...p}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>);
export const IconTarget  = (p) => (<svg {...baseProps} {...p}><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M22 12h-3M5 12H2"/></svg>);
export const IconHeart   = (p) => (<svg {...baseProps} {...p}><path d="M12 21s-7-4.5-7-10a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 5.5-7 10-7 10z"/></svg>);
export const IconPencil  = (p) => (<svg {...baseProps} {...p}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4z"/></svg>);
export const IconCircleCheck = (p) => (<svg {...baseProps} {...p}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>);
export const IconHome    = (p) => (<svg {...baseProps} {...p}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>);
export const IconBook    = (p) => (<svg {...baseProps} {...p}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>);
export const IconStar    = (p) => (<svg {...baseProps} {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>);
export const IconPin     = (p) => (<svg {...baseProps} {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>);
export const IconPhone   = (p) => (<svg {...baseProps} {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>);
export const IconFacebook= (p) => (<svg {...baseProps} {...p}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>);
export const IconClock   = (p) => (<svg {...baseProps} {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>);
export const IconMail    = (p) => (<svg {...baseProps} {...p}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>);
export const IconArrowUp = (p) => (<svg {...baseProps} strokeWidth={2.6} {...p}><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>);
export const IconWhatsApp= (p) => (<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.8-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.3 0-.5 0-.1-.6-1.5-.9-2-.2-.5-.4-.4-.6-.5-.1 0-.3 0-.5 0s-.5.1-.7.3c-.3.3-1 .9-1 2.3s1 2.7 1.1 2.9c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.1L2 22l5-1.4c1.4.8 3 1.2 4.7 1.2h.3c5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg>);
