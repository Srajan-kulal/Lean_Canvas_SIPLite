import { create } from 'zustand'

export const BLOCKS = [
  { id:'problem',          num:1, label:'Problem',                 color:'#fef9c3', lc:'#854d0e',
    hint:'What are the top 1–3 problems your target customers face? What are they currently using?',
    placeholder:'List the top 1–3 real, specific problems your customers face…',
    maxChars:600, required:true, order:1,
    subField:{ id:'existing_alternatives', label:'Existing Alternatives', placeholder:'What are customers currently using to solve these problems?', maxChars:600 } },
  { id:'customer_segments',num:2, label:'Customer Segments',       color:'#fff7ed', lc:'#9a3412',
    hint:'Who are your target customers? Who are the early adopters — the people who need this most urgently?',
    placeholder:'Define your target customer segments specifically…',
    maxChars:500, required:true, order:2,
    subField:{ id:'early_adopters', label:'Early Adopters', placeholder:'Who will seek out your solution before it is perfect?', maxChars:500 } },
  { id:'uvp',              num:3, label:'Unique Value Proposition', color:'#eff6ff', lc:'#1e40af',
    hint:'What is the single most important thing you do for your customer? Why choose you?',
    placeholder:'Write one clear, compelling headline that explains your difference…',
    maxChars:200, required:true, order:3,
    subField:{ id:'high_level_concept', label:'High-Level Concept', placeholder:'"The X for Y" — capture your concept in one line', maxChars:150 } },
  { id:'solution',         num:4, label:'Solution',                color:'#f0fdf4', lc:'#166534',
    hint:'What are the top features of your solution? Each should address one of your listed problems.',
    placeholder:'List the top 3 features or capabilities of your solution…',
    maxChars:600, required:true, order:4, subField:null },
  { id:'channels',         num:5, label:'Channels',                color:'#fdf4ff', lc:'#7e22ce',
    hint:'How will customers find out about your solution? What is the path from awareness to adoption?',
    placeholder:'How do you reach your customers? (e.g. social media, partnerships, word of mouth…)',
    maxChars:500, required:true, order:5, subField:null },
  { id:'revenue_streams',  num:6, label:'Revenue Streams',         color:'#f0fdf4', lc:'#166534',
    hint:'Who pays for your solution? How do they pay? If free to users, who funds it?',
    placeholder:'Describe how your solution generates revenue or sustains itself…',
    maxChars:600, required:true, order:6, subField:null },
  { id:'cost_structure',   num:7, label:'Cost Structure',          color:'#fef2f2', lc:'#991b1b',
    hint:'What are the main costs of building and running your solution? Fixed vs variable?',
    placeholder:'List the main cost items (tag as Fixed or Variable if possible)…',
    maxChars:600, required:true, order:7, subField:null },
  { id:'key_metrics',      num:8, label:'Key Metrics',             color:'#f0fdf4', lc:'#166534',
    hint:'How will you know if your solution is working? What would you measure weekly or monthly?',
    placeholder:'List 2–3 metrics you would track (include a target if possible)…',
    maxChars:600, required:true, order:8, subField:null },
  { id:'unfair_advantage', num:9, label:'Unfair Advantage',        color:'#fdf4ff', lc:'#7e22ce',
    hint:"What do you have that cannot easily be copied? (Okay to leave blank if you don't have one yet.)",
    placeholder:"Your unfair advantage… (Optional — be honest if you don't have one yet)",
    maxChars:500, required:false, order:9, subField:null },
]

const emptyBlocks = () => Object.fromEntries(BLOCKS.map(b => [b.id, { content:'', subContent:'' }]))

export const useStore = create((set, get) => ({
  teamName:'', projectName:'', mentorName:'',
  status:'draft', submittedAt:null, lastSavedAt:null,
  setMeta:(meta) => set(meta),

  context:{ problemStatement:'', hmwStatement:'', primaryStakeholder:'' },
  setContext:(ctx) => set(s => ({ context:{ ...s.context, ...ctx } })),

  blocks: emptyBlocks(),
  updateBlock:(blockId, field, value) => set(s => ({
    blocks:{ ...s.blocks, [blockId]:{ ...s.blocks[blockId], [field]:value } },
    lastSavedAt: new Date().toISOString(),
  })),

  getBlockStatus:(blockId) => {
    const block = get().blocks[blockId]
    if (!block?.content?.trim()) return 'empty'
    if (block.content.trim().length >= 10) return 'complete'
    return 'partial'
  },
  getCompletionCount:() => {
    const blocks = get().blocks
    return BLOCKS.filter(b => b.required && blocks[b.id]?.content?.trim().length >= 10).length
  },
  canSubmit:() => {
    const blocks = get().blocks
    return BLOCKS.filter(b => b.required).every(b => blocks[b.id]?.content?.trim().length >= 10)
  },

  submit:() => set({ status:'submitted', submittedAt: new Date().toISOString() }),
  reset:() => set({ teamName:'', projectName:'', mentorName:'', status:'draft',
    submittedAt:null, lastSavedAt:null, blocks:emptyBlocks(),
    context:{ problemStatement:'', hmwStatement:'', primaryStakeholder:'' } }),

  activeBlock:null, showContext:true, showHints:true, zoom:85,
  setActiveBlock:(id) => set({ activeBlock:id }),
  toggleContext:() => set(s => ({ showContext:!s.showContext })),
  toggleHints:() => set(s => ({ showHints:!s.showHints })),
  setZoom:(zoom) => set({ zoom }),
}))
