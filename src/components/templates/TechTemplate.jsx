import { formatCurrency, formatDate } from '../../utils/formatters';

export default function TechTemplate({ data }) {
    const { companyName, companyEmail, companyAddress, clientName, clientEmail, clientAddress,
        invoiceNumber, date, dueDate, items, taxRate, notes, currency, themeColor } = data;

    const subtotal = items.reduce((s, i) => s + i.quantity * i.price, 0);
    const taxAmount = (subtotal * taxRate) / 100;
    const total = subtotal + taxAmount;

    return (
        <div style={{ fontFamily: '"SF Mono", "Fira Code", "Courier New", monospace', color: '#d4d4d4', backgroundColor: '#0d1117', minHeight: '100%', boxSizing: 'border-box' }}>
            {/* Scanline header */}
            <div style={{ borderBottom: `1px solid ${themeColor}44`, padding: '32px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: `linear-gradient(180deg, ${themeColor}08 0%, transparent 100%)` }}>
                <div>
                    <span style={{ color: themeColor, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>// company</span>
                    <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 'bold', color: '#f0f0f0', letterSpacing: '0.5px' }}>{companyName}</h1>
                    <p style={{ margin: '6px 0 0', fontSize: '12px', color: '#777', whiteSpace: 'pre-line' }}>{companyAddress}</p>
                    <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#777' }}>{companyEmail}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <span style={{ color: themeColor, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>// invoice</span>
                    <p style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#f0f0f0' }}>{invoiceNumber}</p>
                    <p style={{ margin: '6px 0 0', fontSize: '12px', color: '#777' }}>issued: <span style={{ color: '#aaa' }}>{formatDate(date)}</span></p>
                    <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#777' }}>due: <span style={{ color: themeColor }}>{formatDate(dueDate)}</span></p>
                </div>
            </div>

            <div style={{ padding: '32px 48px' }}>
                {/* Client info */}
                <div style={{ marginBottom: '32px', padding: '20px', background: '#161b22', border: `1px solid ${themeColor}33`, borderRadius: '8px', fontFamily: 'monofonts, monospace' }}>
                    <span style={{ color: themeColor, fontSize: '11px', letterSpacing: '2px', display: 'block', marginBottom: '12px' }}>{'// client_info {'}</span>
                    <p style={{ margin: '0 0 4px 20px', fontSize: '13px' }}><span style={{ color: '#9ecbff' }}>name</span>: <span style={{ color: '#a8ff78' }}>"{clientName}"</span></p>
                    <p style={{ margin: '0 0 4px 20px', fontSize: '13px', whiteSpace: 'pre-line' }}><span style={{ color: '#9ecbff' }}>address</span>: <span style={{ color: '#a8ff78' }}>"{clientAddress}"</span></p>
                    <p style={{ margin: '0 0 0 20px', fontSize: '13px' }}><span style={{ color: '#9ecbff' }}>email</span>: <span style={{ color: '#a8ff78' }}>"{clientEmail}"</span></p>
                    <span style={{ color: themeColor, fontSize: '11px', letterSpacing: '2px', display: 'block', marginTop: '12px' }}>{'}'}</span>
                </div>

                {/* Items table */}
                <div style={{ marginBottom: '32px' }}>
                    <span style={{ color: themeColor, fontSize: '11px', letterSpacing: '2px', display: 'block', marginBottom: '12px' }}>{'// line_items = ['}</span>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                        <thead>
                            <tr style={{ borderBottom: `1px solid ${themeColor}44` }}>
                                <th style={{ padding: '8px 12px', textAlign: 'left', color: '#9ecbff', fontWeight: '400', letterSpacing: '1px' }}>description</th>
                                <th style={{ padding: '8px 12px', textAlign: 'center', color: '#9ecbff', fontWeight: '400', width: '70px' }}>qty</th>
                                <th style={{ padding: '8px 12px', textAlign: 'right', color: '#9ecbff', fontWeight: '400', width: '120px' }}>price</th>
                                <th style={{ padding: '8px 12px', textAlign: 'right', color: '#9ecbff', fontWeight: '400', width: '130px' }}>total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => (
                                <tr key={item.id} style={{ borderBottom: `1px solid ${themeColor}1a` }}>
                                    <td style={{ padding: '12px', color: '#a8ff78' }}>{item.description}</td>
                                    <td style={{ padding: '12px', textAlign: 'center', color: '#d4d4d4' }}>{item.quantity}</td>
                                    <td style={{ padding: '12px', textAlign: 'right', color: '#d4d4d4' }}>{formatCurrency(item.price, currency)}</td>
                                    <td style={{ padding: '12px', textAlign: 'right', color: '#f0f0f0', fontWeight: 'bold' }}>{formatCurrency(item.quantity * item.price, currency)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <span style={{ color: themeColor, fontSize: '11px', letterSpacing: '2px', display: 'block', marginTop: '12px' }}>]</span>
                </div>

                {/* Totals */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '32px' }}>
                    <div style={{ width: '280px', background: '#161b22', border: `1px solid ${themeColor}33`, borderRadius: '8px', padding: '16px 20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px', color: '#777' }}>
                            <span>subtotal</span><span style={{ color: '#d4d4d4' }}>{formatCurrency(subtotal, currency)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', borderBottom: `1px solid ${themeColor}33`, paddingBottom: '12px', marginBottom: '12px', color: '#777' }}>
                            <span>tax ({taxRate}%)</span><span style={{ color: '#d4d4d4' }}>{formatCurrency(taxAmount, currency)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold', color: themeColor }}>
                            <span>TOTAL</span><span>{formatCurrency(total, currency)}</span>
                        </div>
                    </div>
                </div>

                {notes && (
                    <div style={{ padding: '16px', background: '#161b22', border: `1px solid ${themeColor}33`, borderRadius: '8px', fontFamily: 'monospace', fontSize: '12px', color: '#777' }}>
                        <span style={{ color: themeColor }}>// notes</span><br />
                        <span style={{ color: '#aaa', whiteSpace: 'pre-line' }}>{notes}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
