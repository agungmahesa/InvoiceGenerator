import { Link } from 'react-router-dom'
import {
    FileText, Download, Palette, Zap, Shield, Globe,
    CheckCircle, ArrowRight, Star, ChevronDown, ChevronUp,
    Layout, Clock, CreditCard
} from 'lucide-react'
import { useState } from 'react'
import './Landing.css'

const TEMPLATES = [
    { id: 'modern', label: 'Modern', color: '#4f46e5', desc: 'Clean layouts with bold accent typography' },
    { id: 'elegant', label: 'Elegant', color: '#1a1a2e', desc: 'Dark navy header with premium look' },
    { id: 'bold', label: 'Bold', color: '#7c3aed', desc: 'Vivid gradients with strong visual structure' },
    { id: 'minimalist', label: 'Minimalist', color: '#374151', desc: 'Pure whitespace and restrained elegance' },
    { id: 'corporate', label: 'Corporate', color: '#0ea5e9', desc: 'Professional slate tones for enterprise use' },
    { id: 'tech', label: 'Tech', color: '#10b981', desc: 'Dark terminal aesthetic for the tech-savvy' },
]

const FEATURES = [
    { icon: Layout, title: '10 Premium Templates', desc: 'From minimalist to bold, every style is covered. Switch templates with one click and see instant live preview.' },
    { icon: Download, title: 'Instant PDF Export', desc: 'Download a pixel-perfect A4 PDF invoice in seconds — no watermarks, no sign-up, completely free.' },
    { icon: Palette, title: 'Custom Brand Colors', desc: 'Match your brand identity with a full color picker. Your chosen accent flows through the whole invoice.' },
    { icon: Globe, title: 'Multi-Currency', desc: 'Bill clients globally in USD, EUR, GBP, IDR and more. Currency symbols update throughout the invoice automatically.' },
    { icon: Zap, title: 'Real-time Preview', desc: 'Every field you type instantly reflects on the live preview panel — no "refresh" needed.' },
    { icon: Shield, title: 'Privacy First', desc: 'All invoice data stays in your browser. Nothing is uploaded to any server. Your details never leave your device.' },
]

const STEPS = [
    { num: '01', title: 'Fill In Your Details', desc: 'Enter your company name, client info, and line items using the simple form on the left.' },
    { num: '02', title: 'Choose a Template', desc: 'Select from 10 beautifully designed templates. Preview updates instantly as you switch.' },
    { num: '03', title: 'Customize & Download', desc: 'Pick your brand color, adjust tax and notes, then hit "Download PDF" for a ready-to-send invoice.' },
]

const FAQS = [
    { q: 'Is Invoicify really free?', a: 'Yes — 100% free. No sign-up, no subscription, no hidden fees, no watermarks. Just create and download.' },
    { q: 'How do I download my invoice as a PDF?', a: 'Fill in your details, choose a template, then click the "Download PDF" button in the top-right of the preview panel.' },
    { q: 'How many templates are available?', a: 'There are 10 templates: Modern, Classic, Minimalist, Elegant, Bold, Standard, Corporate, Creative, Simple, and Tech.' },
    { q: 'Can I use my own brand colors?', a: 'Yes. The color picker in the editor panel lets you choose any hex color that flows through your entire invoice.' },
    { q: 'Does Invoicify store my data?', a: 'No. Everything runs in your browser. No data is sent to any server. Your invoice data is 100% private.' },
    { q: 'What currencies are supported?', a: 'USD, EUR, GBP, and IDR are currently available. Symbols and formatting update automatically throughout the invoice.' },
]

