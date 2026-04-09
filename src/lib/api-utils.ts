import { Prisma } from '../generated/client'
import { NextResponse } from 'next/server'

export class ApiError extends Error {
  status: number

  constructor(message: string, status = 400) {
    super(message)
    this.status = status
  }
}

type StringOptions = {
  minLength?: number
  maxLength?: number
}

export function requireString(
  value: unknown,
  fieldLabel: string,
  options: StringOptions = {}
) {
  if (typeof value !== 'string') {
    throw new ApiError(`${fieldLabel} est requis.`)
  }

  const trimmed = value.trim()
  const minLength = options.minLength ?? 1
  const maxLength = options.maxLength ?? 255

  if (trimmed.length < minLength) {
    throw new ApiError(`${fieldLabel} est requis.`)
  }

  if (trimmed.length > maxLength) {
    throw new ApiError(
      `${fieldLabel} ne doit pas dépasser ${maxLength} caractères.`
    )
  }

  return trimmed
}

export function optionalString(value: unknown, maxLength = 2000) {
  if (value === undefined || value === null || value === '') {
    return null
  }

  if (typeof value !== 'string') {
    throw new ApiError('Le format du champ texte est invalide.')
  }

  const trimmed = value.trim()

  if (!trimmed) {
    return null
  }

  if (trimmed.length > maxLength) {
    throw new ApiError(`Le texte ne doit pas dépasser ${maxLength} caractères.`)
  }

  return trimmed
}

export function requireNumber(
  value: unknown,
  fieldLabel: string,
  options: { min?: number; max?: number } = {}
) {
  if (value === null || value === undefined || value === '') {
    throw new ApiError(`${fieldLabel} est requis.`)
  }

  const parsed =
    typeof value === 'number'
      ? value
      : typeof value === 'string'
        ? Number.parseFloat(value.replace(',', '.'))
        : Number.NaN

  if (!Number.isFinite(parsed)) {
    throw new ApiError(`${fieldLabel} doit être un nombre valide.`)
  }

  if (options.min !== undefined && parsed < options.min) {
    throw new ApiError(`${fieldLabel} doit être supérieur ou égal à ${options.min}.`)
  }

  if (options.max !== undefined && parsed > options.max) {
    throw new ApiError(`${fieldLabel} doit être inférieur ou égal à ${options.max}.`)
  }

  return parsed
}

export function requireInteger(
  value: unknown,
  fieldLabel: string,
  options: { min?: number; max?: number } = {}
) {
  if (value === null || value === undefined || value === '') {
    return 0
  }

  const parsed =
    typeof value === 'number'
      ? value
      : typeof value === 'string'
        ? Number.parseInt(value, 10)
        : Number.NaN

  if (Number.isNaN(parsed) || !Number.isSafeInteger(parsed)) {
    throw new ApiError(`${fieldLabel} doit être un nombre entier.`)
  }

  if (options.min !== undefined && parsed < options.min) {
    throw new ApiError(`${fieldLabel} doit être supérieur ou égal à ${options.min}.`)
  }

  if (options.max !== undefined && parsed > options.max) {
    throw new ApiError(`${fieldLabel} doit être inférieur ou égal à ${options.max}.`)
  }

  return parsed
}

export function requireId(value: unknown, fieldLabel: string) {
  return requireString(value, fieldLabel, { maxLength: 100 })
}

export function handleApiError(
  error: unknown,
  fallbackMessage = 'Une erreur est survenue.'
) {
  try {
    console.error('[API ERROR]', error)

    if (error instanceof ApiError) {
      return NextResponse.json({ error: error.message }, { status: error.status })
    }

    if (error && typeof error === 'object' && 'code' in error) {
      const prismaError = error as any
      if (prismaError.code === 'P2002') {
        const target = (prismaError.meta?.target as string[]) || []
        return NextResponse.json(
          { error: `Cette valeur existe déjà (${target.join(', ')}).` },
          { status: 409 }
        )
      }
      if (prismaError.code === 'P2025') {
        return NextResponse.json({ error: 'Élément introuvable.' }, { status: 404 })
      }
    }

    const message = error instanceof Error ? error.message : fallbackMessage
    return NextResponse.json({ error: message }, { status: 500 })
  } catch (criticalError) {
    return NextResponse.json({ error: fallbackMessage }, { status: 500 })
  }
}
