import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/TopBar'

const products = [
  { id: 'P001', name: 'Steel Beam 100×50', sku: 'SB-100-50-6M', category: 'Structural Steel', price: '$45.00', stock: 284, status: 'Active', material: 'Steel', updated: 'Oct 28, 2025' },
  { id: 'P002', name: 'Plywood Sheet 18mm', sku: 'PLY-18-1220', category: 'Timber & Boards', price: '$32.50', stock: 156, status: 'Active', material: 'Wood', updated: 'Oct 25, 2025' },
  { id: 'P003', name: 'Concrete Mix 25kg', sku: 'CM-25KG-STD', category: 'Concrete & Cement', price: '$13.00', stock: 820, status: 'Active', material: 'Composite', updated: 'Oct 22, 2025' },
  { id: 'P004', name: 'Angle Iron 50×50×5', sku: 'AI-50-50-5', category: 'Structural Steel', price: '$28.00', stock: 12, status: 'Active', material: 'Steel', updated: 'Oct 20, 2025' },
  { id: 'P005', name: 'Roofing Sheet 0.5mm', sku: 'RS-0.5-1800', category: 'Roofing', price: '$27.00', stock: 0, status: 'Inactive', material: 'Steel', updated: 'Oct 15, 2025' },
  { id: 'P006', name: 'PVC Pipe 110mm', sku: 'PVC-110-6M', category: 'Plumbing', price: '$18.50', stock: 390, status: 'Active', material: 'Plastic', updated: 'Oct 18, 2025' },
  { id: 'P007', name: 'Timber 47×100mm', sku: 'TIM-47-100-4.8', category: 'Timber & Boards', price: '$14.20', stock: 67, status: 'Active', material: 'Wood', updated: 'Oct 12, 2025' },
  { id: 'P008', name: 'Brick 220×110×70', sku: 'BRK-STD-RED', category: 'Masonry', price: '$0.85', stock: 15000, status: 'Active', material: 'Clay', updated: 'Oct 10, 2025' },
]

const categories = ['All', 'Structural Steel', 'Timber & Boards', 'Concrete & Cement', 'Roofing', 'Plumbing', 'Masonry']
const materials = ['All', 'Steel', 'Wood', 'Composite', 'Plastic', 'Clay']

export default function ProductCatalogue() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('All')
  const [category, setCategory] = useState('All')
  const [material, setMaterial] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = products.filter(p => {
    const tabMatch = activeTab === 'All' || p.status === activeTab
    const catMatch = category === 'All' || p.category === category
    const matMatch = material === 'All' || p.material === material
    const searchMatch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase())
    return tabMatch && catMatch && matMatch && searchMatch
  })

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <TopBar
        title="Product Catalogue"
        subtitle={`${products.length} products total`}
        actions={
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn-secondary" onClick={() => navigate('/products/bulk-upload')}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" /></svg>
              Bulk Upload
            </button>
            <button className="btn-secondary" onClick={() => navigate('/catalogue-ocr')}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6" /></svg>
              Upload Catalogue
            </button>
            <button className="btn-primary" onClick={() => navigate('/products/add')}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>
              Add Product
            </button>
          </div>
        }
      />

      <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
        <div className="card" style={{ overflow: 'hidden' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', padding: '0 4px' }}>
            {['All', 'Active', 'Inactive'].map(t => (
              <button key={t} className={`tab-btn${activeTab === t ? ' active' : ''}`} onClick={() => setActiveTab(t)}>{t}</button>
            ))}
            <div style={{ flex: 1 }} />
          </div>

          {/* Filters */}
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: '1 1 200px', maxWidth: 280 }}>
              <input
                className="form-input"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ paddingLeft: 36, height: 36 }}
              />
              <svg style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
            <select className="form-select" style={{ width: 180, height: 36 }} value={category} onChange={e => setCategory(e.target.value)}>
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
            <select className="form-select" style={{ width: 160, height: 36 }} value={material} onChange={e => setMaterial(e.target.value)}>
              {materials.map(m => <option key={m}>{m}</option>)}
            </select>
            <span style={{ fontSize: 13, color: '#64748b', marginLeft: 4 }}>{filtered.length} results</span>
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>SKU</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Last Updated</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id} onClick={() => navigate(`/products/${p.id}`)}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 6, background: '#e8edf7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <span style={{ fontSize: 16 }}>📦</span>
                        </div>
                        <span style={{ fontWeight: 500 }}>{p.name}</span>
                      </div>
                    </td>
                    <td><code style={{ fontSize: 12, background: '#f1f5f9', padding: '2px 6px', borderRadius: 4 }}>{p.sku}</code></td>
                    <td style={{ color: '#64748b' }}>{p.category}</td>
                    <td style={{ fontWeight: 600 }}>{p.price}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 60, height: 4, background: '#e2e8f0', borderRadius: 2 }}>
                          <div style={{ height: '100%', width: `${Math.min(100, (p.stock / 1000) * 100)}%`, background: p.stock === 0 ? '#E53935' : p.stock < 20 ? '#FB8C00' : '#4CAF50', borderRadius: 2 }} />
                        </div>
                        <span style={{ fontSize: 13, color: p.stock === 0 ? '#E53935' : p.stock < 20 ? '#FB8C00' : '#374151' }}>{p.stock.toLocaleString()}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${p.status === 'Active' ? 'badge-green' : 'badge-gray'}`}>{p.status}</span>
                    </td>
                    <td style={{ color: '#64748b' }}>{p.updated}</td>
                    <td>
                      <button
                        onClick={e => { e.stopPropagation(); navigate(`/products/${p.id}`) }}
                        style={{ padding: '4px 10px', borderRadius: 6, border: '1px solid #e2e8f0', background: 'white', fontSize: 12, cursor: 'pointer', fontWeight: 500, color: '#2A4B8D' }}
                      >Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
