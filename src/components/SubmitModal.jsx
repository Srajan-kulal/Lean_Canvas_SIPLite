import React from 'react'
import { useStore, BLOCKS } from '../store/useStore'

export default function SubmitModal({ onClose, onConfirm }) {
  const { blocks } = useStore()
  const unfairEmpty = !blocks.unfair_advantage?.content?.trim()
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">📋</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Submit your Lean Canvas?</h2>
          <p className="text-sm text-gray-500 leading-relaxed">The canvas will be locked and sent to your mentor for review.</p>
        </div>
        <div className="bg-gray-50 rounded-2xl p-4 mb-5">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Block completion</div>
          <div className="grid grid-cols-3 gap-2">
            {BLOCKS.map(b => {
              const filled = blocks[b.id]?.content?.trim().length >= 10
              return (
                <div key={b.id} className={`flex items-center gap-1.5 text-xs px-2 py-1.5 rounded-lg ${filled ? 'bg-green-50 text-green-700' : b.required ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-400'}`}>
                  <span>{filled ? '✓' : b.required ? '!' : '–'}</span>
                  <span className="truncate">{b.label}</span>
                </div>
              )
            })}
          </div>
        </div>
        {unfairEmpty && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5 text-sm text-amber-800">
            <span className="font-semibold">Note:</span> Unfair Advantage block is empty — that's okay if you genuinely don't have one yet.
          </div>
        )}
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 btn-secondary">Go back</button>
          <button onClick={onConfirm} className="flex-1 btn-primary">Submit canvas</button>
        </div>
      </div>
    </div>
  )
}
