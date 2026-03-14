import { format, parseISO } from 'date-fns';

export const formatCurrency = (amount, currencyCode = 'USD') => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
    }).format(amount);
};

export const formatDate = (dateString) => {
    try {
        return format(parseISO(dateString), 'MMM dd, yyyy');
    } catch (e) {
        return dateString;
    }
};
