import React, { useState } from 'react'
import { useStore } from '../store/useStore'

export default function Onboarding({ onStart }) {
  const { setMeta, setContext } = useStore()
  const [form, setForm] = useState({ teamName:'', projectName:'', mentorName:'' })
  const [ctx, setCtx] = useState({ problemStatement:'', hmwStatement:'', primaryStakeholder:'' })
  const [showCtx, setShowCtx] = useState(false)

  const handleStart = () => {
    if (!form.teamName.trim() || !form.projectName.trim()) return
    setMeta(form); setContext(ctx); onStart()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎯</div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Lean Canvas</h1>
          <p className="text-blue-200 text-sm">SIP Lite · Inunity</p>
          <p className="text-blue-300 text-sm mt-3 max-w-sm mx-auto leading-relaxed">
            Build a one-page business model for your innovation using the Lean Canvas framework.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="font-bold text-gray-800 text-lg mb-5">About your team</h2>

          <div className="space-y-4 mb-6">
            {[
              ['Team name', 'teamName', 'e.g. Team Innovate', true],
              ['Project / solution name', 'projectName', 'e.g. AgriConnect — farmer advisory app', true],
              ['Mentor name', 'mentorName', 'e.g. Prof. Anand Kumar', false],
            ].map(([label, key, ph, req]) => (
              <div key={key}>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  {label} {req && <span className="text-red-400">*</span>}
                </label>
                <input
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                  placeholder={ph} value={form[key]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                />
              </div>
            ))}
          </div>

          <button onClick={() => setShowCtx(o => !o)}
            className="text-xs text-blue-500 hover:text-blue-700 font-medium flex items-center gap-1 mb-4 transition-colors">
            {showCtx ? '▲' : '▼'} Add context from earlier SIP Lite tools (optional)
          </button>

          {showCtx && (
            <div className="bg-blue-50 rounded-2xl p-5 mb-6 space-y-3 border border-blue-100">
              <p className="text-xs text-blue-600 leading-relaxed">Paste outputs from earlier tools — they appear as reference hints on the canvas.</p>
              {[
                ['Problem statement', 'problemStatement', 'Your team\'s defined problem statement…', 2],
                ['HMW statement', 'hmwStatement', 'How Might We…', 2],
                ['Primary stakeholder', 'primaryStakeholder', 'e.g. Smallholder farmers in Kolar district', 1],
              ].map(([label, key, ph, rows]) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{label}</label>
                  {rows > 1
                    ? <textarea className="w-full border border-blue-200 rounded-xl px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white" rows={rows} placeholder={ph} value={ctx[key]} onChange={e => setCtx(c => ({ ...c, [key]: e.target.value }))} />
                    : <input className="w-full border border-blue-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white" placeholder={ph} value={ctx[key]} onChange={e => setCtx(c => ({ ...c, [key]: e.target.value }))} />
                  }
                </div>
              ))}
            </div>
          )}

          <button onClick={handleStart} disabled={!form.teamName.trim() || !form.projectName.trim()}
            className="w-full btn-primary py-3.5 text-base disabled:opacity-40 disabled:cursor-not-allowed">
            Open Canvas →
          </button>
          <p className="text-xs text-gray-400 text-center mt-4">Session only · No data saved to server</p>
        </div>
      </div>
    </div>
  )
}
