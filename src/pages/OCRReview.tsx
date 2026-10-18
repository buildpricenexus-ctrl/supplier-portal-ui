import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/TopBar'

const extractedText = [
  'CAPE STEEL SUPPLIES (PTY) LTD — PRODUCT CATALOGUE Q4 2025',
  'STRUCTURAL STEEL PRODUCTS (SANS 1431 Grade 300W)',
  'Universal Beam 100×50 — Grade 300W — R 45.00/unit — Min qty: 10',
  'Universal Column 150×100 — Grade 300W — R 72.00/unit — Min qty: 5',
  'Angle Iron 50×50×5 — Grade 300W — R 28.00/unit — Min qty: 20',
  'TIMBER & BOARD PRODUCTS',
  'Structural Pine 47×100 — SANS 1783-2 — R 14.20/lm — Min qty: 50',
  'Plywood 18mm — SANS 929 — R 32.50/sheet — Min qty: 10',
]

const extractedTable = [
  { col1: 'Steel Beam 100×50', col2: 'SB-100-50', col3: 'Structural Steel', col4: 'R 45.00', col5: 'unit', col6: 'In Stock' },
  { col1: 'Steel Column 150×100', col2: 'SC-150-100', col3: 'Structural Steel', col4: 'R 72.00', col5: 'unit', col6: 'In Stock' },
  { col1: 'Angle Iron 50×50', col2: 'AI-50-50', col3: 'Structural Steel', col4: 'R 28.00', col5: 'unit', col6: 'In Stock' },
  { col1: 'Pine Timber 47×100', col2: 'TIM-47-100', col3: 'Timber', col4: 'R 14.20', col5: 'lm', col6: 'In Stock' },
  { col1: 'Plywood 18mm', col2: 'PLY-18', col3: 'Timber', col4: 'R 32.50', col5: 'sheet', col6: 'In Stock' },
]

const fieldOptions = ['—', 'Product Name', 'SKU', 'Category', 'Price', 'Unit', 'Stock', 'Delivery Lead Time']

const mappings = [
  { extracted: 'col1 (First Column)', suggestion: 'Product Name' },
  { extracted: 'col2 (Second Column)', suggestion: 'SKU' },
  { extracted: 'col3 (Third Column)', suggestion: 'Category' },
  { extracted: 'col4 (Fourth Column)', suggestion: 'Price' },
  { extracted: 'col5 (Fifth Column)', suggestion: 'Unit' },
  { extracted: 'col6 (Sixth Column)', suggestion: 'Stock' },
]

