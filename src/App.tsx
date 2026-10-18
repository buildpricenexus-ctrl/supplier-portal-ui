import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProductCatalogue from './pages/ProductCatalogue'
import ProductDetail from './pages/ProductDetail'
import AddProduct from './pages/AddProduct'
import BulkUpload from './pages/BulkUpload'
import DocumentUpload from './pages/DocumentUpload'
import OCRReview from './pages/OCRReview'
import Orders from './pages/Orders'
import OrderDetail from './pages/OrderDetail'
import PricingManagement from './pages/PricingManagement'
import SupplierAnalytics from './pages/SupplierAnalytics'
import Settings from './pages/Settings'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<ProductCatalogue />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/bulk-upload" element={<BulkUpload />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<OrderDetail />} />
          <Route path="pricing" element={<PricingManagement />} />
          <Route path="analytics" element={<SupplierAnalytics />} />
          <Route path="catalogue-ocr" element={<DocumentUpload />} />
          <Route path="catalogue-ocr/review" element={<OCRReview />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
