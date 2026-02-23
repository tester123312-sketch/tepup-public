/**
 * Script dọn dẹp tài khoản email-based + tạo admin
 * Chạy: cd tepup && npx tsx scripts/cleanup-and-setup-admin.ts
 *
 * Chạy trên từng DB bằng cách đổi DATABASE_URL trong .env
 */

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const ADMIN_USERNAME = 'admin@tepup.space';
const ADMIN_PASSWORD = 'admin123312';

async function main() {
  console.log('=== Tepup: Cleanup & Setup Admin ===');
  console.log(`DB: ${connectionString.substring(0, 50)}...\n`);

  // Step 1: Find email-based accounts (have email, no username)
  console.log('--- Step 1: Tìm tài khoản email-based ---');
  const emailUsers = await prisma.user.findMany({
    where: {
      email: { not: null },
      username: null,
    },
    select: { id: true, email: true, name: true, role: true },
  });

  console.log(`Tìm thấy ${emailUsers.length} tài khoản email-based:`);
  for (const u of emailUsers) {
    console.log(`  - ${u.email} (role: ${u.role}, name: ${u.name})`);
  }

  if (emailUsers.length > 0) {
    const deleteResult = await prisma.user.deleteMany({
      where: {
        email: { not: null },
        username: null,
      },
    });
    console.log(`Đã xóa ${deleteResult.count} tài khoản.\n`);
  } else {
    console.log('Không có tài khoản email-based cần xóa.\n');
  }

  // Step 2: Create/update admin account
  console.log('--- Step 2: Tạo/cập nhật tài khoản admin ---');
  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);

  const existingAdmin = await prisma.user.findUnique({
    where: { username: ADMIN_USERNAME },
  });

  if (existingAdmin) {
    await prisma.user.update({
      where: { username: ADMIN_USERNAME },
      data: {
        password: hashedPassword,
        role: 'ADMIN',
        name: 'Admin',
      },
    });
    console.log(`Admin "${ADMIN_USERNAME}" đã tồn tại — cập nhật password + role.\n`);
  } else {
    await prisma.user.create({
      data: {
        username: ADMIN_USERNAME,
        name: 'Admin',
        password: hashedPassword,
        role: 'ADMIN',
      },
    });
    console.log(`Tạo admin: ${ADMIN_USERNAME}\n`);
  }

  // Step 3: Verify
  console.log('--- Step 3: Xác nhận ---');
  const allUsers = await prisma.user.findMany({
    select: { id: true, username: true, email: true, role: true },
    orderBy: { createdAt: 'asc' },
  });
  console.log(`Tổng users: ${allUsers.length}`);
  for (const u of allUsers) {
    console.log(`  - username: ${u.username || '(none)'}, email: ${u.email || '(none)'}, role: ${u.role}`);
  }

  console.log('\n=== Done ===');
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
