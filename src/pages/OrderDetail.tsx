import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TopBar from '../components/TopBar'

const timelineSteps = [
  { label: 'Order Received', date: 'Nov 5, 2025 9:14 AM', done: true },
  { label: 'Processing', date: 'Nov 5, 2025 2:30 PM', done: true },
  { label: 'Dispatched', date: 'Nov 7, 2025 11:00 AM', done: true },
  { label: 'In Transit', date: 'Nov 8, 2025 8:45 AM', done: false },
  { label: 'Delivered', date: 'Est. Nov 12, 2025', done: false },
]

export default function OrderDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState('In Progress')
  const [showProofModal, setShowProofModal] = useState(false)

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <TopBar
        title={`Order ${id}`}
        subtitle="BuildMart SA · Received 5 Nov 2025"
        actions={
          <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
            <button className="btn-secondary" onClick={() => navigate('/orders')}>← Back</button>
            <button className="btn-secondary" onClick={() => setShowProofModal(true)}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" /></svg>
              Proof
            </button>
            <select className="form-select" style={{ width: 140, height: 36, fontSize: 13 }} value={status} onChange={e => setStatus(e.target.value)}>
              {['Pending', 'In Progress', 'Dispatched', 'Completed'].map(s => <option key={s}>{s}</option>)}
            </select>
            <button className="btn-primary">Update</button>
          </div>
        }
      />

      <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, maxWidth: 1100 }}>
          {/* Main content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Summary card */}
            <div className="card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: '#1a2332' }}>{id}</h3>
                  <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>Placed: 5 Nov 2025 · Last updated: 8 Nov 2025</div>
                </div>
                <span className="badge badge-blue" style={{ fontSize: 13, padding: '6px 14px' }}>{status}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                {[
                  { label: 'Total Value', value: 'R 4,200.00' },
                  { label: 'Items', value: '2 products' },
                  { label: 'Total Qty', value: '250 units' },
                  { label: 'ETA', value: '12 Nov 2025' },
                ].map((s, i) => (
                  <div key={i} style={{ padding: 14, background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>{s.label}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#1a2332' }}>{s.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Items list */}
            <div className="card" style={{ overflow: 'hidden' }}>
              <div style={{ padding: '14px 20px', borderBottom: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1a2332' }}>Order Items</h3>
              </div>
              <table>
                <thead><tr><th>Product</th><th>SKU</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr></thead>
                <tbody>
                  {[
                    { name: 'Steel Beam 100×50', sku: 'SB-100-50-6M', qty: 200, price: 'R 45.00', total: 'R 9,000.00' },
                    { name: 'Bolt Set M8 × 50', sku: 'BOLT-M8-50', qty: 50, price: 'R 24.00', total: 'R 1,200.00' },
                  ].map((item, i) => (
                    <tr key={i}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 36, height: 36, borderRadius: 6, background: '#e8edf7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span>📦</span></div>
                          <span style={{ fontWeight: 500 }}>{item.name}</span>
                        </div>
                      </td>
                      <td><code style={{ fontSize: 12, background: '#f1f5f9', padding: '2px 6px', borderRadius: 4 }}>{item.sku}</code></td>
                      <td>{item.qty}</td>
                      <td>{item.price}</td>
                      <td style={{ fontWeight: 700 }}>{item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ padding: '12px 20px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ display: 'flex', gap: 32, fontSize: 14 }}>
                  <span style={{ color: '#64748b' }}>Subtotal (excl. VAT)</span>
                  <span style={{ fontWeight: 600 }}>R 10,200.00</span>
                </div>
              </div>
              <div style={{ padding: '8px 20px 14px', display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ display: 'flex', gap: 32, fontSize: 14 }}>
                  <span style={{ color: '#64748b' }}>VAT (15%)</span>
                  <span style={{ fontWeight: 600 }}>R 1,530.00</span>
                </div>
              </div>
              <div style={{ padding: '10px 20px 14px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ display: 'flex', gap: 32, fontSize: 15 }}>
                  <span style={{ fontWeight: 600, color: '#1a2332' }}>Total (incl. VAT)</span>
                  <span style={{ fontWeight: 800, color: '#1a2332' }}>R 11,730.00</span>
                </div>
              </div>
            </div>

            {/* Delivery address */}
            <div className="card" style={{ padding: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1a2332', marginBottom: 14 }}>Delivery Address</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>Company</div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: '#1a2332' }}>BuildMart SA (Pty) Ltd</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>Contact</div>
                  <div style={{ fontSize: 14, color: '#1a2332' }}>Sipho Dlamini</div>
                </div>
                <div style={{ gridColumn: '1/-1' }}>
                  <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>Delivery Address</div>
                  <div style={{ fontSize: 14, color: '#1a2332' }}>14 Allandale Road, Midrand, Gauteng, 1682</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>Phone</div>
                  <div style={{ fontSize: 14, color: '#1a2332' }}>+27 11 023 4567</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>Email</div>
                  <div style={{ fontSize: 14, color: '#1a2332' }}>orders@buildmartsa.co.za</div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline + customer */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Status timeline */}
            <div className="card" style={{ padding: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1a2332', marginBottom: 20 }}>Status Timeline</h3>
              <div style={{ position: 'relative' }}>
                {timelineSteps.map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, position: 'relative' }}>
                    {i < timelineSteps.length - 1 && (
                      <div style={{ position: 'absolute', left: 10, top: 24, width: 2, height: 40, background: step.done ? '#4CAF50' : '#e2e8f0', zIndex: 0 }} />
                    )}
                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: step.done ? '#4CAF50' : '#f1f5f9', border: `2px solid ${step.done ? '#4CAF50' : '#cbd5e1'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1 }}>
                      {step.done && <svg width="10" height="10" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" /></svg>}
                    </div>
                    <div style={{ paddingBottom: 24 }}>
                      <div style={{ fontSize: 13, fontWeight: step.done ? 600 : 400, color: step.done ? '#1a2332' : '#94a3b8' }}>{step.label}</div>
                      <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{step.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer details */}
            <div className="card" style={{ padding: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1a2332', marginBottom: 14 }}>Customer Details</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: '#e8edf7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontWeight: 700, color: '#2A4B8D', fontSize: 14 }}>BM</span>
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: '#1a2332' }}>BuildMart SA (Pty) Ltd</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>Customer since Jan 2023</div>
                </div>
              </div>
              {[
                { label: 'Total Orders', value: '34' },
                { label: 'Total Value', value: 'R 142,800' },
                { label: 'On-time Rate', value: '97.1%' },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 2 ? '1px solid #f1f5f9' : 'none' }}>
                  <span style={{ fontSize: 13, color: '#64748b' }}>{s.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#1a2332' }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Delivery proof modal */}
      {showProofModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ padding: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a2332' }}>Upload Delivery Proof</h3>
              <button onClick={() => setShowProofModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
            <p style={{ fontSize: 13, color: '#64748b', marginBottom: 16 }}>Upload a signed delivery note or POD (Proof of Delivery)</p>
            <div className="upload-zone" style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Drop delivery receipt or waybill</div>
              <div style={{ fontSize: 13, color: '#94a3b8' }}>PDF, PNG, JPG accepted</div>
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button className="btn-secondary" onClick={() => setShowProofModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={() => setShowProofModal(false)}>Upload POD</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
