import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/TopBar'

const orders = [
  { id: 'ORD-2847', items: 'Steel Beam 100×50, Bolt Set M8', qty: 250, value: 'R 4,200', status: 'Pending', customer: 'BuildMart SA', eta: 'Nov 12, 2025' },
  { id: 'ORD-2846', items: 'Plywood 18mm, Wood Screw 4×40', qty: 180, value: 'R 2,850', status: 'In Progress', customer: 'Cashbuild (Pty) Ltd', eta: 'Nov 10, 2025' },
  { id: 'ORD-2845', items: 'Concrete Mix 25kg', qty: 500, value: 'R 6,500', status: 'Completed', customer: 'WBHO Construction', eta: 'Nov 8, 2025' },
  { id: 'ORD-2844', items: 'Angle Iron 50×50×5', qty: 120, value: 'R 1,920', status: 'In Progress', customer: 'PPC Cement SA', eta: 'Nov 9, 2025' },
  { id: 'ORD-2843', items: 'Roofing Sheet 0.5mm', qty: 300, value: 'R 8,100', status: 'Completed', customer: 'Afrimat Holdings', eta: 'Nov 7, 2025' },
  { id: 'ORD-2842', items: 'PVC Pipe 110mm × 50 units', qty: 50, value: 'R 925', status: 'Pending', customer: 'Plumb & Build SA', eta: 'Nov 14, 2025' },
  { id: 'ORD-2841', items: 'Structural Pine 47×100mm', qty: 400, value: 'R 5,680', status: 'Pending', customer: 'BuildMart SA', eta: 'Nov 15, 2025' },
  { id: 'ORD-2840', items: 'Brick 220×110×70', qty: 2000, value: 'R 1,700', status: 'In Progress', customer: 'WBHO Construction', eta: 'Nov 11, 2025' },
]

const statusBadge = (s: string) => {
  const map: Record<string, string> = { Pending: 'badge-yellow', 'In Progress': 'badge-blue', Completed: 'badge-green' }
  return <span className={`badge ${map[s] || 'badge-gray'}`}>{s}</span>
}

export default function Orders() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('All')
  const [search, setSearch] = useState('')

  const tabs = ['All', 'Pending', 'In Progress', 'Completed']
  const filtered = orders.filter(o => {
    const tabMatch = activeTab === 'All' || o.status === activeTab
    const searchMatch = !search || o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase())
    return tabMatch && searchMatch
  })

  const counts = { All: orders.length, Pending: orders.filter(o => o.status === 'Pending').length, 'In Progress': orders.filter(o => o.status === 'In Progress').length, Completed: orders.filter(o => o.status === 'Completed').length }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <TopBar title="Orders" subtitle="Manage and track all supplier orders" />

      <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
        {/* Summary row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
          {[
            { label: 'Total Orders', value: orders.length, color: '#2A4B8D', bg: '#e8edf7' },
            { label: 'Pending', value: counts.Pending, color: '#FB8C00', bg: '#fff3e0' },
            { label: 'In Progress', value: counts['In Progress'], color: '#2563eb', bg: '#dbeafe' },
            { label: 'Completed', value: counts.Completed, color: '#4CAF50', bg: '#e8f5e9' },
          ].map((s, i) => (
            <div key={i} className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 18, fontWeight: 800, color: s.color }}>{s.value}</span>
              </div>
              <span style={{ fontSize: 13, color: '#64748b' }}>{s.label}</span>
            </div>
          ))}
        </div>

        <div className="card" style={{ overflow: 'hidden' }}>
          {/* Tabs + filters */}
          <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #e2e8f0', padding: '0 16px' }}>
            {tabs.map(t => (
              <button key={t} className={`tab-btn${activeTab === t ? ' active' : ''}`} onClick={() => setActiveTab(t)}>
                {t} <span style={{ fontSize: 11, background: '#f1f5f9', padding: '1px 6px', borderRadius: 10, marginLeft: 4, color: '#64748b' }}>{counts[t as keyof typeof counts]}</span>
              </button>
            ))}
            <div style={{ flex: 1 }} />
            <div style={{ position: 'relative' }}>
              <input className="form-input" placeholder="Search orders..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 32, height: 34, width: 220, fontSize: 13 }} />
              <svg style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Qty</th>
                  <th>Value</th>
                  <th>Status</th>
                  <th>ETA</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(o => (
                  <tr key={o.id} onClick={() => navigate(`/orders/${o.id}`)}>
                    <td style={{ fontWeight: 700, color: '#2A4B8D' }}>{o.id}</td>
                    <td style={{ fontWeight: 500 }}>{o.customer}</td>
                    <td style={{ color: '#64748b', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o.items}</td>
                    <td>{o.qty.toLocaleString()}</td>
                    <td style={{ fontWeight: 600 }}>{o.value}</td>
                    <td>{statusBadge(o.status)}</td>
                    <td style={{ color: '#64748b' }}>{o.eta}</td>
                    <td>
                      <button onClick={e => { e.stopPropagation(); navigate(`/orders/${o.id}`) }} style={{ padding: '4px 10px', borderRadius: 6, border: '1px solid #e2e8f0', background: 'white', fontSize: 12, cursor: 'pointer', color: '#2A4B8D', fontWeight: 500 }}>View</button>
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
