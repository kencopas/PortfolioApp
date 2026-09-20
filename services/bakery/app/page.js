const Logo = ({ className = "", decorative = false }) => (
  <img className={className} src="/logo-circle.png" alt={decorative ? "" : "Velvet Paw Bakery cat and coffee cup logo"} width="1024" height="1024" />
);

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Velvet Paw Bakery home">
          <Logo decorative className="header-logo" />
          <span>Velvet Paw <small>Bakery</small></span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact <span aria-hidden="true">↗</span></a>
        </nav>
      </header>
      <main id="main">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">Welcome to Velvet Paw Bakery</p>
            <h1 id="hero-title">A little sweetness.<br /><em>A little everyday joy.</em></h1>
            <p className="intro">Homemade baked goods in Westchase, Florida. Find us under our pop-up tent at local markets, or get in touch about local delivery.</p>
            <a className="button" href="#about">Meet Velvet Paw <span aria-hidden="true">↗</span></a>
          </div>
          <div className="hero-art">
            <Logo className="hero-logo" />
            <p className="art-caption">Velvet Paw <span>Bakery</span></p>
          </div>
        </section>
        <div className="welcome-strip" aria-hidden="true"><span>Make room for a sweet moment</span><span>✳</span><span>Westchase, Florida</span><span>✳</span><span>Local delivery &amp; market pop-ups</span></div>
        <section className="about section" id="about" aria-labelledby="about-title">
          <div><p className="eyebrow">A little about us</p><h2 id="about-title">Hello from<br /><em>Velvet Paw.</em></h2></div>
          <div className="about-copy">
            <p className="large-copy">Meet Taylor, the baker. And Tea, the cat behind the logo.</p>
            <p>Velvet Paw Bakery is a home bakery serving the Westchase, Florida community. Taylor Driver makes our homemade baked goods under Florida’s cottage food law. Her cat Tea is our mascot and the familiar face in our logo.</p>
            <p>We deliver locally and sell at markets from our pop-up tent. Follow us on Instagram and TikTok for updates, or contact Ken to ask about delivery and where to find us next.</p>
            <div className="small-note"><span aria-hidden="true">✳</span><p>Our menu is still in the making.<br />Watch this space for what’s next.</p></div>
          </div>
        </section>
        <section className="contact section" id="contact" aria-labelledby="contact-title">
          <div><p className="eyebrow">Say hello</p><h2 id="contact-title">Let’s stay<br /><em>in touch.</em></h2><p>Questions about our baked goods, local delivery, or market appearances? Ken is your person.</p></div>
          <div className="contact-card">
            <span className="contact-label">Contact Velvet Paw Bakery</span>
            <h3>Ken Copas</h3>
            <dl className="contact-details">
              <div><dt>Email</dt><dd><a href="mailto:kenny@copas.net">kenny@copas.net</a></dd></div>
              <div><dt>Phone</dt><dd><a href="tel:+17402722433">(740) 272-2433</a></dd></div>
              <div><dt>Our community</dt><dd>Westchase, Florida</dd></div>
            </dl>
            <div className="social-links" aria-label="Social media">
              <a href="https://www.instagram.com/velvetpawbakery/">Instagram ↗</a>
              <a href="https://www.tiktok.com/@velvetpawbakery">TikTok ↗</a>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer"><a className="footer-brand" href="#home">Velvet Paw Bakery</a><p>A little patience. A little sweetness.</p><a href="#home">Back to top ↑</a></footer>
    </>
  );
}
