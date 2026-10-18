import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TopBar from '../components/TopBar'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [saved, setSaved] = useState(false)

  const product = {
    name: 'Steel Beam 100×50',
    sku: 'SB-100-50-6M',
    category: 'Structural Steel',
    description: 'Hot-rolled universal steel beam section 100×50mm, 6 meter lengths. Suitable for structural framing, floor and ceiling joists, and general construction applications. Complies with SANS 1431 Grade 300W.',
    price: '45.00',
    stock: '284',
    leadTime: '3–5',
    status: 'Active',
    weight: '7.8 kg/m',
    material: 'Grade 300W Steel (SANS 1431)',
  }

  const [form, setForm] = useState({ ...product })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <TopBar
        title="Product Detail"
        subtitle={`Editing ${id}`}
        actions={
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn-secondary" onClick={() => navigate('/products')}>← Back</button>
            <button className="btn-danger" style={{ padding: '8px 16px' }}>Deactivate</button>
            <button className="btn-primary" onClick={handleSave}>
              {saved ? '✓ Saved' : 'Save Changes'}
            </button>
          </div>
        }
      />

      <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, maxWidth: 1100 }}>
          {/* Main form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a2332', marginBottom: 20 }}>Basic Information</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Product Name</label>
                  <input className="form-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>SKU</label>
                  <input className="form-input" value={form.sku} onChange={e => setForm({ ...form, sku: e.target.value })} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Category</label>
                  <select className="form-select" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                    {['Structural Steel', 'Timber & Boards', 'Concrete & Cement', 'Roofing', 'Plumbing', 'Masonry'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Material</label>
                  <input className="form-input" value={form.material} onChange={e => setForm({ ...form, material: e.target.value })} />
                </div>
              </div>
              <div style={{ marginTop: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Description</label>
                <textarea
                  className="form-input"
                  rows={4}
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  style={{ resize: 'vertical' }}
                />
              </div>
            </div>

            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a2332', marginBottom: 20 }}>Pricing & Inventory</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Unit Price ($)</label>
                  <input className="form-input" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Stock Level</label>
                  <input className="form-input" type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Delivery Lead Time (days)</label>
                  <input className="form-input" value={form.leadTime} onChange={e => setForm({ ...form, leadTime: e.target.value })} />
                </div>
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Product image */}
            <div className="card" style={{ padding: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1a2332', marginBottom: 14 }}>Product Image</h3>
              <div style={{ width: '100%', aspectRatio: '4/3', borderRadius: 8, overflow: 'hidden', background: '#f1f5f9', position: 'relative', marginBottom: 12 }}>
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop&auto=format"
                  alt="Steel beams stacked at warehouse"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: 13 }}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" /></svg>
                Change Image
              </button>
            </div>

            {/* Status */}
            <div className="card" style={{ padding: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1a2332', marginBottom: 14 }}>Status</h3>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderRadius: 8, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: '#1a2332' }}>Active</span>
                <div style={{ width: 36, height: 20, borderRadius: 10, background: '#4CAF50', position: 'relative', cursor: 'pointer' }}>
                  <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'white', position: 'absolute', top: 3, right: 3, boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                </div>
              </div>

              <div style={{ marginTop: 16, padding: 12, background: '#fff3e0', borderRadius: 8, border: '1px solid #fed7aa' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#c2410c', marginBottom: 4 }}>⚠ Low Stock Alert</div>
                <div style={{ fontSize: 12, color: '#78350f' }}>Current stock is above minimum threshold</div>
              </div>
            </div>

            {/* Quick stats */}
            <div className="card" style={{ padding: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1a2332', marginBottom: 14 }}>Quick Stats</h3>
              {[
                { label: 'Total Orders', value: '142' },
                { label: 'Revenue (MTD)', value: 'R 124,800' },
                { label: 'Return Rate', value: '0.7%' },
                { label: 'Avg Rating', value: '4.8 / 5' },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 3 ? '1px solid #f1f5f9' : 'none' }}>
                  <span style={{ fontSize: 13, color: '#64748b' }}>{s.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#1a2332' }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
