import { PrismaClient, UserRole } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Starting database seeding...')

    // Create Super Admin
    const superAdminPassword = await bcrypt.hash('Admin@123', 10)
    const superAdmin = await prisma.user.upsert({
        where: { email: 'admin@abs.com' },
        update: {},
        create: {
            userId: 'USR-SUPERADMIN-001',
            email: 'admin@abs.com',
            passwordHash: superAdminPassword,
            role: UserRole.SUPER_ADMIN,
            isActive: true,
            profile: {
                create: {
                    fullName: 'Super Administrator',
                    bio: 'System administrator with full access',
                    status: 'active'
                }
            }
        }
    })
    console.log('✅ Created Super Admin:', superAdmin.email)

    // Create Admin
    const adminPassword = await bcrypt.hash('Admin@123', 10)
    const admin = await prisma.user.upsert({
        where: { email: 'manager@abs.com' },
        update: {},
        create: {
            userId: 'USR-ADMIN-001',
            email: 'manager@abs.com',
            passwordHash: adminPassword,
            role: UserRole.ADMIN,
            isActive: true,
            profile: {
                create: {
                    fullName: 'Admin Manager',
                    bio: 'Administrative manager',
                    status: 'active'
                }
            }
        }
    })
    console.log('✅ Created Admin:', admin.email)

    // Create Teacher
    const teacherPassword = await bcrypt.hash('Teacher@123', 10)
    const teacher = await prisma.user.upsert({
        where: { email: 'teacher@abs.com' },
        update: {},
        create: {
            userId: 'USR-TEACHER-001',
            email: 'teacher@abs.com',
            passwordHash: teacherPassword,
            role: UserRole.TEACHER,
            isActive: true,
            profile: {
                create: {
                    fullName: 'John Teacher',
                    bio: 'Experienced educator',
                    status: 'active'
                }
            }
        }
    })
    console.log('✅ Created Teacher:', teacher.email)

    // Create Student
    const studentPassword = await bcrypt.hash('Student@123', 10)
    const student = await prisma.user.upsert({
        where: { email: 'student@abs.com' },
        update: {},
        create: {
            userId: 'USR-STUDENT-001',
            email: 'student@abs.com',
            passwordHash: studentPassword,
            role: UserRole.STUDENT,
            isActive: true,
            profile: {
                create: {
                    fullName: 'Jane Student',
                    bio: 'Eager learner',
                    status: 'active'
                }
            }
        }
    })
    console.log('✅ Created Student:', student.email)

    // Create Categories
    const categories = [
        { name: 'Technology', slug: 'technology', description: 'Technology and IT courses' },
        { name: 'Business', slug: 'business', description: 'Business and management' },
        { name: 'Science', slug: 'science', description: 'Science and research' },
        { name: 'Arts', slug: 'arts', description: 'Arts and humanities' },
        { name: 'Engineering', slug: 'engineering', description: 'Engineering disciplines' }
    ]

    for (const category of categories) {
        await prisma.category.upsert({
            where: { slug: category.slug },
            update: {},
            create: category
        })
    }
    console.log('✅ Created categories')

    // Create SDGs (Sustainable Development Goals)
    const sdgs = [
        { number: 1, title: 'No Poverty', description: 'End poverty in all its forms everywhere' },
        { number: 2, title: 'Zero Hunger', description: 'End hunger, achieve food security' },
        { number: 3, title: 'Good Health and Well-being', description: 'Ensure healthy lives' },
        { number: 4, title: 'Quality Education', description: 'Ensure inclusive and equitable quality education' },
        { number: 5, title: 'Gender Equality', description: 'Achieve gender equality' }
    ]

    for (const sdg of sdgs) {
        await prisma.sDG.upsert({
            where: { number: sdg.number },
            update: {},
            create: sdg
        })
    }
    console.log('✅ Created SDGs')

    console.log('🎉 Database seeding completed!')
    console.log('\n📝 Test Credentials:')
    console.log('Super Admin: admin@abs.com / Admin@123')
    console.log('Admin: manager@abs.com / Admin@123')
    console.log('Teacher: teacher@abs.com / Teacher@123')
    console.log('Student: student@abs.com / Student@123')
}

main()
    .catch((e) => {
        console.error('❌ Seeding error:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
