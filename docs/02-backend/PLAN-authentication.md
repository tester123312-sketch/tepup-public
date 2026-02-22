# Backend Authentication cho Tepup

> Plan file - Task 01: Authentication System

---

## Tổng quan

Xây dựng hệ thống authentication với NextAuth.js, Supabase PostgreSQL và Prisma ORM. Hỗ trợ đăng nhập Email/Password và Google OAuth.

---

## Todos

| # | Task | Trạng thái |
|---|------|------------|
| 1 | Hướng dẫn tạo Supabase project và lấy connection string | ✅ Hoàn thành |
| 2 | Cài đặt NextAuth, Prisma, bcryptjs và các dependencies | ✅ Hoàn thành |
| 3 | Tạo Prisma schema với User, Account, Session, UserProgress models | ✅ Hoàn thành |
| 4 | Cấu hình NextAuth với Credentials + Google provider | ✅ Hoàn thành |
| 5 | Tạo trang Login và Register | ✅ Hoàn thành |
| 6 | Tạo API endpoints cho lesson progress tracking | ✅ Hoàn thành |
| 7 | Update Header với user menu và các components để check tiến độ | ✅ Hoàn thành |

### Ghi chú triển khai (2026-01-26)

**✅ Hoàn thành tất cả:**
- Tất cả code authentication đã được triển khai
- Database Supabase đã được kết nối và sync schema
- User đầu tiên đã được tạo và test thành công
- Frontend prototype vẫn hoạt động bình thường không cần đăng nhập
- Login/Register pages đã có UI hoàn chỉnh

**Test account:**
- Email: `test@tepup.com`
- Password: `password123`

---

## Tech Stack được chọn

- **Auth**: NextAuth.js (Auth.js) v5 - miễn phí, open source
- **Database**: Supabase PostgreSQL - free tier (500MB, 50k users/tháng)
- **ORM**: Prisma - type-safe database queries
- **Hosting**: Vercel - free tier đủ dùng cho scale nhỏ

---

## Kiến trúc tổng quan

```mermaid
flowchart LR
    subgraph frontend [Frontend - Next.js]
        UI[React Components]
        API[API Routes]
    end
    
    subgraph auth [Authentication]
        NextAuth[NextAuth.js]
        Google[Google OAuth]
        Credentials[Email/Password]
    end
    
    subgraph db [Database]
        Supabase[(Supabase PostgreSQL)]
        Prisma[Prisma ORM]
    end
    
    UI --> NextAuth
    NextAuth --> Google
    NextAuth --> Credentials
    NextAuth --> Prisma
    Prisma --> Supabase
    API --> Prisma
```

---

## Database Schema

```mermaid
erDiagram
    User ||--o{ Account : has
    User ||--o{ Session : has
    User ||--o{ UserProgress : tracks
    
    User {
        string id PK
        string email UK
        string name
        string password
        string image
        datetime createdAt
    }
    
    Account {
        string provider
        string providerAccountId
        string userId FK
    }
    
    UserProgress {
        string id PK
        string lessonId
        string userId FK
        boolean completed
        int score
        datetime completedAt
    }
```

---

## Các bước triển khai

### 1. Setup Supabase (Free Tier)

