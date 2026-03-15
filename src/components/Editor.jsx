import { useInvoice } from '../InvoiceContext'
import { Plus, Trash2, Crown, Save, Users } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getSavedClients, saveClient } from '../utils/storage'
import './Editor.css'

export default function Editor({ onUpgradeClick }) {
    const { data, updateData, addItem, updateItem, removeItem, subtotal, taxAmount, total, isPro } = useInvoice()
    const [savedClients, setSavedClients] = useState([])

    useEffect(() => {
        if (isPro) setSavedClients(getSavedClients())
    }, [isPro])

    const handleLogoUpload = (e) => {
        const file = e.target.files[0]
        if (!file) return
        const reader = new FileReader()
        reader.onloadend = () => {
            updateData('customLogo', reader.result)
        }
        reader.readAsDataURL(file)
    }

    const handleSaveClient = () => {
        if (!data.clientName || !data.clientEmail) return alert('Name and Email required to save client')
        const clients = saveClient({
            clientName: data.clientName,
            clientEmail: data.clientEmail,
            clientAddress: data.clientAddress
        })
        setSavedClients(clients)
        alert('Client saved!')
    }

    const loadClient = (e) => {
        const email = e.target.value
        if (!email) return
        const client = savedClients.find(c => c.clientEmail === email)
        if (client) {
            updateData('clientName', client.clientName)
            updateData('clientEmail', client.clientEmail)
            updateData('clientAddress', client.clientAddress || '')
        }
    }

    const handleItemChange = (id, field, value) => {
        let finalValue = value;
        if (field === 'quantity' || field === 'price') {
            finalValue = parseFloat(value) || 0;
        }
        updateItem(id, field, finalValue);
    }

    return (
        <div className="editor">
            {/* Custom Logo Upload (Pro) */}
            <div className="form-group mb-6">
                <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold flex items-center gap-1.5">
                        Company Logo
                        {!isPro && (
                            <button
                                onClick={onUpgradeClick}
                                className="text-[10px] bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-1.5 py-0.5 rounded flex items-center gap-1 transition-colors"
                            >
                                <Crown size={10} /> PRO
                            </button>
                        )}
                    </label>
                </div>
                {isPro ? (
                    <div className="flex items-center gap-3">
                        <input type="file" accept="image/*" onChange={handleLogoUpload} className="text-xs w-full max-w-[200px]" />
                        {data.customLogo && (
                            <button onClick={() => updateData('customLogo', null)} className="text-xs text-red-500 hover:text-red-700">Remove</button>
                        )}
                    </div>
                ) : (
                    <button
                        onClick={onUpgradeClick}
                        className="w-full p-3 bg-gray-50 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-300 border-dashed rounded-lg text-center transition-all opacity-80"
                    >
                        <p className="text-xs text-indigo-600 font-medium flex items-center justify-center gap-1.5">
                            <Crown size={14} /> Upgrade to upload custom logo
                        </p>
                    </button>
                )}
            </div>

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

            <div className="divider" />

            <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold flex items-center gap-1.5">
                    Billed To (Client)
                </label>
                {/* Saved Clients CRM (Pro) */}
                {isPro ? (
                    <div className="flex gap-2">
                        {savedClients.length > 0 && (
                            <select onChange={loadClient} className="text-xs border rounded p-1 w-28 bg-gray-50">
                                <option value="">Load client...</option>
                                {savedClients.map(c => <option key={c.clientEmail} value={c.clientEmail}>{c.clientName}</option>)}
                            </select>
                        )}
                        <button onClick={handleSaveClient} className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-medium bg-indigo-50 px-2 py-1 rounded">
                            <Save size={12} /> Save
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={onUpgradeClick}
                        className="text-[10px] bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-semibold px-2 py-1 rounded flex items-center gap-1 transition-colors"
                    >
                        <Crown size={10} /> SAVE CLIENTS
                    </button>
                )}
            </div>

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
