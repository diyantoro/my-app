import './App.css';
import { useEffect, useState, FormEvent, ChangeEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSocialPopupOpen, setIsSocialPopupOpen] = useState<boolean>(false);

  // Form handling
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  useEffect(() => {
    // Simulate loading
    const loadingTimer = setTimeout(() => setIsLoading(false), 1500);

    // Close social popup when clicking outside
    const handleClickOutside = (event: MouseEvent): void => {
      const popup = document.querySelector('.social-popup');
      const socialBtn = document.querySelector('.social-btn');
      if (popup && !popup.contains(event.target as Node) && !socialBtn?.contains(event.target as Node)) {
        setIsSocialPopupOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside as EventListener);

    // Smooth scrolling for navigation links
    const handleNavClick = (e: Event): void => {
      e.preventDefault();
      const target = e.currentTarget as HTMLAnchorElement;
      const targetId = target.getAttribute('href')?.substring(1);
      const targetSection = targetId ? document.getElementById(targetId) : null;
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
      }
    };

    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', handleNavClick as EventListener);
    });

    // Active section detection
    const handleScroll = (): void => {
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 150 && 
            window.scrollY < sectionTop + sectionHeight - 150) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    // Scroll reveal animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = (): void => {
      revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
          element.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // Cleanup function
    return () => {
      clearTimeout(loadingTimer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', revealOnScroll);
      navLinks.forEach(link => {
        link.removeEventListener('click', handleNavClick as EventListener);
      });
      document.removeEventListener('mousedown', handleClickOutside as EventListener);
    };
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>): void => {
    const img = e.currentTarget;
    img.onerror = null as any;
    img.src = 'https://via.placeholder.com/200x200?text=Profile+Photo';
  };

  return (
    <div className="App">
      {isLoading ? (
        <div className="loader">
          <div className="loader-content">
            <div className="spinner"></div>
            <p>Loading amazing stuff...</p>
          </div>
        </div>
      ) : null}

      <nav className={isMenuOpen ? 'mobile-open' : ''}>
        <div className="nav-content">
          <div className="logo">
            <a href="#home">Portofolio Diyantoro</a>
          </div>
          <div className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <ul className="nav-links">
            <li><a href="#home" className={activeSection === 'home' ? 'active' : ''}>Home</a></li>
            <li><a href="#about" className={activeSection === 'about' ? 'active' : ''}>About</a></li>
            <li><a href="#projects" className={activeSection === 'projects' ? 'active' : ''}>Projects</a></li>
            <li><a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>Contact</a></li>
          </ul>
        </div>
      </nav>

      <section id="home" className="hero">
        <div className="hero-grid reveal">
          <div className="hero-text">
            <h1 className="typing-effect">Hi, I'm Diyantoro </h1>
            <p className="profession">Front-end Developer & UI/UX Designer</p>
            <div className="description">
              <p>Passionate about creating beautiful and functional web experiences. 
                 Specializing in modern web technologies and creative design solutions.</p>
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">1+</span>
                  <span className="stat-label">Years Experience</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Projects Completed</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">30+</span>
                  <span className="stat-label">Happy Clients</span>
                </div>
              </div>
            </div>
            <div className="hero-buttons">
              <a href="#projects" className="cta-button">View My Work</a>
              <a href="#contact" className="cta-button secondary">Get in Touch</a>
            </div>
          </div>
          <div className="hero-profile">
            <div className="profile-card">
              <div className="profile-photo">
                <img 
                  src="/images/profile.jpg" 
                  alt="Diyantoro"
                  onError={handleImageError}
                />
              </div>
              <div className="profile-info">
                <h2>[Diyantoro]</h2>
                <p className="profile-title">Front-end Developer</p>
                <div className="profile-details">
                  <div className="detail-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>[Palembang]</span>
                  </div>
                  <div className="detail-item">
                    <i className="fas fa-briefcase"></i>
                    <span>Available for Freelance</span>
                  </div>
                </div>
                <div className="profile-buttons">
                  <div className="social-button-container">
                    <button 
                      className={`connect-button social-btn ${isSocialPopupOpen ? 'active' : ''}`}
                      onClick={() => setIsSocialPopupOpen(!isSocialPopupOpen)}
                    >
                      <i className="fas fa-share-alt"></i>
                      Social Media
                    </button>
                    <div className={`social-popup ${isSocialPopupOpen ? 'active' : ''}`}>
                      <div className="social-grid">
                        <a 
                          href="https://github.com/diyantoro" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="social-item github"
                        >
                          <i className="fab fa-github"></i>
                          <span>GitHub</span>
                        </a>
                        <a 
                          href="https://linkedin.com/in/diyantoro" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="social-item linkedin"
                        >
                          <i className="fab fa-linkedin"></i>
                          <span>LinkedIn</span>
                        </a>
                        <a 
                          href="https://twitter.com/yourusername" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="social-item twitter"
                        >
                          <i className="fab fa-twitter"></i>
                          <span>Twitter</span>
                        </a>
                        <a 
                          href="https://instagram.com/diyyant_" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="social-item instagram"
                        >
                          <i className="fab fa-instagram"></i>
                          <span>Instagram</span>
                        </a>
                        <a 
                          href="mailto:your.diyantoro225@gmail.com" 
                          className="social-item email"
                        >
                          <i className="fas fa-envelope"></i>
                          <span>Email</span>
                        </a>
                        <a 
                          href="https://wa.me/085758374175" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="social-item whatsapp"
                        >
                          <i className="fab fa-whatsapp"></i>
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <button 
                    className="connect-button contact-btn"
                    onClick={() => {
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    <i className="fas fa-envelope"></i>
                    Contact Me
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="about">
        <div className="about-content reveal">
          <h2>About Me</h2>
          <div className="about-grid">
            <div className="about-text">
              <p className="bio">
                I'm a passionate developer with experience in creating modern web applications. 
                I specialize in React, JavaScript, HTML5, and CSS3. With a keen eye for design
                and a love for clean code, I build engaging digital experiences.
              </p>
              <div className="personal-info">
                <div className="info-item">
                  <span className="label">Name:</span>
                  <span className="value">[Diyantoro]</span>
                </div>
                <div className="info-item">
                  <span className="label">Email:</span>
                  <span className="value">your.email@example.com</span>
                </div>
                <div className="info-item">
                  <span className="label">Location:</span>
                  <span className="value">[Palembang]</span>
                </div>
                <div className="info-item">
                  <span className="label">Available for:</span>
                  <span className="value">Freelance & Full-time</span>
                </div>
              </div>
              <a href="/your-resume.pdf" className="download-cv" target="_blank" rel="noopener noreferrer">
                Download CV <i className="fas fa-download"></i>
              </a>
            </div>
            <div className="skills-section">
              <h3>My Skills</h3>
              <div className="skill-bars">
                <div className="skill-bar">
                  <div className="skill-info">
                    <span>React</span>
                    <span>90%</span>
                  </div>
                  <div className="skill-progress">
                    <div className="progress" style={{width: '90%'}}></div>
                  </div>
                </div>
                <div className="skill-bar">
                  <div className="skill-info">
                    <span>JavaScript</span>
                    <span>85%</span>
                  </div>
                  <div className="skill-progress">
                    <div className="progress" style={{width: '85%'}}></div>
                  </div>
                </div>
                <div className="skill-bar">
                  <div className="skill-info">
                    <span>HTML/CSS</span>
                    <span>95%</span>
                  </div>
                  <div className="skill-progress">
                    <div className="progress" style={{width: '95%'}}></div>
                  </div>
                </div>
                <div className="skill-bar">
                  <div className="skill-info">
                    <span>UI/UX Design</span>
                    <span>80%</span>
                  </div>
                  <div className="skill-progress">
                    <div className="progress" style={{width: '80%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="projects">
        <h2>My Projects</h2>
        <div className="projects-grid">
          <div className="project-card reveal">
            <div className="project-image"></div>
            <h3>Project 1</h3>
            <p>A responsive web application built with React</p>
            <div className="project-links">
              <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="button">View Live</a>
              <a href="https://github.com/diyantoro" target="_blank" rel="noopener noreferrer" className="button">GitHub</a>
            </div>
          </div>
          <div className="project-card reveal">
            <div className="project-image"></div>
            <h3>Project 2</h3>
            <p>An interactive dashboard with data visualization</p>
            <div className="project-links">
              <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="button">View Live</a>
              <a href="https://github.com/diyantoro" target="_blank" rel="noopener noreferrer" className="button">GitHub</a>
            </div>
          </div>
          <div className="project-card reveal">
            <div className="project-image"></div>
            <h3>Project 3</h3>
            <p>A modern e-commerce platform</p>
            <div className="project-links">
              <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="button">View Live</a>
              <a href="https://github.com/diyantoro" target="_blank" rel="noopener noreferrer" className="button">GitHub</a>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="contact-content reveal">
          <h2>Contact Me</h2>
          <form id="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              value={formData.name}
              onChange={handleFormChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleFormChange}
            />
            <textarea
              name="message"
              placeholder="Message"
              required
              value={formData.message}
              onChange={handleFormChange}
            ></textarea>
            <button type="submit" className="submit-button">Send Message</button>
          </form>
        </div>
      </section>

      <footer>
        <p>&copy; 2025 My Portfolio. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
