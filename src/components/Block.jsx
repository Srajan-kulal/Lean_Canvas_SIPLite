import React, { useRef, useEffect } from 'react'
import { useStore } from '../store/useStore'

function CharCounter({ count, max }) {
  const pct = count / max
  const color = pct >= 1 ? 'text-red-500' : pct >= 0.9 ? 'text-amber-500' : 'text-gray-300'
  return <div className={`text-xs text-right mt-1 ${color}`}>{count} / {max}</div>
}

function Dot({ status }) {
  if (status === 'complete') return <span className="dot-complete" title="Complete" />
  if (status === 'partial')  return <span className="dot-partial" title="In progress" />
  return <span className="dot-empty" title="Not started" />
}

export default function Block({ def, submitted }) {
  const { blocks, updateBlock, activeBlock, setActiveBlock, showHints, getBlockStatus } = useStore()
  const data = blocks[def.id] || { content:'', subContent:'' }
  const status = getBlockStatus(def.id)
  const isActive = activeBlock === def.id
  const taRef = useRef(null)

  useEffect(() => {
    if (taRef.current) { taRef.current.style.height='auto'; taRef.current.style.height=taRef.current.scrollHeight+'px' }
  }, [data.content])

  return (
    <div
      className="block-card"
      style={{ background: def.color, borderColor: isActive ? '#93c5fd' : 'transparent', minHeight: 120 }}
      onClick={() => !submitted && setActiveBlock(def.id)}
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="block-label" style={{ color: def.lc }}>
          <span className="w-5 h-5 rounded-full text-white flex items-center justify-center text-xs font-bold shrink-0" style={{ background: def.lc }}>{def.num}</span>
          {def.label}
          {!def.required && <span className="text-gray-400 font-normal normal-case tracking-normal text-xs">(optional)</span>}
        </div>
        <Dot status={status} />
      </div>

      {showHints && isActive && (
        <div className="text-xs text-gray-500 bg-white/70 rounded-lg px-2.5 py-2 mb-2 leading-relaxed border border-white/80">
          💡 {def.hint}
        </div>
      )}

      <textarea ref={taRef} className="block-textarea" placeholder={submitted ? '—' : def.placeholder}
        value={data.content} disabled={submitted} maxLength={def.maxChars} rows={3}
        onChange={e => { updateBlock(def.id, 'content', e.target.value); e.target.style.height='auto'; e.target.style.height=e.target.scrollHeight+'px' }}
        onFocus={() => setActiveBlock(def.id)}
      />
      {isActive && !submitted && <CharCounter count={data.content.length} max={def.maxChars} />}

      {def.subField && (
        <div className="mt-2 pt-2 border-t border-black/5">
          <div className="sub-label">{def.subField.label}</div>
          <textarea className="sub-textarea" placeholder={submitted ? '—' : def.subField.placeholder}
            value={data.subContent} disabled={submitted} maxLength={def.subField.maxChars} rows={2}
            onChange={e => updateBlock(def.id, 'subContent', e.target.value)}
          />
          {isActive && !submitted && <CharCounter count={data.subContent.length} max={def.subField.maxChars} />}
        </div>
      )}
    </div>
  )
}
