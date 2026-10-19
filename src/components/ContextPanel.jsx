import React from 'react'
import { useStore } from '../store/useStore'

export default function ContextPanel() {
  const { context, toggleContext } = useStore()
  const hasAny = context.problemStatement || context.hmwStatement || context.primaryStakeholder
  if (!hasAny) return null
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-4 text-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">📎 Context from earlier tools</span>
        <button onClick={toggleContext} className="text-xs text-blue-400 hover:text-blue-600">Hide</button>
      </div>
      <div className="space-y-3">
        {context.problemStatement && (
          <div>
            <div className="text-xs font-semibold text-blue-500 mb-0.5">Problem Statement</div>
            <div className="text-xs text-gray-600 leading-relaxed bg-white rounded-lg px-3 py-2 border border-blue-100">{context.problemStatement}</div>
          </div>
        )}
        {context.hmwStatement && (
          <div>
            <div className="text-xs font-semibold text-blue-500 mb-0.5">HMW Statement</div>
            <div className="text-xs text-gray-600 leading-relaxed bg-white rounded-lg px-3 py-2 border border-blue-100">{context.hmwStatement}</div>
          </div>
        )}
        {context.primaryStakeholder && (
          <div>
            <div className="text-xs font-semibold text-blue-500 mb-0.5">Primary Stakeholder</div>
            <div className="text-xs text-gray-600 leading-relaxed bg-white rounded-lg px-3 py-2 border border-blue-100">{context.primaryStakeholder}</div>
          </div>
        )}
      </div>
    </div>
  )
}
