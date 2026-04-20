'use client'

import { useState, useCallback } from 'react'
import { ConfirmDialogType } from '../components/confirm-dialog'

interface ConfirmOptions {
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  type?: ConfirmDialogType
  onConfirm: () => void
}

export function useConfirm() {
  const [isOpen, setIsOpen] = useState(false)
  const [options, setOptions] = useState<ConfirmOptions | null>(null)

  const confirm = useCallback((newOptions: ConfirmOptions) => {
    setOptions(newOptions)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  return {
    isOpen,
    options,
    confirm,
    close
  }
}
