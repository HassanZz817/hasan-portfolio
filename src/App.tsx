import { useEffect, useRef, useState } from 'react'
import { useTypewriter } from './hooks/useTypewriter'
import './App.css'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4'

const TYPEWRITER_TEXT =
  "I turn ad spend into revenue. Three years of scaling campaigns across Snapchat, Meta, Google, and TikTok — delivering real returns for real brands across Saudi Arabia and beyond."

const WHATSAPP_URL = 'https://wa.link/xqvw41'

const NAV_LINKS = ['Work', 'Results', 'Clients', 'Contact']

const STATS = [
  {
    platform: 'Snapchat',
    headline: '9.47× ROAS',
    sub: '3.4M impressions · 516 purchases',
    color: '#FFFC00',
  },
  {
    platform: 'Meta',
    headline: '4.5M+ Impressions',
    sub: '1.1M paid reach · IG + Facebook',
    color: '#0866FF',
  },
  {
    platform: 'Google',
    headline: '10× ROAS',
    sub: '263,202 SAR revenue · 233 conversions',
    color: '#34A853',
  },
  {
    platform: 'TikTok',
    headline: '34,324 Conversions',
    sub: '234,352 SAR revenue · 6.4M impressions',
    color: '#000',
  },
]

const CLIENTS = [
  'GOSI', 'Al-Dawaa', 'WEFT', 'Snowwhite Arabia', 'Sold Out',
  'MiniBites', 'Elanore', 'Dibsy', 'Lavendery', 'Recharge Fitness',
  'Takara', 'VOLO', 'NJUD', 'Abeel', 'Quara Projects',
  'Graph Coffee', 'TierFaster', 'Dinar Third', 'Makhzny',
]

const PILL_ACTIONS = [
  'View campaign results',
  'Snapchat Ads',
  'Meta & Instagram',
  'Google Ads',
  'TikTok Ads',
]

