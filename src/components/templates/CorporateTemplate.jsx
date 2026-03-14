import { formatCurrency, formatDate } from '../../utils/formatters';

export default function CorporateTemplate({ data }) {
    const { companyName, companyEmail, companyAddress, clientName, clientEmail, clientAddress,
        invoiceNumber, date, dueDate, items, taxRate, notes, currency, themeColor } = data;

    const subtotal = items.reduce((s, i) => s + i.quantity * i.price, 0);
    const taxAmount = (subtotal * taxRate) / 100;
    const total = subtotal + taxAmount;

    return (
        <div style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#1e293b', backgroundColor: '#fff', minHeight: '100%', boxSizing: 'border-box' }}>
            {/* Top stripe */}
            <div style={{ height: '5px', background: `linear-gradient(90deg, ${themeColor} 0%, #a78bfa 100%)` }} />

            <div style={{ padding: '40px 48px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
                    <div>
                        <div style={{ display: 'inline-block', background: themeColor, color: '#fff', fontWeight: '800', fontSize: '14px', padding: '6px 14px', borderRadius: '6px', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>
                            {companyName}
                        </div>
                        <p style={{ margin: 0, fontSize: '13px', color: '#64748b', whiteSpace: 'pre-line' }}>{companyAddress}</p>
                        <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#64748b' }}>{companyEmail}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ margin: '0 0 4px 0', fontSize: '36px', fontWeight: '800', color: '#f1f5f9', lineHeight: 1 }}>INVOICE</p>
                        <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#334155' }}>{invoiceNumber}</p>
                        <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#94a3b8' }}>{formatDate(date)} – {formatDate(dueDate)}</p>
                    </div>
                </div>

                {/* Two column info */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '36px' }}>
                    <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '10px' }}>
                        <p style={{ margin: '0 0 8px', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#94a3b8' }}>Billed To</p>
                        <p style={{ margin: 0, fontWeight: '700', fontSize: '15px', color: '#0f172a' }}>{clientName}</p>
                        <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748b', whiteSpace: 'pre-line' }}>{clientAddress}</p>
                        <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#64748b' }}>{clientEmail}</p>
                    </div>
                    <div style={{ padding: '20px', background: themeColor, borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <p style={{ margin: '0 0 4px 0', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>Total Due</p>
                        <p style={{ margin: '0 0 8px', fontSize: '32px', fontWeight: '800', color: '#fff' }}>{formatCurrency(total, currency)}</p>
                        <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>Due: {formatDate(dueDate)}</p>
                    </div>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '36px' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                            {['Description', 'Qty', 'Rate', 'Amount'].map((h, i) => (
                                <th key={h} style={{ padding: '10px 12px', textAlign: i === 0 ? 'left' : i < 3 ? 'center' : 'right', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#94a3b8' }}>
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '14px 12px', fontSize: '14px', fontWeight: '500' }}>{item.description}</td>
                                <td style={{ padding: '14px 12px', textAlign: 'center', fontSize: '14px', color: '#64748b' }}>{item.quantity}</td>
                                <td style={{ padding: '14px 12px', textAlign: 'center', fontSize: '14px', color: '#64748b' }}>{formatCurrency(item.price, currency)}</td>
                                <td style={{ padding: '14px 12px', textAlign: 'right', fontSize: '14px', fontWeight: '600' }}>{formatCurrency(item.quantity * item.price, currency)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ width: '280px' }}>
                        {[['Subtotal', formatCurrency(subtotal, currency)], [`Tax (${taxRate}%)`, formatCurrency(taxAmount, currency)]].map(([l, v]) => (
                            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9', fontSize: '13px', color: '#64748b' }}>
                                <span>{l}</span><span style={{ fontWeight: '500', color: '#334155' }}>{v}</span>
                            </div>
                        ))}
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', fontSize: '17px', fontWeight: '800', borderTop: `2px solid ${themeColor}`, marginTop: '4px', color: themeColor }}>
                            <span>Total</span><span>{formatCurrency(total, currency)}</span>
                        </div>
                    </div>
                </div>

                {notes && (
                    <div style={{ marginTop: '32px', padding: '16px', background: '#f8fafc', borderRadius: '10px', fontSize: '13px', color: '#64748b', borderLeft: `3px solid ${themeColor}` }}>
                        <strong style={{ display: 'block', marginBottom: '4px', color: '#334155', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>Notes</strong>
                        <p style={{ margin: 0, whiteSpace: 'pre-line' }}>{notes}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
