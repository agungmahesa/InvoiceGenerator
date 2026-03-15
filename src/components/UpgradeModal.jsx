import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { X, CheckCircle, Unlock, AlertCircle, Loader2 } from 'lucide-react';
import { setProStatus } from '../utils/storage';
import { useInvoice } from '../InvoiceContext';

// NOTE: Uses Gumroad's verify license API (CORS friendly)
const verifyGumroadLicense = async (licenseKey) => {
    // We pass the product permalink. Update this if changing the Gumroad product.
    const permalink = 'pyvue';

    // In a real app we'd hide the product_id/permalink, but Gumroad's /verify endpoint allows frontend calls
    const res = await fetch('https://api.gumroad.com/v2/licenses/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            product_permalink: permalink,
            license_key: licenseKey
        })
    });

    const data = await res.json();
    return data;
};

export default function UpgradeModal({ isOpen, onClose }) {
    const { setIsPro } = useInvoice();
    const [key, setKey] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMsg, setErrorMsg] = useState('');

    if (!isOpen) return null;

    const handleVerifyClick = async () => {
        if (!key.trim()) return;

        // For local development / MVP, allow a hardcoded test key
        if (key.trim() === 'INVOICIFY-PRO-TEST-KEY-2026') {
            setStatus('success');
            setTimeout(() => {
                setProStatus(true, key);
                setIsPro(true);
                onClose();
            }, 1500);
            return;
        }

        setStatus('loading');
        try {
            const result = await verifyGumroadLicense(key.trim());
            if (result.success && !result.purchase.refunded) {
                setStatus('success');
                setTimeout(() => {
                    setProStatus(true, key.trim());
                    setIsPro(true);
                    onClose();
                }, 1500);
            } else {
                setStatus('error');
                setErrorMsg(result.message || 'Invalid or refunded license key.');
            }
        } catch (err) {
            setStatus('error');
            setErrorMsg('Failed to verify. Please check your internet connection.');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-6 text-white relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                    <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
                        <Unlock size={24} /> Upgrade to Pro
                    </h2>
                    <p className="text-indigo-100 text-sm">
                        Unlock powerful features for your business for just $9/month.
                    </p>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                    <ul className="space-y-3">
                        {[
                            'Unlimited PDF invoices perfectly tailored to your brand',
                            'Remove the "Created with Mstudio" watermark',
                            'Upload and embed your custom Company Logo',
                            'Save Client Data for fast 1-click invoicing',
                            'Priority support and new template early access'
                        ].map((feat, i) => (
                            <li key={i} className="flex gap-3 text-sm text-gray-700">
                                <CheckCircle size={18} className="text-green-500 shrink-0" />
                                <span>{feat}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Gumroad CTA */}
                    <div className="pt-2">
                        <a
                            href="https://gumroad.com/l/pyvue"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white w-full py-3 rounded-xl font-bold flex items-center justify-center transition-all shadow-md hover:shadow-lg"
                        >
                            Get Pro License via Gumroad
                        </a>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                        <div className="relative flex justify-center text-xs text-gray-400 capitalize bg-white px-2 w-fit mx-auto">
                            Already purchased?
                        </div>
                    </div>

                    {/* License Entry */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Enter License Key
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="XXXX-XXXX-XXXX-XXXX"
                                value={key}
                                onChange={(e) => { setKey(e.target.value); setStatus('idle'); }}
                                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none uppercase font-mono"
                            />
                            <button
                                onClick={handleVerifyClick}
                                disabled={status === 'loading' || !key.trim()}
                                className="bg-gray-900 hover:bg-black disabled:bg-gray-400 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center min-w-[90px]"
                            >
                                {status === 'loading' ? <Loader2 size={16} className="animate-spin" /> : 'Activate'}
                            </button>
                        </div>

                        {/* Status Messages */}
                        {status === 'error' && (
                            <p className="text-red-600 text-sm flex items-center gap-1.5 mt-2 bg-red-50 p-2 rounded-md">
                                <AlertCircle size={14} /> {errorMsg}
                            </p>
                        )}
                        {status === 'success' && (
                            <p className="text-green-600 text-sm flex items-center gap-1.5 mt-2 bg-green-50 p-2 rounded-md font-medium">
                                <CheckCircle size={14} /> License verified! Unlocking Pro...
                            </p>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
