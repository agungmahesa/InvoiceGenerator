import { formatCurrency, formatDate } from '../../utils/formatters';

export default function ElegantTemplate({ data }) {
    const { companyName, companyEmail, companyAddress, clientName, clientEmail, clientAddress,
        invoiceNumber, date, dueDate, items, taxRate, notes, currency, themeColor } = data;

    const subtotal = items.reduce((s, i) => s + i.quantity * i.price, 0);
    const taxAmount = (subtotal * taxRate) / 100;
    const total = subtotal + taxAmount;

    return (
        <div style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#111', backgroundColor: '#fff', minHeight: '100%', boxSizing: 'border-box' }}>
            {/* Dark header band */}
            <div style={{ backgroundColor: '#1a1a2e', padding: '40px 48px', marginBottom: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '700', color: '#fff', letterSpacing: '-0.5px' }}>{companyName}</h1>
                        <p style={{ margin: '8px 0 0 0', fontSize: '13px', color: 'rgba(255,255,255,0.55)', whiteSpace: 'pre-line' }}>{companyAddress} · {companyEmail}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <span style={{ display: 'inline-block', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: themeColor, fontWeight: '600', marginBottom: '6px' }}>Invoice</span>
                        <p style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: '#fff' }}>{invoiceNumber}</p>
                    </div>
                </div>
            </div>

            <div style={{ padding: '0 48px 40px' }}>
                {/* Billed To / Dates */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '32px', marginBottom: '40px' }}>
                    <div>
                        <p style={{ margin: '0 0 8px 0', fontSize: '10px', letterSpacing: '2px', color: '#aaa', textTransform: 'uppercase' }}>Billed to</p>
                        <p style={{ margin: 0, fontWeight: '700', fontSize: '15px' }}>{clientName}</p>
                        <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#555', whiteSpace: 'pre-line' }}>{clientAddress}</p>
                        <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#555' }}>{clientEmail}</p>
                    </div>
                    <div>
                        <p style={{ margin: '0 0 8px 0', fontSize: '10px', letterSpacing: '2px', color: '#aaa', textTransform: 'uppercase' }}>Issue Date</p>
                        <p style={{ margin: 0, fontWeight: '600', fontSize: '15px' }}>{formatDate(date)}</p>
                    </div>
                    <div>
                        <p style={{ margin: '0 0 8px 0', fontSize: '10px', letterSpacing: '2px', color: '#aaa', textTransform: 'uppercase' }}>Due Date</p>
                        <p style={{ margin: 0, fontWeight: '600', fontSize: '15px', color: themeColor }}>{formatDate(dueDate)}</p>
                    </div>
                </div>

                {/* Items */}
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '40px' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f8f9fa' }}>
                            <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#999', fontWeight: '600' }}>Item</th>
                            <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#999', fontWeight: '600', width: '70px' }}>Qty</th>
                            <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#999', fontWeight: '600', width: '120px' }}>Rate</th>
                            <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#999', fontWeight: '600', width: '120px' }}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, i) => (
                            <tr key={item.id} style={{ backgroundColor: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                                <td style={{ padding: '14px 16px', fontSize: '14px' }}>{item.description}</td>
                                <td style={{ padding: '14px 16px', textAlign: 'center', fontSize: '14px', color: '#555' }}>{item.quantity}</td>
                                <td style={{ padding: '14px 16px', textAlign: 'right', fontSize: '14px', color: '#555' }}>{formatCurrency(item.price, currency)}</td>
                                <td style={{ padding: '14px 16px', textAlign: 'right', fontSize: '14px', fontWeight: '600' }}>{formatCurrency(item.quantity * item.price, currency)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Totals + Notes */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '40px' }}>
                    {notes && (
                        <div style={{ flex: 1 }}>
                            <p style={{ margin: '0 0 6px 0', fontSize: '10px', letterSpacing: '2px', color: '#aaa', textTransform: 'uppercase' }}>Notes</p>
                            <p style={{ margin: 0, fontSize: '13px', color: '#555', whiteSpace: 'pre-line' }}>{notes}</p>
                        </div>
                    )}
                    <div style={{ width: '280px', flexShrink: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '8px 0', borderBottom: '1px solid #eee' }}>
                            <span style={{ color: '#555' }}>Subtotal</span><span>{formatCurrency(subtotal, currency)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '8px 0', borderBottom: '1px solid #eee' }}>
                            <span style={{ color: '#555' }}>Tax ({taxRate}%)</span><span>{formatCurrency(taxAmount, currency)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '800', padding: '16px', marginTop: '8px', backgroundColor: '#1a1a2e', color: '#fff', borderRadius: '8px' }}>
                            <span>Total Due</span><span style={{ color: themeColor }}>{formatCurrency(total, currency)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
