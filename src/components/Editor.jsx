import { useInvoice } from '../InvoiceContext'
import { Plus, Trash2 } from 'lucide-react'
import './Editor.css'

export default function Editor() {
    const { data, updateData, addItem, updateItem, removeItem, subtotal, taxAmount, total } = useInvoice()

    const handleItemChange = (id, field, value) => {
        let finalValue = value;
        if (field === 'quantity' || field === 'price') {
            finalValue = parseFloat(value) || 0;
        }
        updateItem(id, field, finalValue);
    }

    return (
        <div className="editor">
            <div className="form-group grid-2">
                <div className="input-field">
                    <label>Company Name</label>
                    <input
                        type="text"
                        value={data.companyName}
                        onChange={(e) => updateData('companyName', e.target.value)}
                    />
                </div>
                <div className="input-field">
                    <label>Company Email</label>
                    <input
                        type="email"
                        value={data.companyEmail}
                        onChange={(e) => updateData('companyEmail', e.target.value)}
                    />
                </div>
            </div>
            <div className="input-field mb-6">
                <label>Company Address</label>
                <textarea
                    rows="2"
                    value={data.companyAddress}
                    onChange={(e) => updateData('companyAddress', e.target.value)}
                />
            </div>

            <div className="divider" />

            <div className="form-group grid-2">
                <div className="input-field">
                    <label>Billed To (Client)</label>
                    <input
                        type="text"
                        value={data.clientName}
                        onChange={(e) => updateData('clientName', e.target.value)}
                    />
                </div>
                <div className="input-field">
                    <label>Client Email</label>
                    <input
                        type="email"
                        value={data.clientEmail}
                        onChange={(e) => updateData('clientEmail', e.target.value)}
                    />
                </div>
            </div>
            <div className="input-field mb-6">
                <label>Client Address</label>
                <textarea
                    rows="2"
                    value={data.clientAddress}
                    onChange={(e) => updateData('clientAddress', e.target.value)}
                />
            </div>

            <div className="divider" />

            <div className="form-group grid-2 mb-6">
                <div className="input-field">
                    <label>Invoice Number</label>
                    <input
                        type="text"
                        value={data.invoiceNumber}
                        onChange={(e) => updateData('invoiceNumber', e.target.value)}
                    />
                </div>
                <div className="input-field">
                    <label>Currency</label>
                    <select value={data.currency} onChange={(e) => updateData('currency', e.target.value)}>
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="IDR">IDR (Rp)</option>
                    </select>
                </div>
                <div className="input-field">
                    <label>Issue Date</label>
                    <input
                        type="date"
                        value={data.date}
                        onChange={(e) => updateData('date', e.target.value)}
                    />
                </div>
                <div className="input-field">
                    <label>Due Date</label>
                    <input
                        type="date"
                        value={data.dueDate}
                        onChange={(e) => updateData('dueDate', e.target.value)}
                    />
                </div>
            </div>

            <div className="divider" />

            <div className="items-section mb-6">
                <div className="items-header flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Items</h3>
                </div>

                <div className="items-list flex-col gap-4 mb-4">
                    {data.items.map((item, index) => (
                        <div key={item.id} className="item-row">
                            <div className="input-field flex-1">
                                <input
                                    type="text"
                                    placeholder="Item description"
                                    value={item.description}
                                    onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                                />
                            </div>
                            <div className="input-field w-24">
                                <input
                                    type="number"
                                    min="1"
                                    placeholder="Qty"
                                    value={item.quantity}
                                    onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
                                />
                            </div>
                            <div className="input-field w-32">
                                <input
                                    type="number"
                                    min="0"
                                    placeholder="Price"
                                    value={item.price}
                                    onChange={(e) => handleItemChange(item.id, 'price', e.target.value)}
                                />
                            </div>
                            <button
                                className="btn-icon danger"
                                onClick={() => removeItem(item.id)}
                                title="Remove Item"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>

                <button className="btn btn-secondary w-full" onClick={addItem}>
                    <Plus size={16} /> Add Item
                </button>
            </div>

            <div className="divider" />

            <div className="form-group grid-2 mb-6">
                <div className="input-field">
                    <label>Tax Rate (%)</label>
                    <input
                        type="number"
                        min="0"
                        max="100"
                        value={data.taxRate}
                        onChange={(e) => updateData('taxRate', parseFloat(e.target.value) || 0)}
                    />
                </div>
                <div className="input-field">
                    <label>Theme Color</label>
                    <div className="color-picker-wrapper">
                        <input
                            type="color"
                            value={data.themeColor}
                            onChange={(e) => updateData('themeColor', e.target.value)}
                            className="color-input"
                        />
                        <span className="text-sm font-medium">{data.themeColor}</span>
                    </div>
                </div>
            </div>

            <div className="input-field mb-6">
                <label>Notes / Terms</label>
                <textarea
                    rows="3"
                    placeholder="Thank you for your business..."
                    value={data.notes}
                    onChange={(e) => updateData('notes', e.target.value)}
                />
            </div>

        </div>
    )
}
