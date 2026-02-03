import { useState } from 'react'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL

export default function CreatePaste() {
  const [content, setContent] = useState('')
  const [ttl, setTtl] = useState('')
  const [maxViews, setMaxViews] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const submit = async () => {
    setError(null)
    try {
      const res = await axios.post(`${API}/api/pastes`, {
        content,
        ttl_seconds: ttl ? Number(ttl) : undefined,
        max_views: maxViews ? Number(maxViews) : undefined
      })
      setResult(res.data)
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong')
    }
  }

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2>Pastebin Lite</h2>

      <textarea
        rows="10"
        style={{ width: '100%' }}
        placeholder="Enter your paste..."
        value={content}
        onChange={e => setContent(e.target.value)}
      />

      <div style={{ marginTop: 10 }}>
        <input
          placeholder="TTL (seconds)"
          type="number"
          value={ttl}
          onChange={e => setTtl(e.target.value)}
        />
        <input
          placeholder="Max Views"
          type="number"
          value={maxViews}
          onChange={e => setMaxViews(e.target.value)}
          style={{ marginLeft: 10 }}
        />
      </div>

      <button onClick={submit} style={{ marginTop: 15 }}>
        Create Paste
      </button>

      {result && (
        <div style={{ marginTop: 20 }}>
          <p>Share this link:</p>
          <a href={result.url} target="_blank">{result.url}</a>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}
