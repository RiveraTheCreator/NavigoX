"use client";
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, X, Loader2 } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

gsap.registerPlugin(ScrollTrigger);

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Reusable Button Component
const Button = ({ children, className, variant = 'primary', ...props }) => {
  const base = "magnetic-btn relative inline-flex items-center justify-center px-8 py-4 rounded-full font-sans font-semibold text-sm tracking-wide z-10 transition-colors";
  
  const variants = {
    primary: "bg-accent text-white hover:text-white",
    secondary: "bg-primary text-background hover:text-white",
    outline: "bg-transparent border border-primary/20 text-primary hover:text-background",
  };

  const bgVariants = {
    primary: "bg-primary",
    secondary: "bg-accent",
    outline: "bg-primary",
  };

  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      <span className={cn("hover-slide-bg -z-10 rounded-full", bgVariants[variant])}></span>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
};

// Navbar "La Isla Flotante"
const Navbar = ({ onOpenModal }) => {
  const navRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: "top -80",
        end: 99999,
        toggleClass: { className: 'nav-scrolled', targets: navRef.current },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <nav ref={navRef} className="fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 rounded-[2rem] px-6 py-4 flex items-center justify-between w-[90%] max-w-5xl 
      [&.nav-scrolled]:bg-background/60 [&.nav-scrolled]:backdrop-blur-xl [&.nav-scrolled]:border [&.nav-scrolled]:border-primary/10 [&.nav-scrolled]:shadow-lg
      text-background [&.nav-scrolled]:text-primary mix-blend-difference [&.nav-scrolled]:mix-blend-normal">
      <div className="link-hover cursor-pointer">
        <img src="/logo.svg" alt="NavigoX" className="h-16 md:h-20 w-auto drop-shadow-lg" />
      </div>
      <div className="hidden md:flex items-center gap-8 font-sans text-sm font-medium">
        <a href="#caracteristicas" className="link-hover opacity-80 hover:opacity-100">Características</a>
        <a href="#filosofia" className="link-hover opacity-80 hover:opacity-100">Filosofía</a>
        <a href="#protocolo" className="link-hover opacity-80 hover:opacity-100">Protocolo</a>
      </div>
      <Button variant="primary" className="py-2.5 px-6 mix-blend-normal !text-white" onClick={onOpenModal}>Unirse a la espera</Button>
    </nav>
  );
};

// Hero "El Plano de Apertura"
const Hero = ({ onOpenModal }) => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.hero-elem', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.2
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[100dvh] w-full flex items-end pb-24 md:pb-32 px-6 md:px-12 rounded-b-[3rem] overflow-hidden bg-primary">
      {/* Background Image: organic texture, local connection, markets */}
      <img src="https://images.unsplash.com/photo-1518182170546-076616fdcbdd?auto=format&fit=crop&q=80&w=2000" alt="Local Connection" className="absolute inset-0 w-full h-full object-cover opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent"></div>
      
      <div className="relative z-10 max-w-4xl w-full flex flex-col items-start text-left">
        <h1 className="flex flex-col gap-2 mb-8">
          <span className="hero-elem font-sans font-bold text-4xl md:text-6xl text-surface tracking-tight">La conexión local es</span>
          <span className="hero-elem font-drama italic text-7xl md:text-9xl text-background leading-[0.8] pr-4">auténtica.</span>
        </h1>
        <p className="hero-elem text-surface/80 max-w-xl text-lg md:text-xl font-body mb-10 leading-relaxed text-balance">
          NavigoX recomienda, reserva, cobra, liquida y aprende, conectando al turista con el factor humano y los operadores locales directamente desde tu recepción.
        </p>
        <div className="hero-elem">
          <Button variant="primary" className="text-lg px-10 py-5" onClick={onOpenModal}>
            Unirse a la lista de espera <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

