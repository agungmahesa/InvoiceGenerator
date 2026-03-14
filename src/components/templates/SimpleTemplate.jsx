import { formatCurrency, formatDate } from '../../utils/formatters';

export default function SimpleTemplate({ data }) {
    const { companyName, companyEmail, companyAddress, clientName, clientEmail, clientAddress,
        invoiceNumber, date, dueDate, items, taxRate, notes, currency, themeColor } = data;

    const subtotal = items.reduce((s, i) => s + i.quantity * i.price, 0);
    const taxAmount = (subtotal * taxRate) / 100;
    const total = subtotal + taxAmount;

    return (
        <div style={{ padding: '48px', fontFamily: 'Georgia, "Times New Roman", serif', color: '#333', backgroundColor: '#fffdf7', minHeight: '100%', boxSizing: 'border-box' }}>
            {/* Border frame look */}
            <div style={{ border: `2px solid ${themeColor}`, borderRadius: '3px', padding: '40px' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px', borderBottom: `1px solid ${themeColor}44`, paddingBottom: '32px' }}>
                    <h1 style={{ margin: '0 0 6px', fontSize: '28px', fontWeight: 'bold', color: themeColor, letterSpacing: '1px' }}>{companyName}</h1>
                    <p style={{ margin: 0, fontSize: '13px', color: '#888' }}>{companyAddress} · {companyEmail}</p>
                    <p style={{ margin: '20px 0 0', fontSize: '24px', fontWeight: 'bold', letterSpacing: '4px', textTransform: 'uppercase', color: '#111' }}>Invoice</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', fontSize: '14px' }}>
                    <div>
                        <strong>Billed To:</strong><br />
                        <span style={{ fontWeight: 'bold' }}>{clientName}</span><br />
                        <span style={{ color: '#666', whiteSpace: 'pre-line' }}>{clientAddress}<br />{clientEmail}</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ margin: 0 }}><strong>Invoice No:</strong> {invoiceNumber}</p>
                        <p style={{ margin: '6px 0 0' }}><strong>Date:</strong> {formatDate(date)}</p>
                        <p style={{ margin: '6px 0 0' }}><strong>Due:</strong> {formatDate(dueDate)}</p>
                    </div>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '32px', fontSize: '14px' }}>
                    <thead>
                        <tr>
                            <th style={{ padding: '8px 0', borderBottom: '2px solid #ccc', textAlign: 'left', fontStyle: 'italic' }}>Description</th>
                            <th style={{ padding: '8px 0', borderBottom: '2px solid #ccc', textAlign: 'center', fontStyle: 'italic', width: '60px' }}>Qty</th>
                            <th style={{ padding: '8px 0', borderBottom: '2px solid #ccc', textAlign: 'right', fontStyle: 'italic', width: '110px' }}>Price</th>
                            <th style={{ padding: '8px 0', borderBottom: '2px solid #ccc', textAlign: 'right', fontStyle: 'italic', width: '120px' }}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id}>
                                <td style={{ padding: '12px 0', borderBottom: '1px solid #ddd' }}>{item.description}</td>
                                <td style={{ padding: '12px 0', borderBottom: '1px solid #ddd', textAlign: 'center', color: '#666' }}>{item.quantity}</td>
                                <td style={{ padding: '12px 0', borderBottom: '1px solid #ddd', textAlign: 'right', color: '#666' }}>{formatCurrency(item.price, currency)}</td>
                                <td style={{ padding: '12px 0', borderBottom: '1px solid #ddd', textAlign: 'right' }}>{formatCurrency(item.quantity * item.price, currency)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div style={{ textAlign: 'right', marginBottom: '32px' }}>
                    <p style={{ margin: '0 0 4px', color: '#666', fontSize: '14px' }}>Subtotal: {formatCurrency(subtotal, currency)}</p>
                    <p style={{ margin: '0 0 4px', color: '#666', fontSize: '14px' }}>Tax ({taxRate}%): {formatCurrency(taxAmount, currency)}</p>
                    <p style={{ margin: '12px 0 0', fontSize: '20px', fontWeight: 'bold', color: themeColor, borderTop: '1px solid #ccc', paddingTop: '12px', display: 'inline-block' }}>Total: {formatCurrency(total, currency)}</p>
                </div>

                {notes && (
                    <div style={{ textAlign: 'center', fontSize: '13px', color: '#888', fontStyle: 'italic', borderTop: '1px dashed #ccc', paddingTop: '20px' }}>
                        {notes}
                    </div>
                )}
            </div>
        </div>
    );
}
