import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/TopBar'

const validationResults = [
  { row: 2, sku: 'SB-100-50-6M', name: 'Steel Beam 100×50', status: 'valid', issue: null },
  { row: 3, sku: 'PLY-18-1220', name: 'Plywood Sheet 18mm', status: 'valid', issue: null },
  { row: 4, sku: '', name: 'Concrete Mix 25kg', status: 'error', issue: 'Missing SKU' },
  { row: 5, sku: 'AI-50-50-5', name: 'Angle Iron 50×50×5', status: 'warning', issue: 'Price below market average' },
  { row: 6, sku: 'RS-0.5-1800', name: 'Roofing Sheet', status: 'valid', issue: null },
  { row: 7, sku: 'PVC-110-6M', name: '', status: 'error', issue: 'Missing product name' },
]

export default function BulkUpload() {
  const navigate = useNavigate()
  const fileRef = useRef<HTMLInputElement>(null)
  const [step, setStep] = useState<'upload' | 'validate' | 'confirm'>('upload')
  const [dragging, setDragging] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)

  const handleFile = (file: File) => {
    setFileName(file.name)
    setUploading(true)
    let p = 0
    const interval = setInterval(() => {
      p += 20
      setProgress(p)
      if (p >= 100) {
        clearInterval(interval)
        setUploading(false)
        setStep('validate')
      }
    }, 200)
  }

  const errors = validationResults.filter(r => r.status === 'error').length
  const warnings = validationResults.filter(r => r.status === 'warning').length
  const valid = validationResults.filter(r => r.status === 'valid').length

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <TopBar
        title="Bulk Upload"
        subtitle="Upload multiple products via CSV"
        actions={
          <button className="btn-secondary" onClick={() => navigate('/products')}>← Back to Products</button>
        }
      />

      <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
        {/* Steps indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 24, maxWidth: 500 }}>
          {[['upload', 'Upload CSV'], ['validate', 'Validate'], ['confirm', 'Confirm']].map(([s, label], i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: step === s ? '#2A4B8D' : ['upload', 'validate', 'confirm'].indexOf(step) > i ? '#4CAF50' : '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: ['upload', 'validate', 'confirm'].indexOf(step) >= i ? 'white' : '#94a3b8' }}>{i + 1}</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: step === s ? 600 : 400, color: step === s ? '#1a2332' : '#64748b' }}>{label}</span>
              </div>
              {i < 2 && <div style={{ width: 48, height: 2, background: '#e2e8f0', margin: '0 12px' }} />}
            </div>
          ))}
        </div>

        {step === 'upload' && (
          <div style={{ maxWidth: 600 }}>
            <div className="card" style={{ padding: 24, marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a2332' }}>Upload CSV File</h3>
                <button
                  className="btn-secondary"
                  style={{ fontSize: 13, padding: '6px 12px' }}
                  onClick={() => {/* download template */}}
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
                  Download Template
                </button>
              </div>

              <div
                className={`upload-zone${dragging ? ' drag-over' : ''}`}
                onDragOver={e => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={e => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f) }}
                onClick={() => fileRef.current?.click()}
              >
                <div style={{ width: 52, height: 52, borderRadius: 12, background: '#e8edf7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <svg width="26" height="26" fill="none" stroke="#2A4B8D" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h5" />
                  </svg>
                </div>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Drag & drop your CSV file here</p>
                <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 12 }}>or click to browse your files</p>
                <p style={{ fontSize: 12, color: '#cbd5e1' }}>Supported: .csv — max 10MB</p>
              </div>
              <input ref={fileRef} type="file" accept=".csv" style={{ display: 'none' }} onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />

              {uploading && (
                <div style={{ marginTop: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 13, color: '#374151' }}>{fileName}</span>
                    <span style={{ fontSize: 13, color: '#64748b' }}>{progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )}
            </div>

            {/* Template info */}
            <div className="card" style={{ padding: 20 }}>
              <h4 style={{ fontSize: 14, fontWeight: 600, color: '#1a2332', marginBottom: 12 }}>Required CSV columns</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['product_name', 'sku', 'category', 'description', 'price', 'stock', 'lead_time'].map(col => (
                  <code key={col} style={{ fontSize: 12, background: '#f1f5f9', padding: '4px 8px', borderRadius: 4, color: '#374151' }}>{col}</code>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 'validate' && (
          <div style={{ maxWidth: 800 }}>
            {/* Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
              {[
                { label: 'Valid rows', value: valid, color: '#4CAF50', bg: '#e8f5e9' },
                { label: 'Warnings', value: warnings, color: '#FB8C00', bg: '#fff3e0' },
                { label: 'Errors', value: errors, color: '#E53935', bg: '#fee2e2' },
              ].map((s, i) => (
                <div key={i} className="card" style={{ padding: 16, borderLeft: `4px solid ${s.color}` }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div className="card" style={{ overflow: 'hidden', marginBottom: 16 }}>
              <div style={{ padding: '14px 20px', borderBottom: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: 14, fontWeight: 700 }}>Validation Results — {fileName}</h3>
              </div>
              <table>
                <thead><tr><th>Row</th><th>SKU</th><th>Product Name</th><th>Status</th><th>Issue</th></tr></thead>
                <tbody>
                  {validationResults.map(r => (
                    <tr key={r.row}>
                      <td style={{ color: '#64748b' }}>{r.row}</td>
                      <td><code style={{ fontSize: 12, background: '#f1f5f9', padding: '2px 6px', borderRadius: 4 }}>{r.sku || '—'}</code></td>
                      <td>{r.name || '—'}</td>
                      <td>
                        <span className={`badge ${r.status === 'valid' ? 'badge-green' : r.status === 'warning' ? 'badge-yellow' : 'badge-red'}`}>
                          {r.status}
                        </span>
                      </td>
                      <td style={{ color: '#64748b', fontSize: 13 }}>{r.issue || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button className="btn-secondary" onClick={() => setStep('upload')}>Re-upload</button>
              <button className="btn-primary" onClick={() => setStep('confirm')} disabled={errors > 0} style={{ opacity: errors > 0 ? 0.5 : 1 }}>
                Confirm Upload ({valid} products)
              </button>
            </div>
            {errors > 0 && <p style={{ fontSize: 13, color: '#E53935', marginTop: 8, textAlign: 'right' }}>Fix {errors} error(s) before proceeding</p>}
          </div>
        )}

        {step === 'confirm' && (
          <div style={{ maxWidth: 480 }}>
            <div className="card" style={{ padding: 32, textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <svg width="32" height="32" fill="none" stroke="#4CAF50" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" /></svg>
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1a2332', marginBottom: 8 }}>Upload Confirmed!</h3>
              <p style={{ fontSize: 14, color: '#64748b', marginBottom: 24 }}>{valid} products have been successfully added to your catalogue.</p>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                <button className="btn-secondary" onClick={() => { setStep('upload'); setFileName(null); setProgress(0) }}>Upload more</button>
                <button className="btn-primary" onClick={() => navigate('/products')}>View Catalogue</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
