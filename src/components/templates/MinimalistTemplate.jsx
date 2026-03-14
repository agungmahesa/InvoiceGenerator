import { formatCurrency, formatDate } from '../../utils/formatters';

export default function MinimalistTemplate({ data }) {
    const { companyName, companyEmail, companyAddress, clientName, clientEmail, clientAddress,
        invoiceNumber, date, dueDate, items, taxRate, notes, currency, themeColor } = data;

    const subtotal = items.reduce((s, i) => s + i.quantity * i.price, 0);
    const taxAmount = (subtotal * taxRate) / 100;
    const total = subtotal + taxAmount;

    return (
        <div style={{ padding: '64px', fontFamily: 'Inter, system-ui, sans-serif', color: '#111', backgroundColor: '#fff', minHeight: '100%', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '64px' }}>
                <div>
                    <p style={{ margin: 0, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#999', marginBottom: '8px' }}>Invoice From</p>
                    <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '600' }}>{companyName}</h1>
                    <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#555', whiteSpace: 'pre-line' }}>{companyAddress}<br />{companyEmail}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <p style={{ margin: 0, fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#999', marginBottom: '8px' }}>Invoice</p>
                    <p style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>{invoiceNumber}</p>
                    <p style={{ margin: '8px 0 0 0', fontSize: '13px', color: '#555' }}>{formatDate(date)} — <span style={{ color: themeColor }}>Due {formatDate(dueDate)}</span></p>
                </div>
            </div>

            <div style={{ borderTop: `1px solid #e5e7eb`, borderBottom: `1px solid #e5e7eb`, padding: '24px 0', marginBottom: '48px' }}>
                <p style={{ margin: '0 0 4px 0', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#999' }}>Billed To</p>
                <p style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>{clientName}</p>
                <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#555', whiteSpace: 'pre-line' }}>{clientAddress}<br />{clientEmail}</p>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '48px' }}>
                <thead>
                    <tr>
                        <th style={{ padding: '0 0 12px 0', textAlign: 'left', fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#999', borderBottom: '1px solid #e5e7eb', fontWeight: '500' }}>Description</th>
                        <th style={{ padding: '0 0 12px 0', textAlign: 'center', fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#999', borderBottom: '1px solid #e5e7eb', fontWeight: '500', width: '80px' }}>Qty</th>
                        <th style={{ padding: '0 0 12px 0', textAlign: 'right', fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#999', borderBottom: '1px solid #e5e7eb', fontWeight: '500', width: '120px' }}>Price</th>
                        <th style={{ padding: '0 0 12px 0', textAlign: 'right', fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#999', borderBottom: '1px solid #e5e7eb', fontWeight: '500', width: '120px' }}>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td style={{ padding: '16px 0', fontSize: '14px', borderBottom: '1px solid #f3f4f6' }}>{item.description}</td>
                            <td style={{ padding: '16px 0', textAlign: 'center', fontSize: '14px', color: '#555', borderBottom: '1px solid #f3f4f6' }}>{item.quantity}</td>
                            <td style={{ padding: '16px 0', textAlign: 'right', fontSize: '14px', color: '#555', borderBottom: '1px solid #f3f4f6' }}>{formatCurrency(item.price, currency)}</td>
                            <td style={{ padding: '16px 0', textAlign: 'right', fontSize: '14px', fontWeight: '500', borderBottom: '1px solid #f3f4f6' }}>{formatCurrency(item.quantity * item.price, currency)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '48px' }}>
                <div style={{ width: '260px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#555', marginBottom: '8px' }}>
                        <span>Subtotal</span><span>{formatCurrency(subtotal, currency)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#555', marginBottom: '16px' }}>
                        <span>Tax ({taxRate}%)</span><span>{formatCurrency(taxAmount, currency)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: '700', borderTop: '2px solid #111', paddingTop: '16px' }}>
                        <span>Total</span><span style={{ color: themeColor }}>{formatCurrency(total, currency)}</span>
                    </div>
                </div>
            </div>

            {notes && (
                <p style={{ fontSize: '13px', color: '#777', borderTop: '1px solid #e5e7eb', paddingTop: '24px', whiteSpace: 'pre-line' }}>{notes}</p>
            )}
        </div>
    );
}
