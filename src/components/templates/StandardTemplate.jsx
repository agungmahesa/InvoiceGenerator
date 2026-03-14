import { formatCurrency, formatDate } from '../../utils/formatters';

export default function StandardTemplate({ data }) {
    const { companyName, companyEmail, companyAddress, clientName, clientEmail, clientAddress,
        invoiceNumber, date, dueDate, items, taxRate, notes, currency, themeColor } = data;

    const subtotal = items.reduce((s, i) => s + i.quantity * i.price, 0);
    const taxAmount = (subtotal * taxRate) / 100;
    const total = subtotal + taxAmount;

    return (
        <div style={{ padding: '48px', fontFamily: 'Arial, Helvetica, sans-serif', color: '#222', backgroundColor: '#fff', minHeight: '100%', boxSizing: 'border-box' }}>
            <table style={{ width: '100%', marginBottom: '36px' }}>
                <tbody>
                    <tr>
                        <td>
                            <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 'bold', color: themeColor }}>{companyName}</h1>
                            <p style={{ margin: '6px 0 0', fontSize: '13px', color: '#666', whiteSpace: 'pre-line' }}>{companyAddress}<br />{companyEmail}</p>
                        </td>
                        <td style={{ textAlign: 'right', verticalAlign: 'top' }}>
                            <h2 style={{ margin: 0, fontSize: '30px', fontWeight: 'bold', color: '#111', textTransform: 'uppercase' }}>Invoice</h2>
                            <p style={{ margin: '6px 0 0', fontSize: '14px' }}><strong>No:</strong> {invoiceNumber}</p>
                            <p style={{ margin: '3px 0 0', fontSize: '13px', color: '#555' }}><strong>Date:</strong> {formatDate(date)}</p>
                            <p style={{ margin: '3px 0 0', fontSize: '13px', color: '#555' }}><strong>Due:</strong> {formatDate(dueDate)}</p>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div style={{ display: 'flex', gap: '48px', marginBottom: '36px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '6px' }}>
                <div>
                    <p style={{ margin: '0 0 6px', fontSize: '11px', textTransform: 'uppercase', color: '#999', letterSpacing: '1px' }}>Bill From</p>
                    <p style={{ margin: 0, fontWeight: 'bold' }}>{companyName}</p>
                    <p style={{ margin: '3px 0 0', fontSize: '13px', color: '#555', whiteSpace: 'pre-line' }}>{companyAddress}</p>
                </div>
                <div>
                    <p style={{ margin: '0 0 6px', fontSize: '11px', textTransform: 'uppercase', color: '#999', letterSpacing: '1px' }}>Bill To</p>
                    <p style={{ margin: 0, fontWeight: 'bold' }}>{clientName}</p>
                    <p style={{ margin: '3px 0 0', fontSize: '13px', color: '#555', whiteSpace: 'pre-line' }}>{clientAddress}<br />{clientEmail}</p>
                </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '36px', fontSize: '14px' }}>
                <thead>
                    <tr style={{ borderTop: `3px solid ${themeColor}`, borderBottom: `1px solid ${themeColor}44` }}>
                        <th style={{ padding: '10px 8px', textAlign: 'left', color: themeColor }}>Description</th>
                        <th style={{ padding: '10px 8px', textAlign: 'center', color: themeColor, width: '70px' }}>Qty</th>
                        <th style={{ padding: '10px 8px', textAlign: 'right', color: themeColor, width: '110px' }}>Unit Price</th>
                        <th style={{ padding: '10px 8px', textAlign: 'right', color: themeColor, width: '120px' }}>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, i) => (
                        <tr key={item.id} style={{ borderBottom: '1px solid #eee', backgroundColor: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                            <td style={{ padding: '12px 8px' }}>{item.description}</td>
                            <td style={{ padding: '12px 8px', textAlign: 'center', color: '#555' }}>{item.quantity}</td>
                            <td style={{ padding: '12px 8px', textAlign: 'right', color: '#555' }}>{formatCurrency(item.price, currency)}</td>
                            <td style={{ padding: '12px 8px', textAlign: 'right', fontWeight: 'bold' }}>{formatCurrency(item.quantity * item.price, currency)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '32px' }}>
                <table style={{ width: '260px', fontSize: '14px', borderCollapse: 'collapse' }}>
                    <tbody>
                        <tr>
                            <td style={{ padding: '7px 8px', color: '#555' }}>Subtotal</td>
                            <td style={{ padding: '7px 8px', textAlign: 'right' }}>{formatCurrency(subtotal, currency)}</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '7px 8px', color: '#555' }}>Tax ({taxRate}%)</td>
                            <td style={{ padding: '7px 8px', textAlign: 'right' }}>{formatCurrency(taxAmount, currency)}</td>
                        </tr>
                        <tr style={{ borderTop: `2px solid ${themeColor}`, backgroundColor: `${themeColor}10` }}>
                            <td style={{ padding: '10px 8px', fontWeight: 'bold', fontSize: '15px', color: themeColor }}>Total</td>
                            <td style={{ padding: '10px 8px', textAlign: 'right', fontWeight: 'bold', fontSize: '15px', color: themeColor }}>{formatCurrency(total, currency)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {notes && (
                <div style={{ borderTop: '1px solid #ddd', paddingTop: '20px', fontSize: '13px', color: '#555' }}>
                    <strong style={{ display: 'block', marginBottom: '6px' }}>Notes:</strong>
                    <p style={{ margin: 0, whiteSpace: 'pre-line' }}>{notes}</p>
                </div>
            )}
        </div>
    );
}
