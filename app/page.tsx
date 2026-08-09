"use client";

import { useEffect, useRef, useState } from "react";

const projects = [
  { title: "Data Analysis", description: "A future project exploring insights from real-world datasets." },
  { title: "Machine Learning", description: "A future project focused on building a simple predictive model." },
];

const interests = ["Artificial Intelligence", "Data Analysis", "Machine Learning"];
const techStack = ["Python", "SQL", "Pandas", "NumPy", "Scikit-learn", "Git"];
const batmanQuotes = [
  "I am vengeance. I am the night. I am Batman!",
  "It's not who I am underneath, but what I do that defines me.",
  "Fear is a tool. When that light hits the sky, it's not just a call. It's a warning.",
  "I won't kill you, but I don't have to save you.",
  "They think I'm hiding in the shadows. But I am the shadows.",
  "Tell me... do you bleed? You will.",
  "If I allow myself to go down into that place... I'll never come back.",
  "I will never stop trying. Because every time I save one person, I defeat you.",
];

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const companionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const introTimer = window.setTimeout(() => setShowIntro(false), 12000);
    return () => window.clearTimeout(introTimer);
  }, []);

  useEffect(() => {
    if (!showIntro) {
      void audioRef.current?.play().catch(() => undefined);
    }
  }, [showIntro]);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || !companionRef.current) return;

    const companion = companionRef.current;
    let targetX = -80;
    let targetY = -80;
    let currentX = -80;
    let currentY = -80;
    let frameId = 0;

    const followCursor = (event: PointerEvent) => {
      targetX = event.clientX + 18;
      targetY = event.clientY + 16;
      companion.style.opacity = "1";
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.14;
      currentY += (targetY - currentY) * 0.14;
      companion.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      frameId = window.requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", followCursor, { passive: true });
    frameId = window.requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("pointermove", followCursor);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return <>
    <audio ref={audioRef} preload="auto"><source src="/im-batman.mp3" type="audio/mpeg" /></audio>
    <div className="cursor-companion" ref={companionRef} aria-hidden="true"><svg viewBox="0 0 44 40" shapeRendering="crispEdges"><path fill="#e9e7df" d="M9 8h6V3h5v5h5V3h5v5h6v5h3v17h-5v5h-8v3H17v-3H9v-5H5V13h4Z" /><path fill="#e9e7df" d="M36 19h5v5h3v7h-8Z" /><path fill="#151515" d="M15 17h4v5h-4Zm11 0h4v5h-4Zm-7 9h7v3h-7Z" /><path fill="#f3c622" d="M21 23h3v3h-3Z" /></svg></div>
    {showIntro && <section className="intro-screen" aria-label="Welcome to Bheem Chauhan's portfolio">
      <video className="intro-video" autoPlay muted playsInline preload="auto" onEnded={() => setShowIntro(false)} onError={() => setShowIntro(false)}>
        <source src="/batman-intro.mp4" type="video/mp4" />
      </video>
    </section>}
    <div className="bat-swarm" aria-hidden="true">{Array.from({ length: 8 }, (_, index) => <svg className={`roaming-bat bat-${index + 1}`} viewBox="0 0 64 32" shapeRendering="crispEdges" key={index}><path d="M1 10h8V6h7v4h8V4h7v7h2V4h7v6h8V6h7v4h8v8h-9v4h-9v4h-7v4h-8v-4h-7v-4h-9v-4H1Z" /></svg>)}</div>
    <main>
      <header className="header">
        <div className="batmobile-lane" aria-hidden="true"><img src="/batmobile.png" alt="" /></div>
        <a className="logo" href="#home">Bheem Chauhan</a>
        <button className="menu-toggle" type="button" aria-label="Toggle navigation" aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span /><span />
        </button>
        <nav className={mobileMenuOpen ? "is-open" : ""} aria-label="Main navigation" onClick={() => setMobileMenuOpen(false)}>
          <a href="#about">About</a>
          <a href="#interests">Interests</a>
          <a href="#tech-stack">Tech Stack</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Connect</a>
        </nav>
      </header>

      <section id="home" className="hero">
        <video className="hero-video" autoPlay loop muted playsInline preload="metadata" aria-hidden="true"><source src="/hero-background.mp4" type="video/mp4" /></video>
        <div className="hero-overlay" aria-hidden="true" />
        <p className="label">Bheem Chauhan &middot; Data Science &amp; AI</p>
        <h1>BUILDING WITH<br /><em>DATA &amp; AI.</em></h1>
        <p className="intro">I&apos;m a first-year Data Science and Artificial Intelligence student, learning how to turn ideas into useful technology.</p>
        <a className="button" href="#projects">View projects</a>
      </section>

      <section id="about" className="section about"><p className="label">About me</p><h2>CURIOUS. FOCUSED.<br /><em>JUST GETTING STARTED.</em></h2><p>I am Bheem Chauhan, a student interested in data analysis, machine learning and artificial intelligence. This portfolio will grow alongside my learning journey.</p></section>
      <section id="interests" className="section"><p className="label">Interests</p><h2>WHAT DRIVES<br /><em>MY CURIOSITY.</em></h2><div className="interest-grid">{interests.map((interest, index) => <article key={interest}><span>0{index + 1}</span><h3>{interest}</h3></article>)}</div></section>
      <section id="tech-stack" className="section tech-stack"><p className="label">Tech Stack</p><h2>TOOLS I&apos;M<br /><em>LEARNING.</em></h2><div className="tech-list">{techStack.map((tool) => <span key={tool}>{tool}</span>)}</div></section>
      <section id="projects" className="section"><p className="label">Projects</p><h2>MY WORK.</h2><div className="project-grid">{projects.map((project, index) => <article className="project" key={project.title}><span>0{index + 1}</span><h3>{project.title}</h3><p>{project.description}</p></article>)}</div></section>
      <section id="contact" className="contact"><video className="contact-video" autoPlay loop muted playsInline preload="metadata" aria-hidden="true"><source src="/connect-background.mp4" type="video/mp4" /></video><div className="contact-overlay" aria-hidden="true" /><p className="label">Connect</p><h2>LET&apos;S CONNECT.</h2><div className="connect-grid">
        <a className="connect-card" href="mailto:mannurajputxx@gmail.com" aria-label="Send Bheem an email"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg><span>Email</span></a>
        <a className="connect-card" href="https://github.com/mannurajputxx" target="_blank" rel="noreferrer" aria-label="Visit Bheem's GitHub"><svg className="github-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5a9.5 9.5 0 0 0-3 18.5c.47.09.65-.2.65-.46v-1.8c-2.65.58-3.2-1.12-3.2-1.12-.43-1.1-1.06-1.39-1.06-1.39-.87-.59.07-.58.07-.58.96.07 1.47.99 1.47.99.86 1.47 2.24 1.05 2.79.8.08-.62.34-1.05.61-1.3-2.12-.24-4.35-1.06-4.35-4.72 0-1.04.37-1.9.98-2.56-.1-.24-.43-1.21.09-2.52 0 0 .8-.26 2.61.98a9.05 9.05 0 0 1 4.75 0c1.82-1.24 2.61-.98 2.61-.98.52 1.31.19 2.28.1 2.52.61.66.97 1.52.97 2.56 0 3.67-2.24 4.47-4.37 4.71.34.3.65.89.65 1.79v2.65c0 .26.17.56.65.46A9.5 9.5 0 0 0 12 2.5Z" /></svg><span>GitHub</span></a>
        <a className="connect-card" href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="Visit LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="9" width="3" height="11" rx=".5" /><circle cx="5.5" cy="5.5" r="1.5" /><path d="M10 20v-6.2c0-1.8 1.1-3.1 2.8-3.1s2.8 1.3 2.8 3.1V20M10 14v6M15.6 14v6" /></svg><span>LinkedIn</span></a>
        <a className="connect-card" href="https://www.instagram.com/bheem_chauhan98/" target="_blank" rel="noreferrer" aria-label="Visit Bheem's Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.8" r="1" fill="currentColor" stroke="none" /></svg><span>Instagram</span></a>
        <a className="connect-card" href="https://x.com/bheemchauhan98" target="_blank" rel="noreferrer" aria-label="Visit Bheem on X"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4 19 20M19 4 5 20" /></svg><span>X / Twitter</span></a>
      </div></section>
      <section className="quote-wall" aria-label="Batman quotes"><div className="quote-window"><div className="quote-track">{[...batmanQuotes, ...batmanQuotes].map((quote, index) => <p className="quote-card" key={`${quote}-${index}`}>“{quote}”</p>)}</div></div></section>
    </main>
  </>;
}
