import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { competitors } from '../data/competitors';
import { ArrowRight, CheckCircle2, XCircle, FileText, Download, Target, Zap } from 'lucide-react';
import './Landing.css'; // Reusing landing page styles for consistency

export default function Comparison() {
    const { competitor } = useParams();
    const data = competitors[competitor?.toLowerCase()];

    useEffect(() => {
        // Scroll to top on load
        window.scrollTo(0, 0);

        // Update document title and meta tags for SEO
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
        <div className="landing-page bg-slate-50 min-h-screen text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">

            {/* Navbar (Reused structure from Landing) */}
            <nav className="fixed w-full top-0 z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link to="/" className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition" style={{ textDecoration: 'none' }}>
                            <div className="bg-indigo-600 p-1.5 rounded-lg">
                                <FileText size={20} className="text-white" />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-slate-900">Invoicify</span>
                        </Link>
                        <div className="flex items-center gap-4">
                            <Link to="/app" className="hidden md:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-all shadow-sm">
                                Open App
                            </Link>
                            <Link to="/app" className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 hover:shadow-md hover:shadow-indigo-500/20 transition-all">
                                Create Free Invoice <ArrowRight size={16} className="ml-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-indigo-50/50 via-white to-transparent pointer-events-none"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-medium mb-8">
                        <Target size={16} /> Alternative to {data.name}
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
                        Stop overpaying for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{data.name}</span>.<br />
                        Start generating for free.
                    </h1>

                    <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        {data.heroSlogan} {data.description}
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link to="/app" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-0.5 transition-all w-full sm:w-auto">
                            Start Using Invoicify Free <ArrowRight size={18} className="ml-2" />
                        </Link>
                        <a href="#comparison" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-600 bg-white border border-slate-200 rounded-full hover:bg-slate-50 hover:text-slate-900 transition-all w-full sm:w-auto">
                            See Comparison
                        </a>
                    </div>
                </div>
            </section>

            {/* Comparison Table Section */}
            <section id="comparison" className="py-24 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                            Invoicify vs {data.name}
                        </h2>
                        <p className="text-lg text-slate-500">A side-by-side look at why modern businesses choose Invoicify.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch">

                        {/* Invoicify Card */}
                        <div className="bg-indigo-50/40 rounded-[2rem] p-8 sm:p-10 border border-indigo-100 shadow-sm relative overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                            <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl tracking-wider uppercase">WINNER</div>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="bg-indigo-600 p-3 rounded-xl shadow-sm text-white">
                                    <FileText size={28} />
                                </div>
                                <h3 className="text-3xl font-extrabold text-slate-900">Invoicify</h3>
                            </div>

                            <div className="mb-10 pb-8 border-b border-indigo-200/50">
                                <div className="flex items-baseline mb-2">
                                    <span className="text-5xl font-extrabold text-indigo-900">{data.pricing.invoicify.split(' ')[0]}</span>
                                    <span className="text-indigo-600/80 font-semibold ml-2 text-lg">{data.pricing.invoicify.substring(data.pricing.invoicify.indexOf(' '))}</span>
                                </div>
                                <p className="text-sm text-indigo-800/60 font-medium">No hidden fees, no onboarding flow.</p>
                            </div>

                            <ul className="space-y-5 mb-10 flex-grow">
                                {data.pros.map((pro, index) => (
                                    <li key={index} className="flex items-start gap-4">
                                        <div className="bg-emerald-100 p-1 rounded-full shrink-0 mt-0.5">
                                            <CheckCircle2 className="text-emerald-600" size={18} />
                                        </div>
                                        <span className="text-slate-700 font-medium leading-relaxed">{pro}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-auto pt-8">
                                <Link to="/app" className="flex items-center justify-center w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 hover:shadow-lg transition-all">
                                    Create Invoice Now <ArrowRight size={18} className="ml-2" />
                                </Link>
                            </div>
                        </div>

                        {/* Competitor Card */}
                        <div className="bg-white rounded-[2rem] p-8 sm:p-10 border border-slate-200 shadow-sm opacity-90 flex flex-col relative overflow-hidden">
                            <div className="flex items-center gap-4 mb-8 grayscale opacity-70">
                                <div className="bg-slate-100 p-3 rounded-xl border border-slate-200 flex items-center justify-center w-[52px] h-[52px]">
                                    <div className="font-bold text-slate-400 text-xl">{data.name.charAt(0)}</div>
                                </div>
                                <h3 className="text-3xl font-bold text-slate-500">{data.name}</h3>
                            </div>

                            <div className="mb-10 pb-8 border-b border-slate-100">
                                <div className="flex items-baseline mb-2">
                                    <span className="text-5xl font-extrabold text-slate-400">{data.pricing.competitor.split(' ')[0]}</span>
                                </div>
                                <p className="text-sm text-slate-400 font-medium max-w-[80%]">{data.pricing.competitor.substring(data.pricing.competitor.indexOf(' '))}</p>
                            </div>

                            <ul className="space-y-5 flex-grow">
                                {data.cons.map((con, index) => (
                                    <li key={index} className="flex items-start gap-4 opacity-75">
                                        <div className="bg-rose-50 p-1 rounded-full shrink-0 mt-0.5">
                                            <XCircle className="text-rose-400" size={18} />
                                        </div>
                                        <span className="text-slate-500 font-medium leading-relaxed">{con}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
            </section>

            {/* Feature Fast Track */}
            <section className="py-20 bg-slate-900 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <Zap size={48} className="mx-auto text-amber-400 mb-6" />
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">No accounts. No onboarding.</h2>
                    <p className="text-xl text-slate-300 mb-10">
                        Unlike {data.name}, Invoicify doesn't force you into a walled garden. You simply type your details into a beautiful editor and click download. It's that simple.
                    </p>
                    <Link to="/app" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-900 bg-white rounded-full hover:bg-slate-100 hover:shadow-lg transition-all">
                        Try the Editor
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-200 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center justify-center md:justify-start gap-2 text-indigo-600">
                        <div className="bg-indigo-600 p-1 rounded">
                            <FileText size={16} className="text-white" />
                        </div>
                        <span className="font-bold text-lg text-slate-900">Invoicify</span>
                    </div>
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} Invoicify. Not affiliated with {data.name}.
                    </p>
                </div>
            </footer>
        </div>
    );
}