- Tạo project tại [supabase.com](https://supabase.com)
- Lấy connection string cho Prisma

### 2. Cài đặt dependencies

```bash
npm install next-auth@beta @auth/prisma-adapter prisma @prisma/client bcryptjs
npm install -D @types/bcryptjs
```

### 3. Setup Prisma Schema

Tạo file `tepup/prisma/schema.prisma` với các models:

- User, Account, Session (cho NextAuth)
- UserProgress (cho tracking lesson progress)

### 4. Cấu hình NextAuth.js

Tạo file `tepup/app/api/auth/[...nextauth]/route.ts`:

- Credentials provider (email/password)
- Google provider
- Prisma adapter kết nối Supabase

### 5. Tạo API Endpoints cho User Progress

- `POST /api/progress` - Đánh dấu lesson/chapter hoàn thành
- `GET /api/progress` - Lấy tiến độ của user

### 6. Update Frontend Components

- Thêm nút Login/Logout vào Header
- Tạo trang đăng nhập/đăng ký
- Update `LessonNode` và `ChapterNode` để check tiến độ từ database

---

## Files sẽ tạo/sửa

**Tạo mới:**

- `tepup/prisma/schema.prisma` - Database schema
- `tepup/app/api/auth/[...nextauth]/route.ts` - NextAuth config
- `tepup/lib/auth.ts` - Auth utilities
- `tepup/lib/prisma.ts` - Prisma client
- `tepup/app/login/page.tsx` - Trang đăng nhập
- `tepup/app/register/page.tsx` - Trang đăng ký
- `tepup/app/api/progress/route.ts` - API tiến độ học tập
- `tepup/.env.local` - Environment variables

**Sửa:**

- `tepup/components/Header.tsx` - Thêm user menu
- `tepup/package.json` - Thêm dependencies

---

## Chi phí ước tính

| Service | Free Tier | Khi scale lên |
|---------|-----------|---------------|
| Supabase | 500MB, 50k users | $25/tháng cho 8GB |
| Vercel | 100GB bandwidth | $20/tháng cho Pro |
| Google OAuth | Miễn phí | Miễn phí |

**Tổng**: Miễn phí cho giai đoạn đầu, ~$45/tháng khi scale

---

## Hướng dẫn tạo Supabase Project mới

### Bước 1: Tạo project

1. Truy cập [supabase.com](https://supabase.com) và đăng nhập
2. Click "New project"
3. Điền thông tin:
   - **Name**: `tepup` (hoặc tên bạn muốn)
   - **Database Password**: Tạo mật khẩu mạnh và lưu lại
   - **Region**: `Southeast Asia (Singapore)` - gần Việt Nam nhất
4. Click "Create new project" và đợi ~2 phút

### Bước 2: Lấy connection strings

1. Vào **Project Settings** → **Database**
2. Scroll xuống phần **Connection string**
3. Chọn tab **URI** và copy 2 URLs:

**Connection pooler (port 6543)** - cho app:
```
postgresql://postgres.[project-ref]:[password]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

**Direct connection (port 5432)** - cho migrations:
```
postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
```

### Bước 3: Cập nhật file .env

Sửa file `tepup/.env`:

```env
# Database - Supabase PostgreSQL
DATABASE_URL="[connection pooler URL]"
DIRECT_URL="[direct connection URL]"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="[tạo secret mới với: openssl rand -base64 32]"
```

### Bước 4: Tạo tables trong database

```bash
cd tepup
npx prisma db push
```

### Bước 5: Test

1. Khởi động app: `npm run dev`
2. Truy cập `http://localhost:3000/register`
3. Tạo tài khoản test
4. Đăng nhập tại `http://localhost:3000/login`

---

## Files đã tạo

| File | Mô tả |
|------|-------|
| `tepup/prisma/schema.prisma` | Database schema với User, Account, Session, UserProgress |
| `tepup/prisma.config.ts` | Prisma 7.x config với directUrl cho migrations |
| `tepup/lib/auth.ts` | NextAuth config với Credentials + Google provider |
| `tepup/lib/prisma.ts` | Prisma client singleton |
| `tepup/lib/hooks/useProgress.ts` | React hook để track tiến độ học tập |
| `tepup/app/(auth)/login/page.tsx` | Trang đăng nhập với UI đẹp |
| `tepup/app/(auth)/register/page.tsx` | Trang đăng ký |
| `tepup/app/api/auth/[...nextauth]/route.ts` | NextAuth API route |
| `tepup/app/api/register/route.ts` | API đăng ký tài khoản |
| `tepup/app/api/progress/route.ts` | API GET/POST tiến độ học tập |
| `tepup/components/Providers.tsx` | SessionProvider wrapper |
| `tepup/components/Header.tsx` | Header với user menu (đăng nhập/đăng xuất) |
| `tepup/types/next-auth.d.ts` | TypeScript types cho NextAuth |
