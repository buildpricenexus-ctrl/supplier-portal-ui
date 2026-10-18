import { useState } from 'react'
import TopBar from '../components/TopBar'

const users = [
  { name: 'Thabo Nkosi', email: 'thabo.nkosi@capesteelsupplies.co.za', role: 'Admin', status: 'Active' },
  { name: 'Priya Naidoo', email: 'priya.naidoo@capesteelsupplies.co.za', role: 'Manager', status: 'Active' },
  { name: 'Riaan van der Berg', email: 'r.vdberg@capesteelsupplies.co.za', role: 'Viewer', status: 'Inactive' },
]

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const tabs = [
    ['profile', 'Company Profile'],
    ['bank', 'Bank Details'],
    ['api', 'API Keys'],
    ['notifications', 'Notifications'],
    ['users', 'User Management'],
  ]

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <TopBar
        title="Settings"
        subtitle="Manage your supplier account and preferences"
        actions={
          activeTab !== 'api' && activeTab !== 'users' ? (
            <button className="btn-primary" onClick={handleSave}>
              {saved ? '✓ Saved' : 'Save Changes'}
            </button>
          ) : undefined
        }
      />

      <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 20, maxWidth: 1000 }}>
          {/* Sidebar tabs */}
          <div className="card" style={{ padding: 12, alignSelf: 'start' }}>
            {tabs.map(([val, label]) => (
              <button
                key={val}
                onClick={() => setActiveTab(val)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left', padding: '10px 12px',
                  borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500,
                  background: activeTab === val ? '#e8edf7' : 'transparent',
                  color: activeTab === val ? '#2A4B8D' : '#374151',
                  marginBottom: 2, transition: 'all 0.15s',
                }}
                onMouseEnter={e => { if (activeTab !== val) e.currentTarget.style.background = '#f8fafc' }}
                onMouseLeave={e => { if (activeTab !== val) e.currentTarget.style.background = 'transparent' }}
              >{label}</button>
            ))}
          </div>

          {/* Content */}
          <div>
            {activeTab === 'profile' && (
              <div className="card" style={{ padding: 28 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a2332', marginBottom: 24 }}>Company Profile</h3>
                {/* Logo */}
                <div style={{ display: 'flex', gap: 20, alignItems: 'center', padding: 20, background: '#f8fafc', borderRadius: 10, border: '1px solid #e2e8f0', marginBottom: 24 }}>
                  <div style={{ width: 72, height: 72, borderRadius: 14, background: 'linear-gradient(135deg, #4CAF50, #2A4B8D)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: 'white', fontSize: 24, fontWeight: 800 }}>C</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#1a2332', marginBottom: 4 }}>Cape Steel Supplies (Pty) Ltd</div>
                    <div style={{ fontSize: 13, color: '#64748b', marginBottom: 10 }}>Company logo · 250×250px recommended</div>
                    <button className="btn-secondary" style={{ fontSize: 13, padding: '6px 12px' }}>Upload Logo</button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {[
                    { label: 'Company Name', val: 'Cape Steel Supplies (Pty) Ltd' },
                    { label: 'CIPC Reg. No.', val: '2018/234567/07' },
                    { label: 'VAT Number', val: '4780123456' },
                    { label: 'Contact Email', val: 'contact@capesteelsupplies.co.za' },
                    { label: 'Phone', val: '+27 21 045 6789' },
                    { label: 'Website', val: 'www.capesteelsupplies.co.za' },
                  ].map(f => (
                    <div key={f.label}>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>{f.label}</label>
                      <input className="form-input" defaultValue={f.val} />
                    </div>
                  ))}
                  <div style={{ gridColumn: '1/-1' }}>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Business Address</label>
                    <input className="form-input" defaultValue="22 Paarden Eiland Rd, Paarden Eiland, Cape Town, 7405" />
                  </div>
                  <div style={{ gridColumn: '1/-1' }}>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Industry</label>
                    <input className="form-input" defaultValue="Building & Construction Supplies" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'bank' && (
              <div className="card" style={{ padding: 28 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a2332', marginBottom: 8 }}>Bank Details</h3>
                <p style={{ fontSize: 13, color: '#64748b', marginBottom: 24 }}>Used for EFT payment processing. Data is encrypted at rest.</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {[
                    { label: 'Account Name', val: 'Cape Steel Supplies (Pty) Ltd' },
                    { label: 'Bank', val: 'First National Bank (FNB)' },
                    { label: 'Branch Code', val: '250655' },
                    { label: 'Account Number', val: '••••••7821' },
                    { label: 'Account Type', val: 'Business Cheque' },
                    { label: 'Currency', val: 'ZAR' },
                  ].map(f => (
                    <div key={f.label}>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>{f.label}</label>
                      <input className="form-input" defaultValue={f.val} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'api' && (
              <div className="card" style={{ padding: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a2332', marginBottom: 4 }}>API Keys</h3>
                    <p style={{ fontSize: 13, color: '#64748b' }}>Manage API access for integrations</p>
                  </div>
                  <button className="btn-primary" style={{ fontSize: 13 }}>Generate Key</button>
                </div>
                {[
                  { name: 'Production Key', key: 'sk_live_••••••••••••••••4A2F', created: 'Oct 1, 2025', last: '2 hours ago' },
                  { name: 'Staging Key', key: 'sk_test_••••••••••••••••8C1E', created: 'Sep 15, 2025', last: '3 days ago' },
                ].map((k, i) => (
                  <div key={i} style={{ padding: 18, border: '1px solid #e2e8f0', borderRadius: 10, marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#1a2332' }}>{k.name}</div>
                        <code style={{ fontSize: 13, color: '#64748b', marginTop: 4, display: 'block' }}>{k.key}</code>
                        <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>Created {k.created} · Last used {k.last}</div>
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn-secondary" style={{ fontSize: 12, padding: '5px 10px' }}>Copy</button>
                        <button className="btn-danger" style={{ fontSize: 12, padding: '5px 10px' }}>Revoke</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="card" style={{ padding: 28 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a2332', marginBottom: 24 }}>Notification Preferences</h3>
                {[
                  { label: 'New order received', desc: 'Notify when a new order is placed', email: true, push: true },
                  { label: 'Order status change', desc: 'Notify when order status updates', email: true, push: false },
                  { label: 'Low stock alert', desc: 'Notify when stock falls below threshold', email: true, push: true },
                  { label: 'Price update', desc: 'Notify about market price changes', email: false, push: false },
                  { label: 'OCR completed', desc: 'Notify when document OCR finishes', email: true, push: false },
                  { label: 'Payment received', desc: 'Notify when payment is processed', email: true, push: true },
                ].map((n, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: i < 5 ? '1px solid #f1f5f9' : 'none' }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: '#1a2332' }}>{n.label}</div>
                      <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{n.desc}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 20 }}>
                      {[['Email', n.email], ['Push', n.push]].map(([type, val]) => (
                        <label key={type as string} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
                          <span style={{ fontSize: 11, color: '#94a3b8' }}>{type}</span>
                          <div style={{ width: 40, height: 22, borderRadius: 11, background: val ? '#2A4B8D' : '#e2e8f0', position: 'relative', cursor: 'pointer', transition: 'background 0.2s' }}>
                            <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'white', position: 'absolute', top: 3, left: val ? 21 : 3, transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'users' && (
              <div className="card" style={{ overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a2332' }}>User Management</h3>
                  <button className="btn-primary" style={{ fontSize: 13 }}>
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>
                    Invite User
                  </button>
                </div>
                <table>
                  <thead><tr><th>User</th><th>Email</th><th>Role</th><th>Status</th><th></th></tr></thead>
                  <tbody>
                    {users.map((u, i) => (
                      <tr key={i}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#e8edf7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <span style={{ fontSize: 12, fontWeight: 700, color: '#2A4B8D' }}>{u.name.split(' ').map(n => n[0]).join('')}</span>
                            </div>
                            <span style={{ fontWeight: 500 }}>{u.name}</span>
                          </div>
                        </td>
                        <td style={{ color: '#64748b' }}>{u.email}</td>
                        <td><span className="badge badge-blue">{u.role}</span></td>
                        <td><span className={`badge ${u.status === 'Active' ? 'badge-green' : 'badge-gray'}`}>{u.status}</span></td>
                        <td>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button style={{ padding: '4px 10px', borderRadius: 6, border: '1px solid #e2e8f0', background: 'white', fontSize: 12, cursor: 'pointer', color: '#2A4B8D', fontWeight: 500 }}>Edit</button>
                            <button style={{ padding: '4px 10px', borderRadius: 6, border: '1px solid #fee2e2', background: '#fee2e2', fontSize: 12, cursor: 'pointer', color: '#E53935', fontWeight: 500 }}>Remove</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
