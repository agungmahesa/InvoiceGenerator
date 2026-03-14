import { useRef } from 'react'
import { Download, FileText, Settings, LayoutTemplate, Plus, RefreshCw } from 'lucide-react'
import Editor from './components/Editor'
import Preview from './components/Preview'
import { useInvoice } from './InvoiceContext'
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
  const { data, updateData } = useInvoice()
  const printRef = useRef()
  const isDownloading = useRef(false)

  const handleDownloadPdf = async () => {
    if (isDownloading.current) return
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
    } finally {
      isDownloading.current = false
    }
  }

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon"><FileText size={20} /></div>
            <span className="logo-text">Invoicify</span>
          </div>
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
          <p className="text-xs text-muted">Invoicify · {new Date().getFullYear()}</p>
          <p className="text-xs text-muted">10 templates available</p>
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
            <Editor />
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
