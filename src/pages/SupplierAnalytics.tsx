import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis } from 'recharts'
import TopBar from '../components/TopBar'

const deliveryData = [
  { month: 'Jun', onTime: 94, delayed: 6 },
  { month: 'Jul', onTime: 96, delayed: 4 },
  { month: 'Aug', onTime: 92, delayed: 8 },
  { month: 'Sep', onTime: 97, delayed: 3 },
  { month: 'Oct', onTime: 95, delayed: 5 },
  { month: 'Nov', onTime: 98, delayed: 2 },
]

const revenueData = [
  { month: 'Jun', revenue: 420000 },
  { month: 'Jul', revenue: 510000 },
  { month: 'Aug', revenue: 480000 },
  { month: 'Sep', revenue: 550000 },
  { month: 'Oct', revenue: 610000 },
  { month: 'Nov', revenue: 580000 },
]

const radarData = [
  { subject: 'Delivery', value: 96 },
  { subject: 'Quality', value: 94 },
  { subject: 'Price', value: 78 },
  { subject: 'Response', value: 89 },
  { subject: 'Catalogue', value: 92 },
  { subject: 'Returns', value: 97 },
]

const issues = [
  { id: 'QI-041', product: 'Steel Beam 100×50', type: 'Dimension variance', date: 'Oct 22, 2025', status: 'Resolved', impact: 'Low' },
  { id: 'QI-038', product: 'Concrete Mix 25kg', type: 'Moisture content (load-shedding storage)', date: 'Oct 10, 2025', status: 'Resolved', impact: 'Medium' },
  { id: 'QI-035', product: 'Plywood 18mm', type: 'Surface delamination', date: 'Sep 28, 2025', status: 'Under review', impact: 'High' },
]

export default function SupplierAnalytics() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <TopBar
        title="Supplier Analytics"
        subtitle="Performance overview for Acme Supplies"
        actions={
          <select className="form-select" style={{ width: 160, height: 36 }}>
            <option>Last 6 months</option>
            <option>Last 3 months</option>
            <option>This year</option>
          </select>
        }
      />

      <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
        {/* KPI row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
          {[
            { label: 'On-Time Delivery', value: '96.4%', sub: 'Last 30 days', color: '#4CAF50', bg: '#e8f5e9' },
            { label: 'Quality Score', value: '94.2%', sub: '3 open issues', color: '#2A4B8D', bg: '#e8edf7' },
            { label: 'Price Competitiveness', value: '78/100', sub: 'vs. market avg', color: '#FB8C00', bg: '#fff3e0' },
            { label: 'Customer Rating', value: '4.7 / 5', sub: '142 reviews (Hellopeter)', color: '#7C3AED', bg: '#ede9fe' },
          ].map((k, i) => (
            <div key={i} className="kpi-card">
              <div style={{ width: 40, height: 40, borderRadius: 10, background: k.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                <div style={{ width: 16, height: 16, borderRadius: '50%', background: k.color }} />
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#1a2332' }}>{k.value}</div>
              <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>{k.label}</div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{k.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          {/* Delivery performance */}
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1a2332', marginBottom: 16 }}>Delivery Performance</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={deliveryData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }} />
                <Bar dataKey="onTime" stackId="a" fill="#4CAF50" radius={[0, 0, 0, 0]} name="On Time" />
                <Bar dataKey="delayed" stackId="a" fill="#fee2e2" radius={[4, 4, 0, 0]} name="Delayed" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue trend */}
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1a2332', marginBottom: 16 }}>Monthly Revenue</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={revenueData} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `R${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v) => [`R${Number(v).toLocaleString()}`, 'Revenue']} contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }} />
                <Line type="monotone" dataKey="revenue" stroke="#2A4B8D" strokeWidth={2.5} dot={{ r: 4, fill: '#2A4B8D' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 16 }}>
          {/* Radar: supplier scorecard */}
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1a2332', marginBottom: 8 }}>Supplier Scorecard</h3>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#64748b' }} />
                <Radar name="Score" dataKey="value" stroke="#2A4B8D" fill="#2A4B8D" fillOpacity={0.15} strokeWidth={2} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Quality issues */}
          <div className="card" style={{ overflow: 'hidden' }}>
            <div style={{ padding: '14px 20px', borderBottom: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1a2332' }}>Quality Issues</h3>
            </div>
            <table>
              <thead><tr><th>Issue ID</th><th>Product</th><th>Type</th><th>Date</th><th>Impact</th><th>Status</th></tr></thead>
              <tbody>
                {issues.map((issue, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 700, color: '#2A4B8D' }}>{issue.id}</td>
                    <td style={{ fontWeight: 500 }}>{issue.product}</td>
                    <td style={{ color: '#64748b' }}>{issue.type}</td>
                    <td style={{ color: '#64748b' }}>{issue.date}</td>
                    <td>
                      <span className={`badge ${issue.impact === 'High' ? 'badge-red' : issue.impact === 'Medium' ? 'badge-yellow' : 'badge-green'}`}>{issue.impact}</span>
                    </td>
                    <td>
                      <span className={`badge ${issue.status === 'Resolved' ? 'badge-green' : 'badge-yellow'}`}>{issue.status}</span>
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
