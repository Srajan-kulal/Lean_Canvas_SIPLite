import React, { useState } from 'react'
import { useStore } from './store/useStore'
import Onboarding from './components/Onboarding'
import CanvasView from './components/CanvasView'

export default function App() {
  const { teamName } = useStore()
  const [ready, setReady] = useState(false)
  return ready || teamName ? <CanvasView /> : <Onboarding onStart={() => setReady(true)} />
}
