import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Download, FileText, LayoutTemplate, RefreshCw, ArrowLeft, Crown } from 'lucide-react'
import Editor from './components/Editor'
import Preview from './components/Preview'
import { useInvoice } from './InvoiceContext'
import { setProStatus } from './utils/storage'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import './App.css'

const TEMPLATES = [
  { id: 'modern', label: 'Modern' },
  { id: 'classic', label: 'Classic' },
  { id: 'minimalist', label: 'Minimalist' },
  { id: 'elegant', label: 'Elegant' },
  { id: 'bold', label: 'Bold' },
  { id: 'standard', label: 'Standard' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'creative', label: 'Creative' },
  { id: 'simple', label: 'Simple' },
  { id: 'tech', label: 'Tech' },
]

function App() {
  const { data, updateData, isPro, setIsPro, usageCount, setUsageCount } = useInvoice()
  const printRef = useRef()
  const isDownloading = useRef(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  // Listen for Gumroad successful payment event
  useEffect(() => {
    const handlePaymentSuccess = (e) => {
      // The Gumroad event sends details about the purchase.
      // E.g., e.detail gives us access to email, variants, standard fields.
      console.log("Gumroad Payment Success", e.detail);

      // Give them pro status
      setProStatus(true, 'auto-activated');
      setIsPro(true);
    };

    window.addEventListener('gumroad-payment-success', handlePaymentSuccess);
    return () => window.removeEventListener('gumroad-payment-success', handlePaymentSuccess);
  }, [setIsPro]);

  // Handle opening the Gumroad checkout popup
  const triggerUpgrade = () => {
    // If the gumroad script hasn't loaded properly for some reason, fallback to direct native URL
    if (typeof window.GumroadOverlay === 'undefined') {
      window.open('https://mstudiofun.gumroad.com/l/qrocz', '_blank');
      return;
    }

    // Attempt to invoke the overlay mathematically by creating an invisible link and clicking it.
    // This is how Gumroad's script hooks into elements.
    const link = document.createElement('a');
    link.href = 'https://mstudiofun.gumroad.com/l/qrocz';
    link.dataset.gumroadSingleProduct = 'true';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleDownloadPdf = async () => {
    if (isDownloading.current) return

    // Check Freemium limits
    if (!isPro && usageCount >= 3) {
      triggerUpgrade()
      return
    }

    isDownloading.current = true

    const element = printRef.current
    if (!element) { isDownloading.current = false; return }

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        width: element.scrollWidth,
        height: element.scrollHeight,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.save(`Invoice_${data.invoiceNumber}.pdf`)

      // Increment usage if successful and not pro
      if (!isPro) {
        import('./utils/storage').then(({ incrementMonthlyUsage }) => {
          const newCount = incrementMonthlyUsage();
          setUsageCount(newCount);
        });
      }
    } finally {
      isDownloading.current = false
    }
  }

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="logo-icon"><FileText size={20} /></div>
            <span className="logo-text">Invoicify</span>
          </Link>
        </div>
        <nav className="sidebar-nav">
          <button className="nav-item active">
            <LayoutTemplate size={18} /><span>Editor</span>
          </button>
          <button className="nav-item" onClick={() => window.location.reload()}>
            <RefreshCw size={18} /><span>New Invoice</span>
          </button>
        </nav>
        <div className="sidebar-footer">
          {!isPro ? (
            <div className="mb-4 p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
              <p className="text-xs font-semibold text-indigo-900 mb-1 flex items-center justify-between">
                Free Plan <span className="text-indigo-600">{usageCount}/3 used</span>
              </p>
              <div className="w-full bg-indigo-200 rounded-full h-1.5 mb-3">
                <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${Math.min((usageCount / 3) * 100, 100)}%` }}></div>
              </div>
              <button
                onClick={triggerUpgrade}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-md transition-colors"
              >
                <Crown size={14} /> Upgrade to Pro
              </button>
            </div>
          ) : (
            <div className="mb-4 p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center gap-2 text-white shadow-sm">
              <div className="bg-white/20 p-1.5 rounded-md"><Crown size={16} /></div>
              <div>
                <p className="text-xs font-bold">Pro Activated</p>
                <p className="text-[10px] text-indigo-100">Unlimited PDF exports</p>
              </div>
            </div>
          )}
          <Link to="/" className="nav-item" style={{ textDecoration: 'none' }}>
            <ArrowLeft size={16} /><span style={{ fontSize: '0.8rem' }}>Back to Home</span>
          </Link>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="workspace">
        {/* Editor Area */}
        <section className="editor-area">
          <header className="area-header">
            <h2>Invoice Details</h2>
          </header>
          <div className="scroll-area" style={{ flex: 1 }}>
            <Editor onUpgradeClick={triggerUpgrade} />
          </div>
        </section>

        {/* Preview Area */}
        <section className="preview-area">
          <header className="area-header">
            <div className="template-selector">
              <label className="text-sm font-medium" htmlFor="template-select">Template:</label>
              <select
                id="template-select"
                className="template-select"
                value={data.template}
                onChange={(e) => updateData('template', e.target.value)}
              >
                {TEMPLATES.map(t => (
                  <option key={t.id} value={t.id}>{t.label}</option>
                ))}
              </select>
            </div>
            <button className="btn btn-primary" id="download-pdf-btn" onClick={handleDownloadPdf}>
              <Download size={16} /> Download PDF
            </button>
          </header>

          {/* Visible scaled preview */}
          <div className="preview-content scroll-area">
            <div className="preview-scaler">
              <div className="invoice-paper">
                <Preview />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Hidden full-size render for PDF export */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '794px', /* A4 at 96dpi */
        pointerEvents: 'none',
        opacity: 0,
        zIndex: -1,
        overflow: 'hidden',
      }}>
        <div ref={printRef} style={{ width: '794px', backgroundColor: '#fff' }}>
          <Preview />
        </div>
      </div>
    </div>
  )
}

export default App
