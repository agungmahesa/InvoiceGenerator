import { formatCurrency, formatDate } from '../../utils/formatters';

export default function BoldTemplate({ data }) {
    const { companyName, companyEmail, companyAddress, clientName, clientEmail, clientAddress,
        invoiceNumber, date, dueDate, items, taxRate, notes, currency, themeColor } = data;

    const subtotal = items.reduce((s, i) => s + i.quantity * i.price, 0);
    const taxAmount = (subtotal * taxRate) / 100;
    const total = subtotal + taxAmount;

    return (
        <div style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#111', backgroundColor: '#fff', minHeight: '100%', boxSizing: 'border-box', position: 'relative', overflow: 'hidden' }}>
            {/* Big bold left accent bar */}
            <div style={{ position: 'absolute', left: 0, top: 0, width: '8px', height: '100%', background: `linear-gradient(180deg, ${themeColor}, #a78bfa)` }} />

            <div style={{ padding: '48px 48px 48px 56px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '48px' }}>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '36px', fontWeight: '900', color: themeColor, letterSpacing: '-1px', lineHeight: 1.1 }}>{companyName}</h1>
                        <p style={{ margin: '8px 0 0 0', fontSize: '13px', color: '#777', whiteSpace: 'pre-line' }}>{companyAddress}<br />{companyEmail}</p>
                    </div>
                    <div style={{ textAlign: 'right', background: '#f8f8f8', padding: '16px 24px', borderRadius: '12px' }}>
                        <p style={{ margin: '0 0 4px 0', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#bbb' }}>Invoice Number</p>
                        <p style={{ margin: '0 0 12px 0', fontSize: '20px', fontWeight: '800' }}>{invoiceNumber}</p>
                        <p style={{ margin: '0 0 2px 0', fontSize: '12px', color: '#666' }}>Issued: {formatDate(date)}</p>
                        <p style={{ margin: 0, fontSize: '12px', color: themeColor, fontWeight: '700' }}>Due: {formatDate(dueDate)}</p>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '40px', padding: '24px', border: `2px solid ${themeColor}22`, borderRadius: '12px' }}>
                    <div>
                        <p style={{ margin: '0 0 6px 0', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#bbb' }}>Billed To</p>
                        <p style={{ margin: 0, fontSize: '16px', fontWeight: '700' }}>{clientName}</p>
                        <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#666', whiteSpace: 'pre-line' }}>{clientAddress}<br />{clientEmail}</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end' }}>
                        <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#bbb', textTransform: 'uppercase', letterSpacing: '1px' }}>Amount Due</p>
                        <p style={{ margin: 0, fontSize: '40px', fontWeight: '900', color: themeColor, letterSpacing: '-1px' }}>{formatCurrency(total, currency)}</p>
                    </div>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '40px' }}>
                    <thead>
                        <tr style={{ background: themeColor, color: '#fff' }}>
                            <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600', borderRadius: '0' }}>Description</th>
                            <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600', width: '80px' }}>Qty</th>
                            <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600', width: '120px' }}>Rate</th>
                            <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600', width: '130px' }}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, i) => (
                            <tr key={item.id} style={{ backgroundColor: i % 2 === 0 ? '#fafafa' : '#fff', borderBottom: '1px solid #f0f0f0' }}>
                                <td style={{ padding: '14px 16px', fontSize: '14px' }}>{item.description}</td>
                                <td style={{ padding: '14px 16px', textAlign: 'center', fontSize: '14px', color: '#777' }}>{item.quantity}</td>
                                <td style={{ padding: '14px 16px', textAlign: 'right', fontSize: '14px', color: '#777' }}>{formatCurrency(item.price, currency)}</td>
                                <td style={{ padding: '14px 16px', textAlign: 'right', fontSize: '14px', fontWeight: '700' }}>{formatCurrency(item.quantity * item.price, currency)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '40px' }}>
                    <div style={{ width: '280px' }}>
                        {[['Subtotal', formatCurrency(subtotal, currency)], [`Tax (${taxRate}%)`, formatCurrency(taxAmount, currency)]].map(([label, val]) => (
                            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee', fontSize: '14px', color: '#666' }}>
                                <span>{label}</span><span>{val}</span>
                            </div>
                        ))}
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 16px', marginTop: '8px', fontSize: '18px', fontWeight: '800', background: `linear-gradient(135deg, ${themeColor}, #a78bfa)`, color: '#fff', borderRadius: '10px' }}>
                            <span>TOTAL</span><span>{formatCurrency(total, currency)}</span>
                        </div>
                    </div>
                </div>

                {notes && (
                    <div style={{ padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '8px', borderLeft: `4px solid ${themeColor}` }}>
                        <p style={{ margin: '0 0 4px 0', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', color: '#bbb' }}>Notes</p>
                        <p style={{ margin: 0, fontSize: '13px', color: '#555', whiteSpace: 'pre-line' }}>{notes}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