const EMAIL = 'hassanalbar05@gmail.com'

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const prevXRef = useRef<number | null>(null)
  const targetTimeRef = useRef(0)
  const seekingRef = useRef(false)

  const [menuOpen, setMenuOpen] = useState(false)
  const [pillsVisible, setPillsVisible] = useState(false)

  const { displayed, done } = useTypewriter(TYPEWRITER_TEXT, 38, 600)

  // Pills fade in 400ms after mount
  useEffect(() => {
    const t = setTimeout(() => setPillsVisible(true), 400)
    return () => clearTimeout(t)
  }, [])

  // Mouse-scrub video
  useEffect(() => {
    const SENSITIVITY = 0.8

    function onSeeked() {
      seekingRef.current = false
      const video = videoRef.current
      if (!video) return
      if (Math.abs(video.currentTime - targetTimeRef.current) > 0.05) {
        seekingRef.current = true
        video.currentTime = targetTimeRef.current
      }
    }

    function onMouseMove(e: MouseEvent) {
      const video = videoRef.current
      if (!video || !video.duration) return
      const prevX = prevXRef.current
      if (prevX === null) { prevXRef.current = e.clientX; return }
      const delta = e.clientX - prevX
      prevXRef.current = e.clientX
      const offset = (delta / window.innerWidth) * SENSITIVITY * video.duration
      targetTimeRef.current = Math.max(0, Math.min(video.duration, targetTimeRef.current + offset))
      if (!seekingRef.current) {
        seekingRef.current = true
        video.currentTime = targetTimeRef.current
      }
    }

    const video = videoRef.current
    video?.addEventListener('seeked', onSeeked)
    window.addEventListener('mousemove', onMouseMove)
    return () => {
      video?.removeEventListener('seeked', onSeeked)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const sectionIds: Record<string, string> = {
    Work: 'results',
    Results: 'results',
    Clients: 'clients',
    Contact: 'contact',
  }

  return (
    <div className="relative bg-white text-black">
      {/* ── Fixed video background ── */}
      <video
        ref={videoRef}
        src={VIDEO_URL}
        muted
        playsInline
        preload="auto"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: '70% center',
          zIndex: 0,
        }}
      />

      {/* ── Navbar ── */}
      <nav
        style={{ zIndex: 10 }}
        className="fixed top-0 left-0 right-0 flex justify-between items-center px-5 sm:px-8 py-4 sm:py-5"
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <span
            className="text-[21px] sm:text-[26px] tracking-tight text-black select-none"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Hasan Albar<sup className="text-xs align-super">®</sup>
          </span>
          <span
            className="text-[25px] sm:text-[30px] text-black select-none"
            style={{ letterSpacing: '-0.02em' }}
            aria-hidden="true"
          >
            ✳︎
          </span>
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center text-[23px] text-black">
          {NAV_LINKS.map((link, i) => (
            <li key={link} className="flex items-center">
              <button
                onClick={() => scrollTo(sectionIds[link])}
                className="hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-0"
              >
                {link}
              </button>
              {i < NAV_LINKS.length - 1 && <span className="mx-1 opacity-40">,</span>}
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="hidden md:inline text-[23px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity"
        >
          Get in touch
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1 bg-transparent border-0 cursor-pointer"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span
            className="block w-6 bg-black transition-all duration-300"
            style={{
              height: '2px',
              transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none',
            }}
          />
          <span
            className="block w-6 bg-black transition-all duration-300"
            style={{ height: '2px', opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-6 bg-black transition-all duration-300"
            style={{
              height: '2px',
              transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
            }}
          />
        </button>
      </nav>

      {/* ── Mobile overlay ── */}
      <div
        className="fixed inset-0 md:hidden bg-white/95 backdrop-blur-sm flex flex-col justify-center px-8 gap-8 transition-opacity duration-300"
        style={{ zIndex: 9, opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'auto' : 'none' }}
      >
        {NAV_LINKS.map((link) => (
          <button
            key={link}
            onClick={() => scrollTo(sectionIds[link])}
            className="text-left text-[32px] font-medium text-black bg-transparent border-0 cursor-pointer"
          >
            {link}
          </button>
        ))}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="text-[32px] font-medium text-black underline underline-offset-2"
        >
          Get in touch
        </a>
      </div>

      {/* ─────────────────────────────────────────
          HERO SECTION
      ───────────────────────────────────────── */}
      <section
        id="hero"
        className="relative h-screen flex flex-col justify-end md:justify-center pb-12 md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden"
        style={{ zIndex: 1 }}
      >
        <div className="max-w-xl relative z-10">
          {/* Blurred intro label */}
          <p
            className="pointer-events-none select-none mb-5 sm:mb-6 text-black"
            style={{
              fontSize: 'clamp(18px, 4vw, 26px)',
              lineHeight: 1.3,
              fontWeight: 400,
              filter: 'blur(4px)',
            }}
          >
            Hey there, meet Hasan Albar,
            <br />
            Senior Digital Media Marketer at 33 Media
          </p>

          {/* Typewriter text */}
          <p
            className="text-black mb-5 sm:mb-6"
            style={{
              fontSize: 'clamp(18px, 4vw, 26px)',
              lineHeight: 1.35,
              fontWeight: 400,
              minHeight: '54px',
            }}
          >
            {displayed}
            {!done && (
              <span
                className="cursor-blink inline-block bg-black align-middle ml-[2px]"
                style={{ width: '2px', height: '1.1em' }}
              />
            )}
          </p>

          {/* Action pills */}
          <div
            className="flex flex-wrap gap-y-1"
            style={{
              opacity: pillsVisible ? 1 : 0,
              transform: pillsVisible ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}
          >
            {PILL_ACTIONS.map((label) => (
              <button
                key={label}
                onClick={() => scrollTo('results')}
                className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
              >
                {label}
              </button>
            ))}

            {/* WhatsApp pill */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center text-white bg-transparent border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer"
            >
              Reach me
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          RESULTS / STATS SECTION
      ───────────────────────────────────────── */}
      <section
        id="results"
        className="relative bg-white px-5 sm:px-8 md:px-10 py-20 sm:py-28"
        style={{ zIndex: 2 }}
      >
        <p className="text-xs sm:text-sm text-black/40 uppercase tracking-widest mb-3">
          Campaign Results
        </p>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl text-black mb-14 max-w-2xl"
          style={{ fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}
        >
          Numbers that speak for themselves.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-black/10">
          {STATS.map((s) => (
            <div key={s.platform} className="bg-white p-8 sm:p-10 flex flex-col gap-4">
              <span
                className="text-[11px] uppercase tracking-widest font-medium"
                style={{ color: s.color === '#000' ? '#666' : s.color }}
              >
                {s.platform}
              </span>
              <p
                className="text-3xl sm:text-4xl text-black"
                style={{ fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}
              >
                {s.headline}
              </p>
              <p className="text-sm text-black/50">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Summary bar */}
        <div className="mt-px bg-black/5 grid grid-cols-2 sm:grid-cols-4 gap-px">
          {[
            { label: '3+ Years', sub: 'Running campaigns' },
            { label: '15+ Brands', sub: 'Clients managed' },
            { label: 'SAR 263K+', sub: 'Revenue from Google alone' },
            { label: '34K Conversions', sub: 'TikTok in a single month' },
          ].map((item) => (
            <div key={item.label} className="bg-white px-8 py-6 flex flex-col gap-1">
              <span
                className="text-2xl sm:text-3xl text-black"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {item.label}
              </span>
              <span className="text-xs text-black/40">{item.sub}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────
          SERVICES SECTION
      ───────────────────────────────────────── */}
      <section
        className="relative bg-black px-5 sm:px-8 md:px-10 py-20 sm:py-28"
        style={{ zIndex: 2 }}
      >
        <p className="text-xs sm:text-sm text-white/40 uppercase tracking-widest mb-3">
          What I do
        </p>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl text-white mb-14 max-w-2xl"
          style={{ fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}
        >
          Full-funnel performance marketing.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10">
          {[
            {
              title: 'Paid Social',
              desc: 'Meta (Facebook & Instagram), Snapchat, TikTok — from audience research and creative direction to pixel setup, campaign architecture, and ROAS optimisation.',
            },
            {
              title: 'Paid Search',
              desc: 'Google Ads across Shopping, Search, and Performance Max. Keyword strategy, bid management, and conversion tracking that turns clicks into revenue.',
            },
            {
              title: 'Audience Strategy',
              desc: 'Custom audiences, lookalikes, retargeting, and behavioural segmentation. Finding the right people at the right moment across every platform.',
            },
            {
              title: 'Analytics & Reporting',
              desc: 'Pixel and SDK installation, funnel analysis, attribution modelling, and clear performance reporting that connects ad spend to business outcomes.',
            },
          ].map((s) => (
            <div key={s.title} className="bg-black p-8 sm:p-10 flex flex-col gap-4 border-b border-white/10 last:border-0">
              <p
                className="text-xl sm:text-2xl text-white"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {s.title}
              </p>
              <p className="text-sm sm:text-base text-white/50 leading-relaxed max-w-sm">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────
          CLIENTS SECTION
      ───────────────────────────────────────── */}
      <section
        id="clients"
        className="relative bg-white px-5 sm:px-8 md:px-10 py-20 sm:py-28"
        style={{ zIndex: 2 }}
      >
        <p className="text-xs sm:text-sm text-black/40 uppercase tracking-widest mb-3">
          Clients
        </p>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl text-black mb-14 max-w-xl"
          style={{ fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}
        >
          Brands I've grown.
        </h2>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          {CLIENTS.map((name) => (
            <span
              key={name}
              className="border border-black/10 rounded-full px-5 py-2 text-sm sm:text-base text-black/70"
            >
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────
          ABOUT SECTION
      ───────────────────────────────────────── */}
      <section
        className="relative bg-black px-5 sm:px-8 md:px-10 py-20 sm:py-28"
        style={{ zIndex: 2 }}
      >
        <div className="max-w-2xl">
          <p className="text-xs sm:text-sm text-white/40 uppercase tracking-widest mb-3">
            About
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl text-white mb-8"
            style={{ fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}
          >
            Three years. Dozens of brands. One discipline.
          </h2>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed mb-10">
            Based in Saudi Arabia, I'm a Senior Digital Media Marketer at 33 Media with
            an IT background from Al-Madinah International University.
            <br /><br />
            Since 2023, I've managed paid campaigns independently, combining performance
            marketing, targeting, design, and marketing psychology to turn attention into
            measurable results.
          </p>
          <div className="flex flex-wrap gap-3">
            {['Digital Marketing', 'Social Media', 'Paid Advertising', 'Design', 'Marketing Psychology'].map((tag) => (
              <span key={tag} className="border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/50">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          CONTACT SECTION
      ───────────────────────────────────────── */}
      <section
        id="contact"
        className="relative bg-white px-5 sm:px-8 md:px-10 py-20 sm:py-28"
        style={{ zIndex: 2 }}
      >
        <p className="text-xs sm:text-sm text-black/40 uppercase tracking-widest mb-3">
          Contact
        </p>
        <h2
          className="text-3xl sm:text-5xl md:text-6xl text-black mb-10 max-w-xl"
          style={{ fontFamily: 'var(--font-heading)', lineHeight: 1.05 }}
        >
          Let's build something that performs.
        </h2>

        <div className="flex flex-col sm:flex-row gap-3 mb-16">
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center justify-center bg-black text-white rounded-full px-8 py-3 text-base hover:bg-black/80 transition-colors"
          >
            {EMAIL}
          </a>
          <a
            href="tel:+966580134503"
            className="inline-flex items-center justify-center border border-black/10 rounded-full px-8 py-3 text-base hover:bg-black hover:text-white transition-colors"
          >
            +966 580 134 503
          </a>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-black/40">
          <a
            href="https://www.linkedin.com/in/hasan-al-bar/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-black transition-colors underline underline-offset-2"
          >
            LinkedIn
          </a>
          <a
            href="https://x.com/Halbar05"
            target="_blank"
            rel="noreferrer"
            className="hover:text-black transition-colors underline underline-offset-2"
          >
            X / Twitter
          </a>
          <span>Saudi Arabia</span>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="relative bg-black px-5 sm:px-8 md:px-10 py-6 flex justify-between items-center text-xs text-white/30"
        style={{ zIndex: 2 }}
      >
        <span style={{ fontFamily: 'var(--font-heading)' }}>
          Hasan Albar<sup className="text-[8px] align-super">®</sup>
        </span>
        <span>Digital Marketer — Saudi Arabia</span>
      </footer>
    </div>
  )
}