export default function OCRReview() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('table')
  const [fieldMappings, setFieldMappings] = useState(mappings.map(m => m.suggestion))
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => { setSaved(false); navigate('/products') }, 2000)
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <TopBar
        title="OCR Extraction Review & Mapping"
        subtitle="Catalogue_Q4_2025.pdf — 47 products extracted"
        actions={
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn-secondary" onClick={() => navigate('/catalogue-ocr')}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 4v6h6M23 20v-6h-6" /><path d="M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15" /></svg>
              Re-run OCR
            </button>
            <button className="btn-secondary" onClick={() => {}}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
              Export CSV
            </button>
            <button className="btn-primary" onClick={handleSave}>
              {saved ? '✓ Saved to Catalogue' : 'Save Mapped Products'}
            </button>
          </div>
        }
      />

      <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20 }}>
          {/* Extraction preview */}
          <div>
            <div className="card" style={{ overflow: 'hidden' }}>
              <div style={{ borderBottom: '1px solid #e2e8f0', padding: '0 4px' }}>
                {['table', 'text', 'datasheet'].map(t => (
                  <button key={t} className={`tab-btn${activeTab === t ? ' active' : ''}`} onClick={() => setActiveTab(t)}>
                    {t === 'table' ? 'Table Extraction' : t === 'text' ? 'Text Extraction' : 'Datasheet Extraction'}
                  </button>
                ))}
              </div>

              {activeTab === 'table' && (
                <div style={{ overflowX: 'auto' }}>
                  <div style={{ padding: '12px 16px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <span style={{ fontSize: 12, color: '#64748b' }}>Extracted from pages 3–18 · 5 columns, 47 rows detected</span>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        {['Product Name', 'SKU', 'Category', 'Price', 'Unit', 'Availability'].map(h => (
                          <th key={h}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {extractedTable.map((row, i) => (
                        <tr key={i}>
                          <td style={{ fontWeight: 500 }}>{row.col1}</td>
                          <td><code style={{ fontSize: 12, background: '#f1f5f9', padding: '2px 6px', borderRadius: 4 }}>{row.col2}</code></td>
                          <td style={{ color: '#64748b' }}>{row.col3}</td>
                          <td style={{ fontWeight: 600 }}>{row.col4}</td>
                          <td>{row.col5}</td>
                          <td><span className="badge badge-green">{row.col6}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'text' && (
                <div style={{ padding: 20 }}>
                  <div style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>Raw text extracted from document</div>
                  <div style={{ background: '#1a2332', borderRadius: 8, padding: 20, fontFamily: 'monospace', fontSize: 13, lineHeight: '1.8', color: '#e2e8f0', maxHeight: 400, overflowY: 'auto' }}>
                    {extractedText.map((line, i) => (
                      <div key={i} style={{ marginBottom: 4 }}>
                        <span style={{ color: '#4CAF50', marginRight: 12, userSelect: 'none' }}>{(i + 1).toString().padStart(2, '0')}</span>
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'datasheet' && (
                <div style={{ padding: 20 }}>
                  <div style={{ fontSize: 12, color: '#64748b', marginBottom: 16 }}>Technical specifications extracted</div>
                  {[
                    { spec: 'Standard', value: 'SANS 1431 Grade 300W' },
                    { spec: 'Material', value: 'Hot-rolled structural steel' },
                    { spec: 'Yield Strength', value: '300 MPa minimum' },
                    { spec: 'Tensile Strength', value: '440 MPa minimum' },
                    { spec: 'Surface', value: 'Mill scale / Black' },
                    { spec: 'Length options', value: '6m, 9m, 12m' },
                  ].map((s, i) => (
                    <div key={i} style={{ display: 'flex', gap: 16, padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                      <div style={{ width: 160, fontSize: 13, fontWeight: 500, color: '#374151', flexShrink: 0 }}>{s.spec}</div>
                      <div style={{ fontSize: 13, color: '#64748b' }}>{s.value}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mapping panel */}
          <div>
            <div className="card" style={{ padding: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1a2332', marginBottom: 4 }}>Field Mapping</h3>
              <p style={{ fontSize: 13, color: '#64748b', marginBottom: 20 }}>Map extracted columns to catalogue fields</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {mappings.map((m, i) => (
                  <div key={i} style={{ padding: 14, border: '1px solid #e2e8f0', borderRadius: 8, background: '#f8fafc' }}>
                    <div style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>Extracted field</div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: '#1a2332', marginBottom: 10 }}>{m.extracted}</div>
                    <div style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>Map to</div>
                    <select
                      className="form-select"
                      style={{ fontSize: 13 }}
                      value={fieldMappings[i]}
                      onChange={e => {
                        const updated = [...fieldMappings]
                        updated[i] = e.target.value
                        setFieldMappings(updated)
                      }}
                    >
                      {fieldOptions.map(o => <option key={o}>{o}</option>)}
                    </select>
                    {fieldMappings[i] !== '—' && (
                      <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <svg width="12" height="12" fill="none" stroke="#4CAF50" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" /></svg>
                        <span style={{ fontSize: 11, color: '#4CAF50', fontWeight: 500 }}>Mapped to: {fieldMappings[i]}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 20, padding: 14, background: '#e8f5e9', borderRadius: 8, border: '1px solid #c8e6c9' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#2e7d32', marginBottom: 4 }}>
                  {fieldMappings.filter(f => f !== '—').length}/{mappings.length} fields mapped
                </div>
                <div style={{ height: 6, background: '#c8e6c9', borderRadius: 3 }}>
                  <div style={{ height: '100%', background: '#4CAF50', borderRadius: 3, width: `${(fieldMappings.filter(f => f !== '—').length / mappings.length) * 100}%`, transition: 'width 0.3s' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
