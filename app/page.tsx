"use client";

import { useEffect, useRef, useState } from "react";

const projects = [
  { title: "Data Analysis", description: "A future project exploring insights from real-world datasets." },
  { title: "Machine Learning", description: "A future project focused on building a simple predictive model." },
];

const interests = ["Artificial Intelligence", "Data Analysis", "Machine Learning"];
const techStack = ["Python", "SQL", "Pandas", "NumPy", "Scikit-learn", "Git"];

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const introTimer = window.setTimeout(() => setShowIntro(false), 12000);
    return () => window.clearTimeout(introTimer);
  }, []);

  useEffect(() => {
    if (!showIntro) {
      void audioRef.current?.play().catch(() => undefined);
    }
  }, [showIntro]);

  return <>
    <audio ref={audioRef} preload="auto"><source src="/im-batman.mp3" type="audio/mpeg" /></audio>
    {showIntro && <section className="intro-screen" aria-label="Welcome to Bheem Chauhan's portfolio">
      <video className="intro-video" autoPlay muted playsInline preload="auto" onEnded={() => setShowIntro(false)} onError={() => setShowIntro(false)}>
        <source src="/batman-intro.mp4" type="video/mp4" />
      </video>
    </section>}
    <div className="bat-swarm" aria-hidden="true">{Array.from({ length: 8 }, (_, index) => <svg className={`roaming-bat bat-${index + 1}`} viewBox="0 0 180 100" key={index}><path d="M8 47 29 35l-3 20 21-7 13-27 12 18 18-11 18 11 12-18 13 27 21 7-3-20 21 12-23 12 10 21-32-6-16 14-16-14-32 6 10-21Z" /></svg>)}</div>
    <main>
      <header className="header">
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
      <section id="contact" className="contact"><p className="label">Connect</p><h2>LET&apos;S CONNECT.</h2><a href="mailto:bheemchauhan@example.com">bheemchauhan@example.com</a></section>
    </main>
  </>;
}
