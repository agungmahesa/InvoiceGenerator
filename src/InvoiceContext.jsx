import { createContext, useState, useContext, useEffect } from 'react';
import { getProStatus, getMonthlyUsage } from './utils/storage';

const InvoiceContext = createContext();

const initialData = {
    companyName: 'Acme Corp',
    companyEmail: 'hello@acmecorp.com',
    companyAddress: '123 Innovation Way, Tech City, TC 90210',
    clientName: 'Globex Inc.',
    clientEmail: 'billing@globex.com',
    clientAddress: '456 Enterprise Blvd, Business Park, BP 12345',
    invoiceNumber: 'INV-2023-001',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
    items: [
        { id: '1', description: 'Web UI Design', quantity: 1, price: 1500 },
        { id: '2', description: 'Front-end Development', quantity: 40, price: 75 },
        { id: '3', description: 'Backend Integration', quantity: 20, price: 90 },
    ],
    taxRate: 10,
    notes: 'Thank you for your business! Please remit payment within 14 days.',
    template: 'modern',
    currency: 'USD',
    themeColor: '#4f46e5',
    customLogo: null,
};

export function InvoiceProvider({ children }) {
    const [data, setData] = useState(initialData);
    const [isPro, setIsPro] = useState(false);
    const [usageCount, setUsageCount] = useState(0);

    useEffect(() => {
        const status = getProStatus();
        setIsPro(status.isPro);
        setUsageCount(getMonthlyUsage());
    }, []);

    const updateData = (field, value) => {
        setData((prev) => ({ ...prev, [field]: value }));
    };

    const addItem = () => {
        setData((prev) => ({
            ...prev,
            items: [
                ...prev.items,
                { id: Date.now().toString(), description: '', quantity: 1, price: 0 }
            ]
        }));
    };

    const updateItem = (id, field, value) => {
        setData((prev) => ({
            ...prev,
            items: prev.items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
        }));
    };

    const removeItem = (id) => {
        setData((prev) => ({
            ...prev,
            items: prev.items.filter((item) => item.id !== id)
        }));
    };

    const subtotal = data.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const taxAmount = (subtotal * data.taxRate) / 100;
    const total = subtotal + taxAmount;

    return (
        <InvoiceContext.Provider value={{
            data, setData, updateData,
            addItem, updateItem, removeItem,
            subtotal, taxAmount, total,
            isPro, setIsPro,
            usageCount, setUsageCount
        }}>
            {children}
        </InvoiceContext.Provider>
    );
}

export function useInvoice() {
    return useContext(InvoiceContext);
}
