import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { handleApiError } from '@/lib/api-utils'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const year = parseInt(searchParams.get('year') || new Date().getFullYear().toString())
    const monthParam = searchParams.get('month')
    const month = monthParam && monthParam !== 'all' ? parseInt(monthParam) : null
    
    // 1. Basic Counts & Filters
    // Fetch repairs for the selected period
    const allRepairs = await prisma.repair.findMany({
      where: {
        createdAt: {
          gte: new Date(year, month !== null ? month : 0, 1),
          lt: new Date(year, month !== null ? month + 1 : 12, 1),
        }
      },
      include: {
        services: {
          include: {
            service: {
              include: {
                part: true
              }
            }
          }
        }
      }
    })

    const clientCount = await prisma.client.count() // Total base is usually displayed

    // 2. Revenue & Margin
    let totalRevenue = 0
    let totalCost = 0

    allRepairs.forEach(repair => {
      repair.services.forEach(rs => {
        totalRevenue += rs.priceAtTime * rs.quantity
        if (rs.service.part) {
          totalCost += rs.service.part.costPrice * rs.quantity
        }
      })
    })

    const totalMargin = totalRevenue - totalCost
    const marginPercent = totalRevenue > 0 ? (totalMargin / totalRevenue) * 100 : 0

    // 3. Activity Chart (Daily if month selected, Monthly if year selected)
    let activityStats: any[] = []
    
    if (month !== null) {
      // Daily stats for the selected month
      const daysInMonth = new Date(year, month + 1, 0).getDate()
      activityStats = Array.from({ length: daysInMonth }, (_, i) => ({
        label: (i + 1).toString(),
        revenue: 0,
        count: 0
      }))

      allRepairs.forEach(repair => {
        const date = new Date(repair.createdAt)
        const day = date.getDate() - 1
        if (day >= 0 && day < daysInMonth) {
          activityStats[day].count++
          repair.services.forEach(rs => {
            activityStats[day].revenue += rs.priceAtTime * rs.quantity
          })
        }
      })
    } else {
      // Monthly stats for the selected year
      activityStats = Array.from({ length: 12 }, (_, i) => ({
        label: i.toString(), // Month index for client-side labels
        revenue: 0,
        count: 0
      }))

      allRepairs.forEach(repair => {
        const date = new Date(repair.createdAt)
        const m = date.getMonth()
        activityStats[m].count++
        repair.services.forEach(rs => {
          activityStats[m].revenue += rs.priceAtTime * rs.quantity
        })
      })
    }

    // 4. Status Distribution
    const statusCounts: Record<string, number> = {}
    allRepairs.forEach(r => {
      statusCounts[r.status] = (statusCounts[r.status] || 0) + 1
    })

    // 5. Device Type Distribution
    const typeDistribution: Record<string, number> = {}
    allRepairs.forEach(repair => {
      repair.services.forEach(rs => {
        const typeName = rs.service.model?.type.name || 'Inconnu'
        typeDistribution[typeName] = (typeDistribution[typeName] || 0) + 1
      })
    })

    // 6. Top Services & Clients for the period
    const serviceMap: Record<string, { name: string; count: number }> = {}
    const clientMap: Record<string, { name: string; count: number }> = {}

    allRepairs.forEach(repair => {
      // Clients
      const cid = repair.clientId
      if (!clientMap[cid]) {
        clientMap[cid] = { name: (repair as any).client?.name || 'Inconnu', count: 0 }
      }
      clientMap[cid].count++

      // Services
      repair.services.forEach(rs => {
        const sid = rs.serviceId
        if (!serviceMap[sid]) {
          serviceMap[sid] = { name: rs.service.name, count: 0 }
        }
        serviceMap[sid].count += rs.quantity
      })
    })

    const topServices = Object.values(serviceMap)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    const topClients = Object.values(clientMap)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    return NextResponse.json({
      summary: {
        totalRepairs: allRepairs.length,
        totalInvoices: allRepairs.filter(r => r.status === 'DELIVERED').length,
        totalClients: clientCount,
        totalRevenue,
        totalCost,
        totalMargin,
        marginPercent
      },
      activityStats,
      isMonthlyView: month !== null,
      statusDistribution: Object.entries(statusCounts).map(([status, count]) => ({ status, count })),
      typeDistribution: Object.entries(typeDistribution).map(([name, count]) => ({ name, count })),
      topServices,
      topClients
    })
  } catch (error) {
    return handleApiError(error, 'Impossible de récupérer les statistiques.')
  }
}
