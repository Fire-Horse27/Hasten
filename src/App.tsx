import { useEffect, useState } from 'react'

type AppStatus = {
  appName: string
  dbReady: boolean
}

function App() {
  const [status, setStatus] = useState<AppStatus | null>(null)

  useEffect(() => {
    window.api.getAppStatus().then(setStatus)
  }, [])

  if (!status) return <div>Loading…</div>

  return (
    <div>
      <div>{status.appName}</div>
      <div>DB ready: {String(status.dbReady)}</div>
    </div>
  )
}

export default App
