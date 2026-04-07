import { Prisma } from '@prisma/client'
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
  const parsed =
    typeof value === 'number'
      ? value
      : typeof value === 'string'
        ? Number.parseFloat(value)
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
  const parsed =
    typeof value === 'number'
      ? value
      : typeof value === 'string'
        ? Number.parseInt(value, 10)
        : Number.NaN

  if (!Number.isInteger(parsed)) {
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
  console.error(error)

  if (error instanceof ApiError) {
    return NextResponse.json({ error: error.message }, { status: error.status })
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Une valeur unique existe déjà dans la base.' },
        { status: 409 }
      )
    }

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'L’élément demandé est introuvable.' },
        { status: 404 }
      )
    }
  }

  return NextResponse.json({ error: fallbackMessage }, { status: 500 })
}
