'use client'

import { useState, useRef, useEffect } from 'react'

interface PatternLockProps {
  onPatternComplete: (pattern: string) => void
  width?: number
  height?: number
}

export function PatternLock({ onPatternComplete, width = 300, height = 300 }: PatternLockProps) {
  const [nodes, setNodes] = useState<number[]>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentMousePos, setCurrentMousePos] = useState<{ x: number, y: number } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Fixed positions for 3x3 grid
  const stepX = width / 4
  const stepY = height / 4
  const points = [
    { x: stepX, y: stepY, id: 7 },
    { x: stepX * 2, y: stepY, id: 8 },
    { x: stepX * 3, y: stepY, id: 9 },
    { x: stepX, y: stepY * 2, id: 4 },
    { x: stepX * 2, y: stepY * 2, id: 5 },
    { x: stepX * 3, y: stepY * 2, id: 6 },
    { x: stepX, y: stepY * 3, id: 1 },
    { x: stepX * 2, y: stepY * 3, id: 2 },
    { x: stepX * 3, y: stepY * 3, id: 3 },
  ]

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    setIsDrawing(true)
    setNodes([])
    handleMove(e)
  }

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return
    
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

    const x = clientX - rect.left
    const y = clientY - rect.top
    setCurrentMousePos({ x, y })

    // Check if we hit a node
    points.forEach(p => {
      const dist = Math.sqrt(Math.pow(p.x - x, 2) + Math.pow(p.y - y, 2))
      if (dist < 25 && !nodes.includes(p.id)) {
        setNodes(prev => [...prev, p.id])
      }
    })
  }

  const handleEnd = () => {
    if (nodes.length > 1) {
      onPatternComplete(nodes.join('-'))
    }
    setIsDrawing(false)
    setCurrentMousePos(null)
  }

  const clearPattern = () => {
    setNodes([])
    onPatternComplete('')
  }

  return (
    <div className="flex flex-col items-center">
      <div 
        ref={containerRef}
        className="relative bg-slate-900 rounded-[2rem] touch-none cursor-crosshair shadow-inner border border-slate-800"
        style={{ width, height }}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      >
        <svg className="absolute inset-0 pointer-events-none w-full h-full">
          {/* Lines between nodes */}
          {nodes.length > 1 && nodes.map((nodeId, i) => {
            if (i === 0) return null
            const p1 = points.find(p => p.id === nodes[i - 1])
            const p2 = points.find(p => p.id === nodeId)
            if (!p1 || !p2) return null
            return (
              <line 
                key={`line-${i}`}
                x1={p1.x} y1={p1.y}
                x2={p2.x} y2={p2.y}
                stroke="#3b82f6"
                strokeWidth="6"
                strokeLinecap="round"
                opacity="0.8"
              />
            )
          })}
          
          {/* Current drawing line */}
          {isDrawing && nodes.length > 0 && currentMousePos && (
            <line 
              x1={points.find(p => p.id === nodes[nodes.length - 1])?.x}
              y1={points.find(p => p.id === nodes[nodes.length - 1])?.y}
              x2={currentMousePos.x}
              y2={currentMousePos.y}
              stroke="#3b82f6"
              strokeWidth="4"
              strokeDasharray="8 4"
              opacity="0.5"
            />
          )}

          {/* Nodes */}
          {points.map(p => (
            <g key={p.id}>
              <circle 
                cx={p.x} cy={p.y}
                r={nodes.includes(p.id) ? 12 : 8}
                fill={nodes.includes(p.id) ? "#3b82f6" : "#475569"}
                className="transition-all duration-200"
              />
              <text
                x={p.x}
                y={p.y + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                className="pointer-events-none select-none text-[8px] font-black fill-white/20"
              >
                {p.id}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <button 
        type="button"
        onClick={clearPattern}
        className="mt-4 text-xs font-bold text-slate-400 hover:text-rose-500 transition"
      >
        Effacer le schéma
      </button>
    </div>
  )
}
