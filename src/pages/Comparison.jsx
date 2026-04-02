import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { competitors } from '../data/competitors';
import { ArrowRight, Check, X, FileText, Target, Zap } from 'lucide-react';
import './Landing.css'; // Navigation and footer styles
import './Comparison.css'; // Specific comparison styles

export default function Comparison() {
    const { competitor } = useParams();
    const data = competitors[competitor?.toLowerCase()];

    useEffect(() => {
        window.scrollTo(0, 0);
        if (data) {
            document.title = `${data.title} | Invoicify`;
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', data.description);
            }
        }
    }, [data]);

    if (!data) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="comp-page">

            {/* Navbar (Reused from Landing) */}
            <nav className="lnav" aria-label="Main navigation">
                <div className="lnav-inner">
                    <Link to="/" className="lnav-logo">
                        <div className="lnav-logo-icon"><FileText size={18} /></div>
                        <span className="lnav-logo-text">Invoicify</span>
                    </Link>
                    <div className="lnav-links" style={{ justifyContent: 'flex-end', paddingRight: '1rem' }}>
                        <Link to="/app" style={{ fontWeight: 600 }}>Open App</Link>
                    </div>
                    <Link to="/app" className="lnav-cta">
                        Create Free Invoice <ArrowRight size={16} />
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="comp-hero">
                <div className="comp-hero-inner">
                    <div className="comp-badge">
                        <Target size={16} /> Alternative to {data.name}
                    </div>

                    <h1 className="comp-title">
                        Stop overpaying for <span className="comp-title-highlight">{data.name}</span>.<br />
                        Start generating for free.
                    </h1>

                    <p className="comp-desc">
                        {data.heroSlogan} {data.description}
                    </p>

                    <div className="comp-hero-actions">
                        <Link to="/app" className="comp-btn-primary">
                            Start Using Invoicify Free <ArrowRight size={20} style={{ marginLeft: '8px' }} />
                        </Link>
                        <a href="#comparison-table" className="comp-btn-secondary">
                            See Comparison
                        </a>
                    </div>
                </div>
            </section>

            {/* Comparison Table Section */}
            <section id="comparison-table" className="comp-matchup">
                <div className="comp-matchup-header">
                    <h2 className="comp-matchup-title">Invoicify vs {data.name}</h2>
                    <p className="comp-matchup-subtitle">A side-by-side look at why modern businesses choose Invoicify.</p>
                </div>

                <div className="comp-grid">
                    {/* Invoicify Card */}
                    <div className="comp-card-winner">
                        <div className="comp-winner-tag">Winner</div>

                        <div className="comp-card-header">
                            <div className="comp-icon-box">
                                <FileText size={32} />
                            </div>
                            <h3 className="comp-card-title">Invoicify</h3>
                        </div>

                        <div className="comp-pricing">
                            <span className="comp-pricing-big">{data.pricing.invoicify.split(' ')[0]}</span>
                            <span className="comp-pricing-small">{data.pricing.invoicify.substring(data.pricing.invoicify.indexOf(' '))}</span>
                            <div className="comp-pricing-note">No hidden fees, no onboarding flow.</div>
                        </div>

                        <ul className="comp-features">
                            {data.pros.map((pro, index) => (
                                <li key={index} className="comp-feature-item">
                                    <div className="comp-check-icon"><Check size={20} strokeWidth={3} /></div>
                                    <span className="comp-feature-text">{pro}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="comp-card-footer">
                            <Link to="/app" className="comp-btn-block">
                                Create Invoice Now <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>

                    {/* Competitor Card */}
                    <div className="comp-card-loser">
                        <div className="comp-card-header">
                            <div className="comp-icon-box-loser">
                                {data.name.charAt(0)}
                            </div>
                            <h3 className="comp-card-title">{data.name}</h3>
                        </div>

                        <div className="comp-pricing">
                            <span className="comp-pricing-big">{data.pricing.competitor.split(' ')[0]}</span>
                            <div className="comp-pricing-note" style={{ marginTop: '0.75rem', fontSize: '1rem' }}>
                                {data.pricing.competitor.substring(data.pricing.competitor.indexOf(' '))}
                            </div>
                        </div>

                        <ul className="comp-features">
                            {data.cons.map((con, index) => (
                                <li key={index} className="comp-feature-item">
                                    <div className="comp-x-icon"><X size={20} strokeWidth={3} /></div>
                                    <span className="comp-feature-text">{con}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Feature Fast Track */}
            <section className="comp-banner">
                <Zap size={48} className="comp-banner-icon" />
                <h2 className="comp-banner-title">No accounts. No onboarding.</h2>
                <p className="comp-banner-desc">
                    Unlike {data.name}, Invoicify doesn't force you into a walled garden. You simply type your details into a beautiful editor and click download. It's that simple.
                </p>
                <Link to="/app" className="comp-btn-white">
                    Try the Editor
                </Link>
            </section>

            {/* Footer reused from Landing */}
            <footer className="lnav-footer" role="contentinfo" style={{ marginTop: '4rem' }}>
                <div className="lnav-inner" style={{ padding: '3rem 1.5rem', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '2rem' }}>
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
    );
}
