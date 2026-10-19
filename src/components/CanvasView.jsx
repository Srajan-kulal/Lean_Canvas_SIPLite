import React, { useState } from 'react'
import { useStore, BLOCKS } from '../store/useStore'
import Block from './Block'
import ContextPanel from './ContextPanel'
import SubmitModal from './SubmitModal'

const B = (id) => BLOCKS.find(b => b.id === id)

export default function CanvasView() {
  const { teamName, projectName, mentorName, status, submittedAt, lastSavedAt,
    canSubmit, getCompletionCount, showContext, showHints, toggleContext, toggleHints,
    zoom, setZoom, submit, reset, context, getBlockStatus } = useStore()
  const [showModal, setShowModal] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const submitted = status === 'submitted'
  const done = getCompletionCount()
  const total = BLOCKS.filter(b => b.required).length
  const hasCtx = context.problemStatement || context.hmwStatement || context.primaryStakeholder

  return (
    <div className={`flex flex-col ${fullscreen ? 'fixed inset-0 z-50 bg-gray-50' : 'min-h-screen'}`}>

      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between gap-3 shrink-0 shadow-sm">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-xl">🎯</span>
          <div className="min-w-0">
            <div className="font-bold text-gray-900 text-sm truncate">Lean Canvas — {projectName}</div>
            <div className="text-xs text-gray-400 truncate">{teamName}{mentorName ? ` · ${mentorName}` : ''}</div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
          <div className={`text-xs font-semibold px-3 py-1.5 rounded-full ${done === total ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
            {done}/{total} blocks
          </div>
          {submitted && <div className="text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-100 text-blue-700">✓ Submitted</div>}

          {hasCtx && (
            <button onClick={toggleContext} className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${showContext ? 'bg-blue-50 border-blue-200 text-blue-600' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
              📎 Context
            </button>
          )}
          <button onClick={toggleHints} className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${showHints ? 'bg-amber-50 border-amber-200 text-amber-600' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
            💡 Hints
          </button>
          <button onClick={() => setFullscreen(f=>!f)} className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors hidden md:block">
            {fullscreen ? '⊡ Exit' : '⊞ Full'}
          </button>
          <div className="hidden lg:flex items-center gap-2">
            <input type="range" min={60} max={100} step={5} value={zoom} onChange={e => setZoom(Number(e.target.value))} className="w-20 accent-blue-500" />
            <span className="text-xs text-gray-400 w-8">{zoom}%</span>
          </div>

          {!submitted
            ? <button onClick={() => setShowModal(true)} disabled={!canSubmit()} className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed">Submit →</button>
            : <button onClick={reset} className="btn-secondary text-xs">← Start over</button>
          }
        </div>
      </header>

      {/* Sub-bar */}
      <div className="bg-gray-50 border-b border-gray-100 px-4 py-1.5 flex items-center justify-between text-xs text-gray-400">
        <span>{submitted ? `Submitted ${submittedAt ? new Date(submittedAt).toLocaleString() : ''}` : lastSavedAt ? `Auto-saved ${new Date(lastSavedAt).toLocaleTimeString()}` : 'Not yet saved'}</span>
        <span className="hidden sm:block text-gray-300">Recommended: Problem → Segments → UVP → Solution → Channels → Revenue → Costs → Metrics → Unfair Advantage</span>
      </div>

      {/* Canvas area */}
      <div className="flex-1 overflow-auto p-4">
        {showContext && hasCtx && <ContextPanel />}
        {submitted && (
          <div className="bg-blue-50 border border-blue-100 rounded-2xl px-5 py-4 mb-4 flex items-center gap-3">
            <span className="text-xl">✅</span>
            <div>
              <div className="font-semibold text-blue-800 text-sm">Canvas submitted successfully</div>
              <div className="text-xs text-blue-500 mt-0.5">Your canvas is now locked. Your mentor will review it shortly.</div>
            </div>
          </div>
        )}

        {/* The 9-block grid */}
        <div style={{ transformOrigin:'top left', transform:`scale(${zoom/100})`, width:`${10000/zoom}%`, transition:'transform 0.15s' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1.6fr 1fr 1fr', gridTemplateRows:'1fr 1fr auto', gap:12, minHeight:580 }}>
            <div style={{ gridColumn:'1', gridRow:'1/3' }}><Block def={B('problem')} submitted={submitted} /></div>
            <div style={{ gridColumn:'2', gridRow:'1' }}><Block def={B('solution')} submitted={submitted} /></div>
            <div style={{ gridColumn:'3', gridRow:'1/3' }}><Block def={B('uvp')} submitted={submitted} /></div>
            <div style={{ gridColumn:'4', gridRow:'1' }}><Block def={B('channels')} submitted={submitted} /></div>
            <div style={{ gridColumn:'5', gridRow:'1/3' }}><Block def={B('customer_segments')} submitted={submitted} /></div>
            <div style={{ gridColumn:'2', gridRow:'2' }}><Block def={B('key_metrics')} submitted={submitted} /></div>
            <div style={{ gridColumn:'4', gridRow:'2' }}><Block def={B('unfair_advantage')} submitted={submitted} /></div>
            <div style={{ gridColumn:'1/4', gridRow:'3' }}><Block def={B('cost_structure')} submitted={submitted} /></div>
            <div style={{ gridColumn:'4/6', gridRow:'3' }}><Block def={B('revenue_streams')} submitted={submitted} /></div>
          </div>
        </div>
      </div>

      {/* Mobile block status strip */}
      <div className="md:hidden border-t border-gray-100 bg-white px-4 py-2 shrink-0">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {BLOCKS.map(b => {
            const st = getBlockStatus(b.id)
            return (
              <div key={b.id} className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs whitespace-nowrap shrink-0 ${st==='complete'?'bg-green-50 text-green-700':st==='partial'?'bg-amber-50 text-amber-700':'bg-gray-50 text-gray-400'}`}>
                <span>{st==='complete'?'✓':b.num}</span><span>{b.label}</span>
              </div>
            )
          })}
        </div>
      </div>

      {showModal && <SubmitModal onClose={() => setShowModal(false)} onConfirm={() => { submit(); setShowModal(false) }} />}
    </div>
  )
}
