import { useNavigate } from 'react-router-dom'
import TopBar from '../components/TopBar'

const kpis = [
  { label: 'Active Products', value: '1,284', change: '+12', up: true, icon: '📦', color: '#2A4B8D', bg: '#e8edf7' },
  { label: 'Pending Orders', value: '47', change: '+8', up: true, icon: '🕐', color: '#FB8C00', bg: '#fff3e0' },
  { label: 'Avg Delivery Time', value: '3.2 days', change: '-0.4', up: true, icon: '🚚', color: '#4CAF50', bg: '#e8f5e9' },
  { label: 'Quality Score', value: '96.4%', change: '+1.2%', up: true, icon: '⭐', color: '#7C3AED', bg: '#ede9fe' },
]

const recentOrders = [
  { id: 'ORD-2847', customer: 'BuildMart SA', items: 'Steel Beam 100x50, Bolt Set M8', qty: 250, value: 'R 4,200', status: 'Pending', eta: 'Nov 12, 2025' },
  { id: 'ORD-2846', customer: 'Cashbuild (Pty) Ltd', items: 'Plywood 18mm, Wood Screw 4×40', qty: 180, value: 'R 2,850', status: 'In Progress', eta: 'Nov 10, 2025' },
  { id: 'ORD-2845', customer: 'WBHO Construction', items: 'Concrete Mix 25kg', qty: 500, value: 'R 6,500', status: 'Completed', eta: 'Nov 8, 2025' },
  { id: 'ORD-2844', customer: 'PPC Cement SA', items: 'Angle Iron 50×50×5', qty: 120, value: 'R 1,920', status: 'In Progress', eta: 'Nov 9, 2025' },
  { id: 'ORD-2843', customer: 'Afrimat Holdings', items: 'Roofing Sheet 0.5mm', qty: 300, value: 'R 8,100', status: 'Completed', eta: 'Nov 7, 2025' },
]

const alerts = [
  { type: 'warning', title: 'Low stock', msg: 'Steel Beam 100x50 — 12 units remaining' },
  { type: 'info', title: 'Price update', msg: 'Timber may increase 8% — load-shedding impact on mills' },
  { type: 'error', title: 'Order delayed', msg: 'ORD-2840 delayed due to Durban port congestion' },
]

const statusBadge = (status: string) => {
  const map: Record<string, string> = { Pending: 'badge-yellow', 'In Progress': 'badge-blue', Completed: 'badge-green' }
  return <span className={`badge ${map[status] || 'badge-gray'}`}>{status}</span>
}

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <TopBar
        title="Supplier Dashboard"
        subtitle="Welcome back, Cape Steel Supplies — here's your overview"
        actions={
          <button className="btn-primary" onClick={() => navigate('/products/add')}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>
            Add Product
          </button>
        }
      />

      <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
        {/* KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
          {kpis.map((k, i) => (
            <div key={i} className="kpi-card" style={{ cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: k.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                  {k.icon}
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: k.up ? '#16a34a' : '#dc2626', background: k.up ? '#dcfce7' : '#fee2e2', padding: '3px 8px', borderRadius: 20 }}>
                  {k.change}
                </span>
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#1a2332', lineHeight: 1 }}>{k.value}</div>
              <div style={{ fontSize: 13, color: '#64748b', marginTop: 6 }}>{k.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16 }}>
          {/* Recent Orders Table */}
          <div className="card" style={{ overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a2332' }}>Recent Orders</h3>
              <button className="btn-secondary" style={{ fontSize: 13, padding: '6px 12px' }} onClick={() => navigate('/orders')}>View all</button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Value</th>
                    <th>Status</th>
                    <th>ETA</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(o => (
                    <tr key={o.id} onClick={() => navigate(`/orders/${o.id}`)}>
                      <td style={{ fontWeight: 600, color: '#2A4B8D' }}>{o.id}</td>
                      <td>{o.customer}</td>
                      <td style={{ color: '#64748b', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o.items}</td>
                      <td style={{ fontWeight: 600 }}>{o.value}</td>
                      <td>{statusBadge(o.status)}</td>
                      <td style={{ color: '#64748b' }}>{o.eta}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Alerts */}
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '14px 16px', borderBottom: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1a2332' }}>Alerts</h3>
              </div>
              {alerts.map((a, i) => (
                <div key={i} style={{ padding: '12px 16px', borderBottom: i < alerts.length - 1 ? '1px solid #f1f5f9' : 'none', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: a.type === 'warning' ? '#FB8C00' : a.type === 'error' ? '#E53935' : '#2A4B8D', marginTop: 4, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#1a2332' }}>{a.title}</div>
                    <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{a.msg}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="card" style={{ padding: 16 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1a2332', marginBottom: 12 }}>Quick Actions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { label: 'Add Product', icon: '➕', path: '/products/add', color: '#2A4B8D' },
                  { label: 'Upload Catalogue (OCR)', icon: '📄', path: '/catalogue-ocr', color: '#7C3AED' },
                  { label: 'Bulk Upload CSV', icon: '📊', path: '/products/bulk-upload', color: '#4CAF50' },
                ].map(a => (
                  <button
                    key={a.label}
                    onClick={() => navigate(a.path)}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = a.color; e.currentTarget.style.background = '#f8fafc' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = 'white' }}
                  >
                    <span style={{ fontSize: 18 }}>{a.icon}</span>
                    <span style={{ fontSize: 13, fontWeight: 500, color: '#374151' }}>{a.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
