import { PrismaClient } from '../src/generated/client/index.js'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding enriched catalogue data...')

  // 1. Create Types
  const smartphone = await prisma.deviceType.upsert({
    where: { name: 'Smartphone' },
    update: {},
    create: { name: 'Smartphone' },
  })

  // 2. Create Brands
  const apple = await prisma.deviceBrand.upsert({
    where: { name: 'Apple' },
    update: {},
    create: { name: 'Apple' },
  })

  // 3. Create Models
  const iphone13 = await prisma.deviceModel.upsert({
    where: { name_brandId: { name: 'iPhone 13', brandId: apple.id } },
    update: { modelReference: 'A2633' },
    create: {
      name: 'iPhone 13',
      modelReference: 'A2633',
      brandId: apple.id,
      typeId: smartphone.id,
    },
  })

  // 4. Create Parts
  await prisma.part.upsert({
    where: { sku: 'SCREEN-I13-ORIG' },
    update: { 
      minStock: 2, 
      supplier: 'MobileParts Europe', 
      location: 'A1-04' 
    },
    create: {
      name: 'Écran iPhone 13 Original',
      sku: 'SCREEN-I13-ORIG',
      costPrice: 85.0,
      stock: 12,
      minStock: 2,
      supplier: 'MobileParts Europe',
      location: 'A1-04',
      modelId: iphone13.id,
    },
  })

  // 5. Create Services
  // For services, we create new ones to ensure suggestedPrice and duration are set
  await prisma.service.create({
    data: {
      name: 'Remplacement Écran iPhone 13 (Premium)',
      laborCost: 45.0,
      suggestedPrice: 189.0,
      duration: 45,
      modelId: iphone13.id,
      description: 'Changement bloc écran complet original Apple. Garantie 1 an.',
    },
  })

  console.log('Enriched seed completed successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