// Features "Artefactos Funcionales Interactivos"
const DiagnosticsShuffle = () => {
  const [cards, setCards] = useState([
    { id: 1, text: "Recomienda via WhatsApp" },
    { id: 2, text: "Reserva Instantánea" },
    { id: 3, text: "Liquidación Automática" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const newArr = [...prev];
        const last = newArr.pop();
        newArr.unshift(last);
        return newArr;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-64 w-full flex items-center justify-center">
      {cards.map((card, idx) => {
        return (
          <div 
            key={card.id}
            className="absolute bg-background border border-primary/10 rounded-2xl p-6 shadow-sm flex items-center justify-center w-[80%] text-center transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{
              transform: `translateY(${idx * 16}px) scale(${1 - idx * 0.05})`,
              zIndex: 3 - idx,
              opacity: 1 - idx * 0.2
            }}
          >
            <span className="font-sans font-medium text-primary/80">{card.text}</span>
          </div>
        );
      })}
    </div>
  );
};

const TypewriterCard = () => {
  const text = "> Buscando anfitriones...\n> Conectando experiencias...\n> Factor humano activado.";
  const [displayed, setDisplayed] = useState("");
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-64 bg-primary rounded-2xl p-6 relative overflow-hidden flex flex-col justify-end group">
      <div className="absolute top-4 right-4 flex items-center gap-2 bg-background/10 px-3 py-1 rounded-full border border-background/20">
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
        <span className="text-[10px] uppercase tracking-wider text-surface font-sans font-semibold">Feed en Vivo</span>
      </div>
      <pre className="font-mono-data text-surface/90 text-sm whitespace-pre-wrap leading-relaxed">
        {displayed}<span className="inline-block w-2 h-4 bg-accent ml-1 animate-pulse translate-y-1"></span>
      </pre>
    </div>
  );
};

const CursorGrid = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      
      gsap.set('.sim-cursor', { x: 20, y: 20, opacity: 0 });
      gsap.set('.grid-cell', { backgroundColor: 'transparent' });
      gsap.set('.sim-btn', { scale: 1 });
      
      tl.to('.sim-cursor', { opacity: 1, duration: 0.3 })
        .to('.sim-cursor', { x: 120, y: 80, duration: 1, ease: 'power2.inOut' })
        .to('.sim-cursor', { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
        .to('.cell-target', { backgroundColor: 'rgb(var(--color-accent) / 0.2)', borderColor: 'rgb(var(--color-accent))', duration: 0.2 }, "-=0.1")
        .to('.sim-cursor', { x: 220, y: 160, duration: 0.8, ease: 'power2.inOut', delay: 0.2 })
        .to('.sim-cursor', { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
        .to('.sim-btn', { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 }, "-=0.1")
        .to('.sim-cursor', { opacity: 0, duration: 0.3, delay: 0.5 });
        
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="h-64 bg-surface rounded-2xl p-6 relative overflow-hidden flex flex-col border border-primary/5">
      <div className="grid grid-cols-5 gap-2 flex-1 mb-4">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className={cn("grid-cell border border-primary/10 rounded-md", i === 7 ? "cell-target" : "")}></div>
        ))}
      </div>
      <div className="flex justify-end">
        <div className="sim-btn bg-primary text-background text-xs px-4 py-2 rounded-lg font-sans font-medium">Liquidar</div>
      </div>
      <svg className="sim-cursor absolute top-0 left-0 w-6 h-6 text-accent drop-shadow-md z-10" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4 2.5l14.4 9.6-6 1.5 3.3 6.6-2.7 1.3-3.3-6.6-4.5 4.5V2.5z" stroke="white" strokeWidth="1" />
      </svg>
    </div>
  );
};

const Features = () => {
  return (
    <section id="caracteristicas" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-background rounded-[2rem] p-8 border border-primary/10 shadow-sm flex flex-col gap-6 hover:-translate-y-1 transition-transform duration-500">
          <div className="flex-1">
            <h3 className="font-sans font-bold text-2xl text-primary mb-3">Integra NavigoX en tu recepción</h3>
            <p className="font-body text-primary/70 text-sm leading-relaxed">Conecta al turista con experiencias auténticas sin salir del mostrador.</p>
          </div>
          <DiagnosticsShuffle />
        </div>

        <div className="bg-background rounded-[2rem] p-8 border border-primary/10 shadow-sm flex flex-col gap-6 hover:-translate-y-1 transition-transform duration-500">
          <div className="flex-1">
            <h3 className="font-sans font-bold text-2xl text-primary mb-3">Únete al piloto en Puerto Escondido</h3>
            <p className="font-body text-primary/70 text-sm leading-relaxed">Sé parte de la revolución turística local validando nuestro modelo de impacto.</p>
          </div>
          <TypewriterCard />
        </div>

        <div className="bg-background rounded-[2rem] p-8 border border-primary/10 shadow-sm flex flex-col gap-6 hover:-translate-y-1 transition-transform duration-500">
          <div className="flex-1">
            <h3 className="font-sans font-bold text-2xl text-primary mb-3">Aumenta ingresos sin esfuerzo</h3>
            <p className="font-body text-primary/70 text-sm leading-relaxed">Liquidaciones automáticas que generan valor para ti y el operador local sin trabajo manual.</p>
          </div>
          <CursorGrid />
        </div>
      </div>
    </section>
  );
};