function FAQItem({ faq }) {
    const [open, setOpen] = useState(false)
    return (
        <div className={`faq-item ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
            <div className="faq-question">
                <span>{faq.q}</span>
                {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
            {open && <p className="faq-answer">{faq.a}</p>}
        </div>
    )
}

function TemplateBadge({ t }) {
    return (
        <div className="template-badge">
            <div className="template-badge-swatch" style={{ background: t.color }} />
            <div>
                <p className="template-badge-label">{t.label}</p>
                <p className="template-badge-desc">{t.desc}</p>
            </div>
        </div>
    )
}

export default function Landing() {
    return (
        <div className="landing">
            {/* ──── Navbar ──── */}
            <nav className="lnav" aria-label="Main navigation">
                <div className="lnav-inner">
                    <div className="lnav-logo">
                        <div className="lnav-logo-icon"><FileText size={18} /></div>
                        <span className="lnav-logo-text">Invoicify</span>
                    </div>
                    <div className="lnav-links">
                        <a href="#features">Features</a>
                        <a href="#templates">Templates</a>
                        <a href="#how">How it works</a>
                        <a href="#faq">FAQ</a>
                    </div>
                    <Link to="/app" className="lnav-cta" id="nav-start-btn">
                        Start for free <ArrowRight size={16} />
                    </Link>
                </div>
            </nav>

            {/* ──── Hero ──── */}
            <section className="hero" aria-labelledby="hero-heading">
                <div className="hero-badge">
                    <Star size={14} fill="currentColor" />
                    <span>Free · No sign-up · Instant PDF download</span>
                </div>
                <h1 id="hero-heading" className="hero-title">
                    Create <span className="hero-gradient-text">Professional Invoices</span><br />
                    in Seconds — Free
                </h1>
                <p className="hero-sub">
                    10 stunning templates. Custom brand colors. Multi-currency. <br />
                    Fill in your details and download a pixel-perfect PDF instantly.
                </p>
                <div className="hero-actions">
                    <Link to="/app" className="btn-hero-primary" id="hero-cta-btn">
                        Generate Invoice Free <ArrowRight size={18} />
                    </Link>
                    <a href="#templates" className="btn-hero-secondary">
                        View Templates
                    </a>
                </div>
                <div className="hero-social-proof">
                    <div className="stars">
                        {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="#facc15" color="#facc15" />)}
                    </div>
                    <span>Trusted by freelancers & small businesses for fast invoicing</span>
                </div>

                {/* Hero mockup */}
                <div className="hero-mockup" aria-hidden="true">
                    <div className="hero-mockup-bar">
                        <div className="mockup-dot" style={{ background: '#ef4444' }} />
                        <div className="mockup-dot" style={{ background: '#facc15' }} />
                        <div className="mockup-dot" style={{ background: '#22c55e' }} />
                        <span style={{ fontSize: '12px', color: '#6b7280', marginLeft: '8px' }}>invoicify.app</span>
                    </div>
                    <div className="hero-mockup-body">
                        <div className="mockup-sidebar">
                            <div className="mockup-logo-bar" />
                            <div className="mockup-nav-item active" />
                            <div className="mockup-nav-item" />
                        </div>
                        <div className="mockup-editor">
                            <div className="mockup-field" style={{ width: '80%' }} />
                            <div className="mockup-field" style={{ width: '60%' }} />
                            <div className="mockup-field" style={{ width: '90%' }} />
                            <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                                <div className="mockup-field" style={{ width: '40%', height: '8px' }} />
                                <div className="mockup-field" style={{ width: '40%', height: '8px' }} />
                            </div>
                            <div className="mockup-divider" />
                            <div className="mockup-field" style={{ width: '100%', height: '24px' }} />
                            <div className="mockup-field" style={{ width: '100%', height: '24px' }} />
                            <div className="mockup-field" style={{ width: '80%', height: '24px' }} />
                        </div>
                        <div className="mockup-preview">
                            <div className="mockup-invoice-header" />
                            <div className="mockup-invoice-body">
                                <div className="mockup-field" style={{ width: '55%', height: '14px', background: '#e0e7ff' }} />
                                <div className="mockup-field" style={{ width: '75%', height: '8px' }} />
                                <div className="mockup-field" style={{ width: '65%', height: '8px' }} />
                            </div>
                            <div className="mockup-invoice-table">
                                <div className="mockup-tr header" />
                                <div className="mockup-tr" />
                                <div className="mockup-tr" />
                                <div className="mockup-tr" />
                            </div>
                            <div className="mockup-invoice-total" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ──── Features ──── */}
            <section id="features" className="section features-section" aria-labelledby="features-heading">
                <div className="section-label">Features</div>
                <h2 id="features-heading" className="section-title">Everything you need to invoice professionally</h2>
                <p className="section-sub">No fluff. Just the tools that matter for creating and sending great invoices fast.</p>
                <div className="features-grid">
                    {FEATURES.map(f => (
                        <article key={f.title} className="feature-card">
                            <div className="feature-icon"><f.icon size={22} /></div>
                            <h3>{f.title}</h3>
                            <p>{f.desc}</p>
                        </article>
                    ))}
                </div>
            </section>

            {/* ──── Templates ──── */}
            <section id="templates" className="section templates-section" aria-labelledby="templates-heading">
                <div className="section-label">Templates</div>
                <h2 id="templates-heading" className="section-title">10 designs for every business style</h2>
                <p className="section-sub">From sleek minimalist to bold corporate — pick what fits your brand and switch any time.</p>
                <div className="templates-grid">
                    {TEMPLATES.map(t => <TemplateBadge key={t.id} t={t} />)}
                    <div className="template-badge plus-card">
                        <div className="template-badge-swatch" style={{ background: 'linear-gradient(135deg,#6366f1,#a78bfa)' }}>
                            <span style={{ color: 'white', fontWeight: 700, fontSize: '20px' }}>+4</span>
                        </div>
                        <div>
                            <p className="template-badge-label">4 more templates</p>
                            <p className="template-badge-desc">Classic, Standard, Creative & Simple</p>
                        </div>
                    </div>
                </div>
                <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                    <Link to="/app" className="btn-hero-primary" id="templates-cta-btn">
                        Try all templates free <ArrowRight size={16} />
                    </Link>
                </div>
            </section>

            {/* ──── How It Works ──── */}
            <section id="how" className="section how-section" aria-labelledby="how-heading">
                <div className="section-label">How it works</div>
                <h2 id="how-heading" className="section-title">Three steps to a perfect invoice</h2>
                <div className="steps-row">
                    {STEPS.map((s, i) => (
                        <div key={s.num} className="step-card">
                            <div className="step-num">{s.num}</div>
                            <h3>{s.title}</h3>
                            <p>{s.desc}</p>
                            {i < STEPS.length - 1 && <div className="step-arrow" aria-hidden="true"><ArrowRight size={20} /></div>}
                        </div>
                    ))}
                </div>
            </section>

            {/* ──── Value / Trust Strip ──── */}
            <section className="trust-strip" aria-label="Key selling points">
                {[
                    { icon: CreditCard, text: 'No credit card required' },
                    { icon: Shield, text: 'Data never leaves your browser' },
                    { icon: Clock, text: 'Invoice ready in under 60 seconds' },
                    { icon: Download, text: 'Unlimited PDF downloads' },
                ].map(item => (
                    <div key={item.text} className="trust-item">
                        <item.icon size={18} />
                        <span>{item.text}</span>
                    </div>
                ))}
            </section>

            {/* ──── FAQ ──── */}
            <section id="faq" className="section faq-section" aria-labelledby="faq-heading">
                <div className="section-label">FAQ</div>
                <h2 id="faq-heading" className="section-title">Common questions</h2>
                <div className="faq-list">
                    {FAQS.map(f => <FAQItem key={f.q} faq={f} />)}
                </div>
            </section>

            {/* ──── CTA Banner ──── */}
            <section className="cta-section" aria-labelledby="cta-heading">
                <div className="cta-inner">
                    <div className="cta-icon"><FileText size={32} /></div>
                    <h2 id="cta-heading">Ready to create your invoice?</h2>
                    <p>Free, fast, and no account needed. Start typing and your invoice is ready in seconds.</p>
                    <Link to="/app" className="btn-hero-primary" id="footer-cta-btn">
                        Create Invoice Now <ArrowRight size={18} />
                    </Link>
                </div>
            </section>

            {/* ──── Footer ──── */}
            <footer className="lnav-footer" role="contentinfo">
                <div className="lnav-inner" style={{ padding: '3rem 1.5rem', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '2rem', alignItems: 'flex-start' }}>
                    <div>
                        <div className="lnav-logo" style={{ marginBottom: '1rem' }}>
                            <div className="lnav-logo-icon"><FileText size={16} /></div>
                            <span className="lnav-logo-text" style={{ fontSize: '1rem' }}>Invoicify</span>
                        </div>
                        <p className="footer-copy" style={{ maxWidth: '300px' }}>Free Invoice Generator. No sign-up required, create professional PDFs instantly in your browser.</p>
                    </div>
                    <div>
                        <h4 style={{ fontWeight: 700, marginBottom: '1rem', color: '#0f172a' }}>Invoicify Alternatives</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <Link to="/alternatives/quickbooks" style={{ color: '#64748b', fontSize: '0.9rem', textDecoration: 'none' }}>Invoicify vs QuickBooks</Link>
                                <Link to="/alternatives/freshbooks" style={{ color: '#64748b', fontSize: '0.9rem', textDecoration: 'none' }}>Invoicify vs FreshBooks</Link>
                                <Link to="/alternatives/wave" style={{ color: '#64748b', fontSize: '0.9rem', textDecoration: 'none' }}>Invoicify vs Wave</Link>
                                <Link to="/alternatives/zoho" style={{ color: '#64748b', fontSize: '0.9rem', textDecoration: 'none' }}>Invoicify vs Zoho Invoice</Link>
                                <Link to="/alternatives/invoice2go" style={{ color: '#64748b', fontSize: '0.9rem', textDecoration: 'none' }}>Invoicify vs Invoice2go</Link>
                                <Link to="/alternatives/paypal" style={{ color: '#64748b', fontSize: '0.9rem', textDecoration: 'none' }}>Invoicify vs PayPal</Link>
                                <Link to="/alternatives/invoicely" style={{ color: '#64748b', fontSize: '0.9rem', textDecoration: 'none' }}>Invoicify vs Invoicely</Link>
                                <Link to="/alternatives/invoiceninja" style={{ color: '#64748b', fontSize: '0.9rem', textDecoration: 'none' }}>Invoicify vs Invoice Ninja</Link>
                            </div>
                    </div>
                </div>
                <div style={{ borderTop: '1px solid #e2e8f0', padding: '1.5rem', textAlign: 'center' }}>
                    <p className="footer-copy">© {new Date().getFullYear()} Invoicify. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}
