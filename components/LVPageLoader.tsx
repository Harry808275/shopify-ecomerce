'use client'

import { useEffect, useState } from 'react'

export default function LVPageLoader() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleLoad = () => {
      setProgress(100)
      setTimeout(() => {
        setProgress(0)
      }, 400)
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      return () => window.removeEventListener('load', handleLoad)
    }
  }, [])

  return (
    <div className="lv-page-loader">
      <div 
        className="lv-page-loader__bar -visible"
        style={{ '--progress': progress } as React.CSSProperties}
      />
    </div>
  )
}




