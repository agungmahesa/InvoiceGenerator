import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { InvoiceProvider } from './InvoiceContext'
import Landing from './pages/Landing'
import Comparison from './pages/Comparison'
import App from './App'

export default function Root() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/alternatives/:competitor" element={<Comparison />} />
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
