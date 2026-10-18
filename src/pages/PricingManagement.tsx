import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import TopBar from '../components/TopBar'

const priceData = [
  { month: 'Jun', steel: 42, plywood: 30, concrete: 12 },
  { month: 'Jul', steel: 43, plywood: 31, concrete: 12.5 },
  { month: 'Aug', steel: 44, plywood: 31.5, concrete: 12.5 },
  { month: 'Sep', steel: 43.5, plywood: 32, concrete: 13 },
  { month: 'Oct', steel: 45, plywood: 32.5, concrete: 13 },
  { month: 'Nov', steel: 46, plywood: 33, concrete: 13.5 },
]

const prices = [
  { product: 'Steel Beam 100×50', current: 'R 45.00', prev: 'R 43.50', change: '+3.4%', up: true, updated: 'Oct 28, 2025' },
  { product: 'Plywood Sheet 18mm', current: 'R 32.50', prev: 'R 31.00', change: '+4.8%', up: true, updated: 'Oct 25, 2025' },
  { product: 'Concrete Mix 25kg', current: 'R 13.00', prev: 'R 13.00', change: '0.0%', up: null, updated: 'Oct 20, 2025' },
  { product: 'Angle Iron 50×50×5', current: 'R 28.00', prev: 'R 29.50', change: '-5.1%', up: false, updated: 'Oct 15, 2025' },
  { product: 'Roofing Sheet 0.5mm', current: 'R 27.00', prev: 'R 25.00', change: '+8.0%', up: true, updated: 'Oct 10, 2025' },
  { product: 'PVC Pipe 110mm', current: 'R 18.50', prev: 'R 18.00', change: '+2.8%', up: true, updated: 'Oct 8, 2025' },
]

const history = [
  { product: 'Steel Beam 100×50', from: 'R 43.50', to: 'R 45.00', change: '+3.4%', date: 'Oct 28, 2025', by: 'Auto (market sync)' },
  { product: 'Roofing Sheet 0.5mm', from: 'R 25.00', to: 'R 27.00', change: '+8.0%', date: 'Oct 10, 2025', by: 'Thabo Nkosi' },
  { product: 'Angle Iron 50×50×5', from: 'R 29.50', to: 'R 28.00', change: '-5.1%', date: 'Oct 15, 2025', by: 'Auto (market sync)' },
  { product: 'Plywood Sheet 18mm', from: 'R 31.00', to: 'R 32.50', change: '+4.8%', date: 'Oct 25, 2025', by: 'Priya Naidoo' },
]

export default function PricingManagement() {
  const [activeTab, setActiveTab] = useState('list')

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <TopBar
        title="Pricing Management"
        subtitle="Monitor and update your product pricing"
        actions={
          <button className="btn-primary">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>
            Update Prices
          </button>
        }
      />

      <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
        {/* Price trend chart */}
        <div className="card" style={{ padding: 24, marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a2332' }}>Price Trend (Jun–Nov 2025)</h3>
              <p style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>Top 3 products by revenue</p>
            </div>
            <select className="form-select" style={{ width: 160, height: 34 }}>
              <option>Last 6 months</option>
              <option>Last 3 months</option>
              <option>Last year</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={priceData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `R${v}`} />
              <Tooltip formatter={(v) => [`R${Number(v).toFixed(2)}`, '']} contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }} />
              <Legend wrapperStyle={{ fontSize: 13 }} />
              <Line type="monotone" dataKey="steel" stroke="#2A4B8D" strokeWidth={2.5} dot={false} name="Steel Beam 100×50" />
              <Line type="monotone" dataKey="plywood" stroke="#4CAF50" strokeWidth={2.5} dot={false} name="Plywood 18mm" />
              <Line type="monotone" dataKey="concrete" stroke="#FB8C00" strokeWidth={2.5} dot={false} name="Concrete Mix" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ borderBottom: '1px solid #e2e8f0', padding: '0 4px' }}>
            {[['list', 'Price List'], ['history', 'Price History']].map(([val, label]) => (
              <button key={val} className={`tab-btn${activeTab === val ? ' active' : ''}`} onClick={() => setActiveTab(val)}>{label}</button>
            ))}
          </div>

          {activeTab === 'list' && (
            <table>
              <thead><tr><th>Product</th><th>Current Price</th><th>Previous Price</th><th>Change</th><th>Last Updated</th><th></th></tr></thead>
              <tbody>
                {prices.map((p, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 500 }}>{p.product}</td>
                    <td style={{ fontWeight: 700, fontSize: 15 }}>{p.current}</td>
                    <td style={{ color: '#94a3b8', textDecoration: 'line-through' }}>{p.prev}</td>
                    <td>
                      <span style={{ fontSize: 13, fontWeight: 600, color: p.up === null ? '#64748b' : p.up ? '#16a34a' : '#dc2626' }}>
                        {p.up === true ? '↑ ' : p.up === false ? '↓ ' : ''}{p.change}
                      </span>
                    </td>
                    <td style={{ color: '#64748b' }}>{p.updated}</td>
                    <td>
                      <button style={{ padding: '4px 10px', borderRadius: 6, border: '1px solid #e2e8f0', background: 'white', fontSize: 12, cursor: 'pointer', color: '#2A4B8D', fontWeight: 500 }}>Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'history' && (
            <table>
              <thead><tr><th>Product</th><th>From</th><th>To</th><th>Change</th><th>Date</th><th>Updated by</th></tr></thead>
              <tbody>
                {history.map((h, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 500 }}>{h.product}</td>
                    <td style={{ color: '#94a3b8', textDecoration: 'line-through' }}>{h.from}</td>
                    <td style={{ fontWeight: 600 }}>{h.to}</td>
                    <td><span style={{ fontSize: 13, fontWeight: 600, color: h.change.startsWith('+') ? '#16a34a' : '#dc2626' }}>{h.change}</span></td>
                    <td style={{ color: '#64748b' }}>{h.date}</td>
                    <td style={{ color: '#64748b', fontSize: 13 }}>{h.by}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
