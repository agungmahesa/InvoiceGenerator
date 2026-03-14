import { formatCurrency, formatDate } from '../../utils/formatters';

export default function ModernTemplate({ data }) {
    const {
        companyName, companyEmail, companyAddress,
        clientName, clientEmail, clientAddress,
        invoiceNumber, date, dueDate,
        items, taxRate, notes, currency, themeColor
    } = data;

    const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const taxAmount = (subtotal * taxRate) / 100;
    const total = subtotal + taxAmount;

    return (
        <div style={{ padding: '40px', fontFamily: 'Inter, sans-serif', color: '#111827', backgroundColor: '#fff', height: '100%', boxSizing: 'border-box' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
                <div>
                    <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, color: themeColor }}>{companyName}</h1>
                    <p style={{ margin: '8px 0 0 0', color: '#4b5563', fontSize: '14px', whiteSpace: 'pre-line' }}>
                        {companyAddress}<br />{companyEmail}
                    </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <h2 style={{ fontSize: '40px', fontWeight: '800', margin: 0, color: '#f3f4f6', textTransform: 'uppercase', letterSpacing: '2px' }}>INVOICE</h2>
                    <div style={{ marginTop: '8px', fontSize: '14px' }}>
                        <p style={{ margin: 0 }}><strong>Invoice No:</strong> {invoiceNumber}</p>
                        <p style={{ margin: '4px 0 0 0' }}><strong>Date:</strong> {formatDate(date)}</p>
                        <p style={{ margin: '4px 0 0 0' }}><strong>Due:</strong> {formatDate(dueDate)}</p>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px', padding: '24px', backgroundColor: '#f9fafb', borderRadius: '12px' }}>
                <div>
                    <h3 style={{ fontSize: '12px', textTransform: 'uppercase', color: '#9ca3af', letterSpacing: '1px', marginBottom: '8px' }}>Billed To</h3>
                    <p style={{ margin: 0, fontWeight: 'bold', fontSize: '16px' }}>{clientName}</p>
                    <p style={{ margin: '4px 0 0 0', color: '#4b5563', fontSize: '14px', whiteSpace: 'pre-line' }}>{clientAddress}</p>
                    <p style={{ margin: '4px 0 0 0', color: '#4b5563', fontSize: '14px' }}>{clientEmail}</p>
                </div>
                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>Total Amount Due</p>
                    <p style={{ margin: 0, fontSize: '36px', fontWeight: 'bold', color: themeColor }}>{formatCurrency(total, currency)}</p>
                </div>
            </div>

            {/* Items Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '40px' }}>
                <thead>
                    <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                        <th style={{ padding: '12px 8px', textAlign: 'left', color: '#6b7280', fontWeight: '600', fontSize: '14px' }}>Description</th>
                        <th style={{ padding: '12px 8px', textAlign: 'center', color: '#6b7280', fontWeight: '600', fontSize: '14px', width: '80px' }}>Qty</th>
                        <th style={{ padding: '12px 8px', textAlign: 'right', color: '#6b7280', fontWeight: '600', fontSize: '14px', width: '120px' }}>Price</th>
                        <th style={{ padding: '12px 8px', textAlign: 'right', color: '#6b7280', fontWeight: '600', fontSize: '14px', width: '120px' }}>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                            <td style={{ padding: '16px 8px', fontSize: '14px', fontWeight: '500' }}>{item.description}</td>
                            <td style={{ padding: '16px 8px', textAlign: 'center', fontSize: '14px', color: '#4b5563' }}>{item.quantity}</td>
                            <td style={{ padding: '16px 8px', textAlign: 'right', fontSize: '14px', color: '#4b5563' }}>{formatCurrency(item.price, currency)}</td>
                            <td style={{ padding: '16px 8px', textAlign: 'right', fontSize: '14px', fontWeight: '600' }}>{formatCurrency(item.quantity * item.price, currency)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Totals */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '40px' }}>
                <div style={{ width: '300px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6', fontSize: '14px' }}>
                        <span style={{ color: '#6b7280' }}>Subtotal</span>
                        <span style={{ fontWeight: '500' }}>{formatCurrency(subtotal, currency)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6', fontSize: '14px' }}>
                        <span style={{ color: '#6b7280' }}>Tax ({taxRate}%)</span>
                        <span style={{ fontWeight: '500' }}>{formatCurrency(taxAmount, currency)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', fontSize: '18px', fontWeight: 'bold', color: themeColor }}>
                        <span>Total</span>
                        <span>{formatCurrency(total, currency)}</span>
                    </div>
                </div>
            </div>

            {/* Footer Notes */}
            {notes && (
                <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#9ca3af', textTransform: 'uppercase' }}>Notes & Terms</h4>
                    <p style={{ margin: 0, fontSize: '14px', color: '#4b5563', whiteSpace: 'pre-line' }}>{notes}</p>
                </div>
            )}
        </div>
    );
}
