const projects = [
  { title: "Data Analysis", description: "A future project exploring insights from real-world datasets." },
  { title: "Machine Learning", description: "A future project focused on building a simple predictive model." },
];

export default function Home() {
  return (
    <main>
      <header className="header">
        <a className="logo" href="#home">Bheem Chauhan</a>
        <nav aria-label="Main navigation">
          <a className="active" href="#about">About</a>
          <a href="#interests">Interests</a>
          <a href="#tech-stack">Tech Stack</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Connect</a>
        </nav>
      </header>

      <section id="home" className="hero">
        <video className="hero-video" autoPlay loop muted playsInline preload="metadata" aria-hidden="true">
          <source src="/hero-background.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" aria-hidden="true" />
        <p className="label">Bheem Chauhan · Data Science & AI</p>
        <h1>BUILDING WITH<br /><em>DATA &amp; AI.</em></h1>
        <p className="intro">I&apos;m a first-year Data Science and Artificial Intelligence student, learning how to turn ideas into useful technology.</p>
        <a className="button" href="#projects">View projects</a>
      </section>

      <section id="about" className="section about">
        <p className="label">About me</p>
        <h2>CURIOUS. FOCUSED.<br /><em>JUST GETTING STARTED.</em></h2>
        <p>I am Bheem Chauhan, a student interested in data analysis, machine learning and artificial intelligence. This portfolio will grow alongside my learning journey.</p>
      </section>

      <section id="projects" className="section">
        <p className="label">Projects</p>
        <h2>MY WORK.</h2>
        <div className="project-grid">
          {projects.map((project, index) => <article className="project" key={project.title}>
            <span>0{index + 1}</span>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </article>)}
        </div>
      </section>

      <section id="contact" className="contact">
        <p className="label">Contact</p>
        <h2>LET&apos;S CONNECT.</h2>
        <a href="mailto:bheemchauhan@example.com">bheemchauhan@example.com</a>
      </section>
    </main>
  );
}
