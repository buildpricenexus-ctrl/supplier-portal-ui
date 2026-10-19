import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import TopBar from '../components/TopBar'

type UploadState = 'idle' | 'uploading' | 'processing' | 'completed' | 'error'

export default function DocumentUpload() {
  const navigate = useNavigate()
  const fileRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [uploadState, setUploadState] = useState<UploadState>('idle')
  const [progress, setProgress] = useState(0)
  const [fileName, setFileName] = useState<string | null>(null)

  const [file, setFile] = useState<File | null>(null)

  const handleFile = (file: File) => {
    setFileName(file.name)
    setUploadState('uploading')
    let p = 0
    const upload = setInterval(() => {
      p += 15
      setProgress(p)
      if (p >= 100) {
        clearInterval(upload)
        setUploadState('idle')
        setProgress(0)
      }
    }, 100)
    setFile(file)
  }

  const startOCR = async () => {

    const response = await fetch('http://localhost:8000/ocr/', { credentials: 'include' })
    handleUpload(file)
  }

  const getCookie = (name: string) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  const handleUpload = async (file: any) => {

    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/ocr/', {
        credentials: 'include',
        method: 'POST',
        body: formData,
        headers: { 'X-CSRFToken': getCookie('csrftoken') ?? '' }
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Success:', result);
      } else {
        console.error('Upload failed');
      }
    } catch (error) {
      console.error('Error during upload:', error);
    }
  };

  const stateConfig = {
    idle: { label: 'Ready to upload', color: '#64748b', bg: '#f8fafc' },
    uploading: { label: 'Uploading file...', color: '#2A4B8D', bg: '#e8edf7' },
    processing: { label: 'OCR Processing...', color: '#7C3AED', bg: '#ede9fe' },
    completed: { label: 'Extraction Complete', color: '#4CAF50', bg: '#e8f5e9' },
    error: { label: 'Error occurred', color: '#E53935', bg: '#fee2e2' },
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <TopBar
        title="Document Upload & OCR"
        subtitle="Upload product catalogue PDFs for automated data extraction"
      />

      <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
        <div style={{ maxWidth: 720 }}>
          {/* Info banner */}
          <div style={{ display: 'flex', gap: 12, padding: '14px 16px', background: '#e8edf7', borderRadius: 8, border: '1px solid #c7d4f0', marginBottom: 20 }}>
            <svg width="18" height="18" fill="none" stroke="#2A4B8D" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 1 }}>
              <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
            </svg>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#1e3a6e', marginBottom: 2 }}>Supplier Catalogue OCR</div>
              <div style={{ fontSize: 13, color: '#374151' }}>Upload product catalogues, price lists, datasheets, and technical documents. Our AI will extract product data and map it to your catalogue fields automatically.</div>
            </div>
          </div>

          <div className="card" style={{ padding: 24, marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a2332' }}>Upload Product Catalogue (PDF)</h3>
              {uploadState !== 'idle' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 12px', borderRadius: 20, background: stateConfig[uploadState].bg }}>
                  {uploadState === 'processing' && (
                    <span style={{ width: 10, height: 10, border: '2px solid', borderColor: `${stateConfig[uploadState].color} transparent transparent transparent`, borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
                  )}
                  {uploadState === 'completed' && <span>✓</span>}
                  <span style={{ fontSize: 12, fontWeight: 600, color: stateConfig[uploadState].color }}>{stateConfig[uploadState].label}</span>
                </div>
              )}
            </div>

            {/* Drop zone */}
            <div
              className={`upload-zone${dragging ? ' drag-over' : ''}`}
              style={{ position: 'relative' }}
              onDragOver={e => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={e => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f) }}
              onClick={() => fileRef.current?.click()}
            >
              {fileName ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 12, background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="28" height="28" fill="none" stroke="#E53935" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h5" />
                    </svg>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#1a2332' }}>{fileName}</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>PDF document selected • Click to replace</div>
                </div>
              ) : (
                <div>
                  <div style={{ width: 60, height: 60, borderRadius: 14, background: '#e8edf7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <svg width="28" height="28" fill="none" stroke="#2A4B8D" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                    </svg>
                  </div>
                  <p style={{ fontSize: 15, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Drag & drop your catalogue here</p>
                  <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 16 }}>or click to browse files</p>
                  <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                    {['PDF', 'TIFF', 'PNG'].map(fmt => (
                      <span key={fmt} style={{ padding: '4px 10px', borderRadius: 20, background: '#f1f5f9', fontSize: 12, fontWeight: 500, color: '#64748b' }}>{fmt}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept=".pdf,.tiff,.png" style={{ display: 'none' }} onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />

            {/* PDF preview placeholder */}
            {fileName && (
              <div style={{ marginTop: 16, padding: 16, background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0', display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 48, height: 60, background: '#fee2e2', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#E53935' }}>PDF</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1a2332' }}>{fileName}</div>
                  <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>24 pages · 4.2 MB · Ready for OCR</div>
                  <div style={{ marginTop: 8 }}>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: '100%', background: '#4CAF50' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
              <button className="btn-secondary" onClick={() => { setFileName(null); setUploadState('idle'); setProgress(0) }}>Cancel</button>
              <button
                className="btn-primary"
                disabled={!fileName || uploadState === 'processing'}
                style={{ opacity: (!fileName || uploadState === 'processing') ? 0.5 : 1 }}
                onClick={startOCR}
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
                </svg>
                Start OCR
              </button>
            </div>
          </div>

          {/* Recent uploads */}
          <div className="card" style={{ overflow: 'hidden' }}>
            <div style={{ padding: '14px 20px', borderBottom: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1a2332' }}>Recent Uploads</h3>
            </div>
            <table>
              <thead><tr><th>Filename</th><th>Type</th><th>Uploaded</th><th>Status</th><th></th></tr></thead>
              <tbody>
                {[
                  { name: 'Catalogue_Q4_2025.pdf', type: 'PDF', date: 'Oct 28, 2025', status: 'Completed', products: 47 },
                  { name: 'Price_List_Steel.pdf', type: 'PDF', date: 'Oct 15, 2025', status: 'Completed', products: 23 },
                  { name: 'Timber_Datasheet.tiff', type: 'TIFF', date: 'Oct 5, 2025', status: 'Error', products: 0 },
                ].map((f, i) => (
                  <tr key={i} onClick={f.status === 'Completed' ? () => navigate('/catalogue-ocr/review') : undefined}>
                    <td style={{ fontWeight: 500 }}>{f.name}</td>
                    <td><span className="badge badge-blue" style={{ fontSize: 11 }}>{f.type}</span></td>
                    <td style={{ color: '#64748b' }}>{f.date}</td>
                    <td><span className={`badge ${f.status === 'Completed' ? 'badge-green' : 'badge-red'}`}>{f.status}</span></td>
                    <td>
                      {f.status === 'Completed' && (
                        <button className="btn-secondary" style={{ padding: '4px 10px', fontSize: 12 }} onClick={e => { e.stopPropagation(); navigate('/catalogue-ocr/review') }}>
                          Review ({f.products})
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