// Philosophy "El Manifiesto"
const Philosophy = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const q1 = gsap.utils.toArray('.q1-word');
      const q2 = gsap.utils.toArray('.q2-word');

      gsap.from(q1, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
        y: 20, opacity: 0, duration: 0.8, stagger: 0.05, ease: 'power2.out'
      });

      gsap.from(q2, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 40%",
        },
        y: 30, opacity: 0, duration: 1.2, stagger: 0.08, ease: 'power3.out'
      });
      
      gsap.to('.parallax-bg', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        },
        y: 100,
        ease: 'none'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const t1 = "La mayoría de plataformas se enfoca en: automatizar sin alma.".split(" ");
  const t2 = "Nosotros nos enfocamos en: potenciar el factor humano.".split(" ");

  return (
    <section id="filosofia" ref={containerRef} className="relative py-40 px-6 md:px-12 bg-primary rounded-[3rem] overflow-hidden text-center flex flex-col items-center justify-center min-h-[80vh]">
      <img src="https://images.unsplash.com/photo-1542644265-5fa1eb411f16?auto=format&fit=crop&q=80&w=2000" alt="Local Texture" className="parallax-bg absolute inset-0 w-full h-[120%] -top-[10%] object-cover opacity-10 mix-blend-overlay" />
      
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-16">
        <p className="font-sans font-medium text-surface/60 text-xl md:text-2xl leading-relaxed flex flex-wrap justify-center gap-x-2">
          {t1.map((w, i) => <span key={i} className="q1-word inline-block">{w}</span>)}
        </p>
        <p className="font-drama italic text-4xl md:text-6xl lg:text-8xl text-background leading-tight flex flex-wrap justify-center gap-x-3 gap-y-2">
          {t2.map((w, i) => {
            const isHighlight = w.toLowerCase().includes('humano') || w.toLowerCase().includes('factor');
            return (
              <span key={i} className={cn("q2-word inline-block", isHighlight && "text-accent not-italic font-sans font-bold tracking-tight px-2")}>
                {w}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
};

// Protocol "Archivo Apilable Sticky"
const ProtocolCard = ({ step, title, desc, AnimComponent }) => {
  return (
    <div className="protocol-card w-full h-[100vh] flex items-center justify-center sticky top-0">
      <div className="w-full max-w-5xl bg-surface border border-primary/10 rounded-[3rem] p-10 md:p-16 shadow-lg flex flex-col md:flex-row gap-12 items-center origin-top relative overflow-hidden transition-all duration-300">
        <div className="flex-1 flex flex-col gap-6 relative z-10">
          <span className="font-mono-data text-accent text-sm font-semibold tracking-widest uppercase">Paso {step}</span>
          <h2 className="font-sans font-bold text-4xl md:text-5xl text-primary tracking-tight">{title}</h2>
          <p className="font-body text-primary/70 text-lg max-w-md leading-relaxed">{desc}</p>
        </div>
        <div className="w-full md:w-1/2 h-64 md:h-96 relative flex items-center justify-center bg-background/50 rounded-2xl border border-primary/5">
          <AnimComponent />
        </div>
      </div>
    </div>
  );
};

const RotatingMotive = () => {
  const ref = useRef(null);
  useEffect(() => {
    gsap.to(ref.current, { rotation: 360, duration: 20, repeat: -1, ease: 'none' });
  }, []);
  return (
    <svg ref={ref} className="w-48 h-48 text-accent" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="50" cy="50" r="40" strokeDasharray="10 10" />
      <circle cx="50" cy="50" r="30" strokeWidth="1" opacity="0.5" />
      <path d="M50 10 L50 90 M10 50 L90 50 M22 22 L78 78 M22 78 L78 22" strokeWidth="1" opacity="0.2"/>
    </svg>
  );
};

const LaserScanner = () => {
  const lineRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(lineRef.current, { y: 0 }, { y: 200, duration: 2, repeat: -1, ease: 'linear', yoyo: true });
  }, []);
  return (
    <div className="w-full h-full relative overflow-hidden p-8 flex flex-col gap-4">
      {Array.from({length: 4}).map((_, i) => (
        <div key={i} className="w-full h-12 border border-primary/20 rounded-lg flex items-center px-4 gap-4">
           <div className="w-8 h-8 rounded bg-primary/10"></div>
           <div className="h-2 bg-primary/10 rounded w-1/2"></div>
        </div>
      ))}
      <div ref={lineRef} className="absolute top-0 left-0 w-full h-[2px] bg-accent shadow-[0_0_15px_rgba(244,124,60,0.8)] z-10"></div>
    </div>
  );
};

const PulseWave = () => {
  const pathRef = useRef(null);
  useEffect(() => {
    gsap.to(pathRef.current, { strokeDashoffset: 0, duration: 2, repeat: -1, ease: 'power1.inOut' });
  }, []);
  return (
    <svg className="w-full h-32 text-accent px-8" viewBox="0 0 200 50" fill="none" stroke="currentColor" strokeWidth="2">
      <path ref={pathRef} d="M0 25 H40 L50 10 L60 40 L70 25 H100 L110 15 L120 35 L130 25 H200" strokeDasharray="300" strokeDashoffset="300" />
    </svg>
  );
};

const Protocol = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card');
      
      cards.forEach((card, index) => {
        const isLast = index === cards.length - 1;
        if (!isLast) {
          gsap.to(card.querySelector('div'), {
            scrollTrigger: {
              trigger: cards[index + 1],
              start: "top 80%",
              end: "top 20%",
              scrub: true,
            },
            scale: 0.9,
            opacity: 0.5,
            filter: "blur(10px)",
            ease: 'none'
          });
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="protocolo" ref={containerRef} className="py-32 px-6 relative flex flex-col min-h-screen">
      <ProtocolCard step="01" title="Recomienda" desc="Conecta al turista con operadores locales desde la recepción, ofreciendo el catálogo de NavigoX." AnimComponent={RotatingMotive} />
      <ProtocolCard step="02" title="Reserva y Cobra" desc="Transacciones fluidas por WhatsApp sin fricción para el huésped, integrando pagos de forma segura." AnimComponent={LaserScanner} />
      <ProtocolCard step="03" title="Liquida y Aprende" desc="Aumenta ingresos automáticamente mientras el sistema aprende preferencias para mejorar la oferta." AnimComponent={PulseWave} />
    </section>
  );
};

// Getting Started
const GettingStarted = ({ onOpenModal }) => {
  return (
    <section className="py-32 px-6 flex justify-center">
      <div className="bg-surface rounded-[3rem] p-16 md:p-24 text-center max-w-4xl w-full border border-primary/10 shadow-lg relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-background/40 to-transparent"></div>
        <div className="relative z-10 flex flex-col items-center gap-8">
          <h2 className="font-sans font-bold text-4xl md:text-5xl text-primary tracking-tight">Potencia la conexión hoy</h2>
          <p className="font-body text-primary/70 text-lg max-w-lg">Únete a la lista de espera y sé de los primeros en acceder al piloto en Puerto Escondido. Factor humano activado.</p>
          <Button variant="secondary" className="px-10 py-5 text-lg mt-4" onClick={onOpenModal}>
            Unirse a la lista de espera
          </Button>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="bg-primary text-surface pt-24 pb-12 px-6 md:px-12 rounded-t-[4rem]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16 border-b border-surface/10 pb-16">
        <div className="flex flex-col gap-6 max-w-sm">
          <h3 className="font-sans font-bold text-4xl tracking-tight text-background">NavigoX</h3>
          <p className="font-body text-surface/60 leading-relaxed">Conectando al turista con el factor humano y los operadores locales.</p>
          <div className="flex items-center gap-3 mt-4 bg-background/5 inline-flex px-4 py-2 rounded-full border border-surface/10 w-fit">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="font-mono-data text-xs tracking-wider text-surface/80">NavigoX OS activo</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-12 font-sans text-sm">
          <div className="flex flex-col gap-4">
            <span className="text-surface/40 uppercase tracking-widest text-xs font-semibold mb-2">Plataforma</span>
            <a href="#caracteristicas" className="link-hover text-surface/80 hover:text-white">Características</a>
            <a href="#filosofia" className="link-hover text-surface/80 hover:text-white">Filosofía</a>
            <a href="#protocolo" className="link-hover text-surface/80 hover:text-white">Protocolo</a>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-surface/40 uppercase tracking-widest text-xs font-semibold mb-2">Legal</span>
            <a href="#" className="link-hover text-surface/80 hover:text-white">Privacidad</a>
            <a href="#" className="link-hover text-surface/80 hover:text-white">Términos</a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono-data text-surface/40">
        <span>© {new Date().getFullYear()} NavigoX. Todos los derechos reservados.</span>
        <span>Puerto Escondido, MX</span>
      </div>
    </footer>
  );
};

const WaitlistModal = ({ onClose }) => {
  const [status, setStatus] = useState('idle');
  const [formData, setFormData] = useState({ nombre: '', email: '', telefono: '', empresa: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await fetch('https://mi-n8n-n8n.4u5ow8.easypanel.host/webhook/navigo-x', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        mode: 'no-cors'
      });
      setStatus('success');
    } catch (err) {
      setStatus('success');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-background w-full max-w-lg rounded-[2rem] p-8 md:p-12 shadow-2xl border border-primary/10 overflow-hidden">
        <button onClick={onClose} className="absolute top-6 right-6 text-primary/50 hover:text-primary transition-colors">
          <X className="w-6 h-6" />
        </button>
        
        {status === 'success' ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-sans font-bold text-3xl text-primary mb-2">¡Recibido!</h3>
            <p className="font-body text-primary/70">Nos pondremos en contacto contigo pronto.</p>
          </div>
        ) : (
          <>
            <h3 className="font-sans font-bold text-3xl text-primary mb-2">Únete al Piloto</h3>
            <p className="font-body text-primary/60 mb-8">Déjanos tus datos para ser de los primeros en acceder a NavigoX.</p>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-sans">
              <div>
                <label className="block text-sm font-semibold text-primary/80 mb-1">Nombre completo *</label>
                <input required type="text" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} className="w-full bg-surface border border-primary/10 rounded-xl px-4 py-3 text-primary focus:outline-none focus:border-accent transition-colors" placeholder="Juan Pérez" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary/80 mb-1">Correo electrónico *</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-surface border border-primary/10 rounded-xl px-4 py-3 text-primary focus:outline-none focus:border-accent transition-colors" placeholder="juan@ejemplo.com" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary/80 mb-1">Teléfono (WhatsApp) *</label>
                <input required type="tel" value={formData.telefono} onChange={e => setFormData({...formData, telefono: e.target.value})} className="w-full bg-surface border border-primary/10 rounded-xl px-4 py-3 text-primary focus:outline-none focus:border-accent transition-colors" placeholder="+52 ..." />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary/80 mb-1">Empresa (Opcional)</label>
                <input type="text" value={formData.empresa} onChange={e => setFormData({...formData, empresa: e.target.value})} className="w-full bg-surface border border-primary/10 rounded-xl px-4 py-3 text-primary focus:outline-none focus:border-accent transition-colors" placeholder="Hotel ..." />
              </div>
              
              <Button variant="primary" className="mt-4 py-4 justify-center" disabled={status === 'loading'}>
                {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Enviar solicitud'}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-background min-h-screen selection:bg-accent/20 selection:text-accent">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      <main>
        <Hero onOpenModal={() => setIsModalOpen(true)} />
        <Features />
        <Philosophy />
        <Protocol />
        <GettingStarted onOpenModal={() => setIsModalOpen(true)} />
      </main>
      <Footer />
      
      {isModalOpen && <WaitlistModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
