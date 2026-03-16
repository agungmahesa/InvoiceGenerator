export const competitors = {
    quickbooks: {
        id: 'quickbooks',
        name: 'QuickBooks',
        title: 'Invoicify vs QuickBooks: The Best Free Alternative in 2026',
        description: 'Looking for a simpler, completely free alternative to QuickBooks for sending invoices? See why Invoicify is the perfect choice for freelancers and small businesses.',
        heroSlogan: 'Ditch the complexity of QuickBooks.',
        pros: [
            '100% Free for basic use, no monthly subscription required just to send an invoice.',
            'No account creation or login required. Start typing immediately.',
            'Designed specifically for beautifully crafted PDF invoices, not complex accounting.',
            '10 premium templates included for free.'
        ],
        cons: [
            'QuickBooks costs $30+/month.',
            'Steep learning curve for non-accountants.',
            'Requires creating an account and navigating a complex dashboard just to create a simple PDF.'
        ],
        pricing: {
            invoicify: '$0 (Free forever)',
            competitor: '$30 - $200 / month'
        }
    },
    freshbooks: {
        id: 'freshbooks',
        name: 'FreshBooks',
        title: 'Invoicify vs FreshBooks: Which is Better for You?',
        description: 'FreshBooks is great, but is it worth the premium price tag just to send invoices? Discover why Invoicify is the ultimate free alternative to FreshBooks.',
        heroSlogan: 'Why pay for what you can get beautifully for free?',
        pros: [
            'Priced at $0. Start generating invoices immediately.',
            'No client limits. FreshBooks limits the number of billable clients on lower tiers.',
            'Data stays on your machine. Outstanding privacy.',
            'Generates pixel-perfect PDFs in one click.'
        ],
        cons: [
            'FreshBooks limits you to 5 clients on their $19/mo plan.',
            'Ongoing monthly subscription fees.',
            'Overkill if you just need a professional PDF generator.'
        ],
        pricing: {
            invoicify: '$0 (Full features, no client limits)',
            competitor: '$19 / month (Limited to 5 clients)'
        }
    },
    zoho: {
        id: 'zoho',
        name: 'Zoho Invoice',
        title: 'Invoicify vs Zoho Invoice: A Simpler Approach',
        description: 'Zoho Invoice is free, but very complex. If you want a zero-friction, beautiful invoice generator without signing up, Invoicify is the modern alternative to Zoho.',
        heroSlogan: 'Zero sign-ups. Zero friction. Just beautiful invoices.',
        pros: [
            'Absolutely no sign-up or login required.',
            'Modern, aesthetic, and rich UI design.',
            'Instant preview as you type.',
            'No bloated menus or confusing CRM features you don\'t need.'
        ],
        cons: [
            'Zoho requires account creation and email verification.',
            'The interface is dated and feels like traditional enterprise software.',
            'Takes several clicks and screens just to get to a PDF download.'
        ],
        pricing: {
            invoicify: '$0 (No sign up)',
            competitor: '$0 (Requires Zoho Account)'
        }
    },
    wave: {
        id: 'wave',
        name: 'Wave',
        title: 'Invoicify vs Wave Accounting: The Fast Alternative',
        description: 'Wave is heavy accounting software. Invoicify is a lightning-fast, beautifully designed invoice generator. See the comparison.',
        heroSlogan: 'Skip the accounting suite. Generate your invoice now.',
        pros: [
            'Instant access. No onboarding flow or business profile setup.',
            '10 stunning templates to match your brand.',
            'Export to PDF instantly without connecting a bank account.',
            'Runs highly optimized in your browser.'
        ],
        cons: [
            'Wave forces you through a lengthy onboarding process.',
            'Pushy upsells for their payroll and payment processing services.',
            'Slow and heavy dashboard.'
        ],
        pricing: {
            invoicify: '$0 (Lightweight & Ad-free)',
            competitor: '$0 (Heavy & Upsell-heavy)'
        }
    }
};
