import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API } from './api'

export default function ViewPaste() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios.get(`${API}api/pastes/${id}`)
      .then(res => setData(res.data))
      .catch(() => setError("Paste not found or expired"))
  }, [id])

  if (error) return <h3>{error}</h3>
  if (!data) return <h3>Loading...</h3>

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{data.content}</pre>
    </div>
  )
}
