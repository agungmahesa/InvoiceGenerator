import { formatCurrency, formatDate } from '../../utils/formatters';

export default function CreativeTemplate({ data }) {
    const { companyName, companyEmail, companyAddress, clientName, clientEmail, clientAddress,
        invoiceNumber, date, dueDate, items, taxRate, notes, currency, themeColor } = data;

    const subtotal = items.reduce((s, i) => s + i.quantity * i.price, 0);
    const taxAmount = (subtotal * taxRate) / 100;
    const total = subtotal + taxAmount;

    // Derive a lighter tint from the main color
    const tint = `${themeColor}18`;

    return (
        <div style={{ fontFamily: 'Inter, system-ui, sans-serif', color: '#1a1a1a', backgroundColor: '#fff', minHeight: '100%', boxSizing: 'border-box', position: 'relative', overflow: 'hidden' }}>
            {/* Background decoration circle */}
            <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '300px', height: '300px', borderRadius: '50%', background: tint, zIndex: 0 }} />
            <div style={{ position: 'absolute', bottom: '-100px', left: '-60px', width: '250px', height: '250px', borderRadius: '50%', background: tint, zIndex: 0 }} />

            <div style={{ position: 'relative', zIndex: 1, padding: '48px' }}>
                {/* Header */}
                <div style={{ marginBottom: '48px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <h1 style={{ margin: '0 0 6px', fontSize: '30px', fontWeight: '900', letterSpacing: '-0.5px', color: themeColor }}>{companyName}</h1>
                            <p style={{ margin: 0, fontSize: '13px', color: '#777', whiteSpace: 'pre-line' }}>{companyAddress} | {companyEmail}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: themeColor, color: '#fff', padding: '10px 20px', borderRadius: '100px' }}>
                                <span style={{ fontWeight: '800', fontSize: '16px', letterSpacing: '0.5px' }}>INVOICE</span>
                                <span style={{ fontSize: '13px', opacity: 0.85 }}>{invoiceNumber}</span>
                            </div>
                            <p style={{ margin: '10px 0 0', fontSize: '12px', color: '#888' }}>{formatDate(date)} → {formatDate(dueDate)}</p>
                        </div>
                    </div>
                </div>

                {/* Client info */}
                <div style={{ background: tint, borderRadius: '16px', padding: '24px', marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <p style={{ margin: '0 0 6px', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: themeColor, fontWeight: '600' }}>Billed To</p>
                        <p style={{ margin: 0, fontWeight: '700', fontSize: '16px' }}>{clientName}</p>
                        <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#666', whiteSpace: 'pre-line' }}>{clientAddress} | {clientEmail}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ margin: '0 0 4px', fontSize: '11px', color: '#999', textTransform: 'uppercase', letterSpacing: '1px' }}>Due Amount</p>
                        <p style={{ margin: 0, fontSize: '36px', fontWeight: '900', color: themeColor, letterSpacing: '-1px' }}>{formatCurrency(total, currency)}</p>
                    </div>
                </div>

                {/* Items */}
                <div style={{ marginBottom: '40px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 100px 100px', gap: '0', borderBottom: `2px solid ${themeColor}30`, paddingBottom: '10px', marginBottom: '4px' }}>
                        {['Service', 'Qty', 'Price', 'Total'].map((h, i) => (
                            <span key={h} style={{ fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: themeColor, fontWeight: '700', textAlign: i > 0 ? 'right' : 'left' }}>{h}</span>
                        ))}
                    </div>
                    {items.map((item, i) => (
                        <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '1fr 60px 100px 100px', gap: '0', padding: '14px 0', borderBottom: '1px solid #f0f0f0' }}>
                            <span style={{ fontSize: '14px' }}>{item.description}</span>
                            <span style={{ textAlign: 'right', fontSize: '14px', color: '#888' }}>{item.quantity}</span>
                            <span style={{ textAlign: 'right', fontSize: '14px', color: '#888' }}>{formatCurrency(item.price, currency)}</span>
                            <span style={{ textAlign: 'right', fontSize: '14px', fontWeight: '700' }}>{formatCurrency(item.quantity * item.price, currency)}</span>
                        </div>
                    ))}
                </div>

                {/* Totals */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '40px' }}>
                    <div style={{ width: '260px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '6px 0', color: '#888' }}>
                            <span>Subtotal</span><span style={{ color: '#333' }}>{formatCurrency(subtotal, currency)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '6px 0', color: '#888', borderBottom: '1px solid #eee' }}>
                            <span>Tax ({taxRate}%)</span><span style={{ color: '#333' }}>{formatCurrency(taxAmount, currency)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: '900', padding: '16px 20px', background: themeColor, color: '#fff', borderRadius: '12px', marginTop: '12px', letterSpacing: '-0.5px' }}>
                            <span>Total</span><span>{formatCurrency(total, currency)}</span>
                        </div>
                    </div>
                </div>

                {notes && (
                    <p style={{ fontSize: '13px', color: '#888', borderTop: '1px dashed #e0e0e0', paddingTop: '20px', whiteSpace: 'pre-line' }}>{notes}</p>
                )}
            </div>
        </div>
    );
}
