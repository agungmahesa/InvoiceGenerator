import { formatCurrency, formatDate } from '../../utils/formatters';

export default function ClassicTemplate({ data }) {
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
        <div style={{ padding: '50px', fontFamily: 'Georgia, serif', color: '#000', backgroundColor: '#fff', height: '100%', boxSizing: 'border-box', border: '1px solid #ddd' }}>

            <div style={{ borderBottom: `4px solid ${themeColor}`, paddingBottom: '24px', marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '36px', margin: 0, color: themeColor, fontFamily: 'Arial, sans-serif', letterSpacing: '1px' }}>{companyName}</h1>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <h2 style={{ fontSize: '24px', margin: 0, color: '#333', letterSpacing: '2px' }}>INVOICE</h2>
                    <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>#{invoiceNumber}</p>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', fontSize: '14px', lineHeight: '1.6' }}>
                <div>
                    <strong style={{ display: 'block', marginBottom: '8px', color: '#555' }}>From:</strong>
                    <div style={{ whiteSpace: 'pre-line' }}>{companyAddress}</div>
                    <div>{companyEmail}</div>
                </div>
                <div>
                    <strong style={{ display: 'block', marginBottom: '8px', color: '#555' }}>To:</strong>
                    <div style={{ fontWeight: 'bold' }}>{clientName}</div>
                    <div style={{ whiteSpace: 'pre-line' }}>{clientAddress}</div>
                    <div>{clientEmail}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <table style={{ marginLeft: 'auto' }}>
                        <tbody>
                            <tr>
                                <td style={{ paddingRight: '16px', fontWeight: 'bold', color: '#555' }}>Date:</td>
                                <td>{formatDate(date)}</td>
                            </tr>
                            <tr>
                                <td style={{ paddingRight: '16px', fontWeight: 'bold', color: '#555' }}>Due Date:</td>
                                <td>{formatDate(dueDate)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '40px', fontFamily: 'Arial, sans-serif' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2', borderBottom: '1px solid #ccc' }}>
                        <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', textTransform: 'uppercase' }}>Description</th>
                        <th style={{ padding: '12px', textAlign: 'center', fontSize: '13px', textTransform: 'uppercase', width: '80px' }}>Qty</th>
                        <th style={{ padding: '12px', textAlign: 'right', fontSize: '13px', textTransform: 'uppercase', width: '120px' }}>Unit Price</th>
                        <th style={{ padding: '12px', textAlign: 'right', fontSize: '13px', textTransform: 'uppercase', width: '120px' }}>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '12px', fontSize: '14px' }}>{item.description}</td>
                            <td style={{ padding: '12px', textAlign: 'center', fontSize: '14px' }}>{item.quantity}</td>
                            <td style={{ padding: '12px', textAlign: 'right', fontSize: '14px' }}>{formatCurrency(item.price, currency)}</td>
                            <td style={{ padding: '12px', textAlign: 'right', fontSize: '14px' }}>{formatCurrency(item.quantity * item.price, currency)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '40px', fontFamily: 'Arial, sans-serif' }}>
                <table style={{ width: '300px', borderCollapse: 'collapse' }}>
                    <tbody>
                        <tr>
                            <td style={{ padding: '8px 12px', textAlign: 'right', borderBottom: '1px solid #eee' }}>Subtotal:</td>
                            <td style={{ padding: '8px 12px', textAlign: 'right', borderBottom: '1px solid #eee' }}>{formatCurrency(subtotal, currency)}</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '8px 12px', textAlign: 'right', borderBottom: '1px solid #eee' }}>Tax ({taxRate}%):</td>
                            <td style={{ padding: '8px 12px', textAlign: 'right', borderBottom: '1px solid #eee' }}>{formatCurrency(taxAmount, currency)}</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '12px', textAlign: 'right', fontWeight: 'bold', fontSize: '18px', backgroundColor: '#f9f9f9' }}>Total:</td>
                            <td style={{ padding: '12px', textAlign: 'right', fontWeight: 'bold', fontSize: '18px', backgroundColor: '#f9f9f9', color: themeColor }}>{formatCurrency(total, currency)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {notes && (
                <div style={{ marginTop: '40px', padding: '16px', backgroundColor: '#fcfcfc', borderLeft: `4px solid ${themeColor}` }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontFamily: 'Arial, sans-serif' }}>Remarks</h4>
                    <p style={{ margin: 0, fontSize: '14px', whiteSpace: 'pre-line', fontStyle: 'italic', color: '#555' }}>{notes}</p>
                </div>
            )}
        </div>
    );
}
