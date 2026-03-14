import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { InvoiceProvider } from './InvoiceContext'
import Landing from './pages/Landing'
import App from './App'

export default function Root() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route
                    path="/app"
                    element={
                        <InvoiceProvider>
                            <App />
                        </InvoiceProvider>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}
