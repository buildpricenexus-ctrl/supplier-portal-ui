import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/TopBar'

export default function AddProduct() {
  const navigate = useNavigate()
  const fileRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: '', sku: '', category: '', description: '', price: '', stock: '', leadTime: '',
  })

  const handleImage = (file: File) => {
    const url = URL.createObjectURL(file)
    setImagePreview(url)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) handleImage(file)
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <TopBar
        title="Add Product"
        subtitle="Create a new product in your catalogue"
        actions={
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn-secondary" onClick={() => navigate('/products')}>Cancel</button>
            <button className="btn-primary" onClick={() => navigate('/products')}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" /></svg>
              Save Product
            </button>
          </div>
        }
      />

      <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, maxWidth: 1000 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a2332', marginBottom: 20 }}>Product Information</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Product Name *</label>
                  <input className="form-input" placeholder="e.g. Steel Beam 100×50mm" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>SKU *</label>
                  <input className="form-input" placeholder="e.g. SB-100-50-6M" value={form.sku} onChange={e => setForm({ ...form, sku: e.target.value })} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Category *</label>
                  <select className="form-select" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                    <option value="">Select category...</option>
                    {['Structural Steel', 'Timber & Boards', 'Concrete & Cement', 'Roofing', 'Plumbing', 'Masonry'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Description</label>
                  <textarea className="form-input" rows={4} placeholder="Describe the product specifications, standards, and intended applications..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ resize: 'vertical' }} />
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a2332', marginBottom: 20 }}>Pricing & Inventory</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Unit Price ($) *</label>
                  <input className="form-input" type="number" placeholder="0.00" min="0" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Stock Level *</label>
                  <input className="form-input" type="number" placeholder="0" min="0" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Lead Time (days)</label>
                  <input className="form-input" placeholder="e.g. 3–5" value={form.leadTime} onChange={e => setForm({ ...form, leadTime: e.target.value })} />
                </div>
              </div>
            </div>
          </div>

          {/* Image upload */}
          <div className="card" style={{ padding: 20, alignSelf: 'start' }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1a2332', marginBottom: 14 }}>Product Image</h3>
            <div
              className={`upload-zone${dragging ? ' drag-over' : ''}`}
              style={{ padding: '32px 16px' }}
              onDragOver={e => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Product preview" style={{ width: '100%', maxHeight: 180, objectFit: 'contain', borderRadius: 6 }} />
              ) : (
                <div>
                  <div style={{ width: 48, height: 48, borderRadius: 10, background: '#e8edf7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                    <svg width="22" height="22" fill="none" stroke="#2A4B8D" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" /></svg>
                  </div>
                  <p style={{ fontSize: 13, color: '#374151', fontWeight: 500, marginBottom: 4 }}>Drag & drop image here</p>
                  <p style={{ fontSize: 12, color: '#94a3b8' }}>or click to browse</p>
                  <p style={{ fontSize: 11, color: '#cbd5e1', marginTop: 8 }}>PNG, JPG, WEBP up to 10MB</p>
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => e.target.files?.[0] && handleImage(e.target.files[0])} />
            {imagePreview && (
              <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center', marginTop: 10, fontSize: 13 }} onClick={() => setImagePreview(null)}>Remove image</button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
