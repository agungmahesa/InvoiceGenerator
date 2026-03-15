// Storage keys
const USAGE_PREFIX = 'invoicify_usage_'
const PRO_STATUS_KEY = 'invoicify_pro'
const CLIENTS_KEY = 'invoicify_clients'

// === USAGE TRACKING (Free Tier: 3 per month) ===
export function getMonthlyUsage() {
    const monthKey = `${USAGE_PREFIX}${new Date().getFullYear()}_${new Date().getMonth()}`
    return parseInt(localStorage.getItem(monthKey) || '0', 10)
}

export function incrementMonthlyUsage() {
    const monthKey = `${USAGE_PREFIX}${new Date().getFullYear()}_${new Date().getMonth()}`
    const current = getMonthlyUsage()
    localStorage.setItem(monthKey, (current + 1).toString())
    return current + 1
}

// === PRO STATUS ===
export function getProStatus() {
    try {
        const data = localStorage.getItem(PRO_STATUS_KEY)
        return data ? JSON.parse(data) : { isPro: false, licenseKey: null }
    } catch {
        return { isPro: false, licenseKey: null }
    }
}

export function setProStatus(isPro, licenseKey = null) {
    localStorage.setItem(PRO_STATUS_KEY, JSON.stringify({ isPro, licenseKey }))
}

// === CLIENT CRM ===
export function getSavedClients() {
    try {
        const data = localStorage.getItem(CLIENTS_KEY)
        return data ? JSON.parse(data) : []
    } catch {
        return []
    }
}

export function saveClient(clientData) {
    const clients = getSavedClients()
    // Check if client with same email exists
    const existingIndex = clients.findIndex(c => c.clientEmail === clientData.clientEmail)

    if (existingIndex >= 0) {
        clients[existingIndex] = { ...clients[existingIndex], ...clientData, updatedAt: new Date().toISOString() }
    } else {
        clients.push({
            id: crypto.randomUUID(),
            ...clientData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        })
    }

    localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients))
    return clients
}
