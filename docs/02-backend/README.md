# Phase 2: Backend

> Xây dựng backend để hỗ trợ đầy đủ các flows từ Phase 1

---

## Trạng thái: **ĐANG TRIỂN KHAI**

Phase 1 (UI/UX) đã hoàn thành. Đang triển khai Authentication.

---

## Mục tiêu Phase này

- [ ] API endpoints cho tất cả features
- [ ] Database schema dựa trên data models từ Phase 1
- [ ] User authentication & authorization
- [ ] Progress tracking & analytics
- [ ] Content management

---

## Data Models cần triển khai

Từ Phase 1, các data models đã được định nghĩa:

### Core Models
```
Category
├── id, name, description, icon
└── courses[]

Course
├── slug, name, description, icon
├── lessonsCount, exercisesCount, isNew
└── levels[]

Level
├── id, name
└── lessons[]

Lesson
├── id, name, isCompleted, isLocked
```

### Story Models
```
Character
├── id, name, role, description
├── icon, color, bgColor
└── stories[]

Story
├── slug, characterId, title, teaser
├── icon, estimatedTime, chaptersCount
├── relatedCourses[]
└── parts[]

StoryPart
├── id, name
└── chapters[]

Chapter
├── id, title, isCompleted, isLocked
```

### Content Models
```
LessonContent
├── lessonId, title
└── blocks[]

ContentBlock (union type)
├── TextBlock: type, title?, paragraphs[]
├── CalloutBlock: type, icon?, title?, text, variant?
├── QuestionBlock: type, question, options[], explanation?
└── ImageBlock: type, src, alt, caption?
```

---

## Tech Stack (Đã xác nhận)

- **Backend**: Next.js API Routes (tích hợp trong project)
- **Database**: Supabase PostgreSQL (free tier: 500MB, 50k users/tháng)
- **ORM**: Prisma
- **Auth**: NextAuth.js (Auth.js) v5
- **Hosting**: Vercel (free tier)

---

## API Endpoints cần thiết

### Categories & Courses
```
GET /api/categories          # List all categories with courses
GET /api/courses/:slug       # Get course detail with levels/lessons
```

### Stories
```
GET /api/characters          # List all characters
GET /api/characters/:id      # Get character with stories
GET /api/stories/:slug       # Get story detail with chapters
```

### Content
```
GET /api/lessons/:id/content # Get lesson content blocks
GET /api/chapters/:id/content # Get chapter content blocks
```

### User (if auth implemented)
```
POST /api/auth/login
POST /api/auth/register
GET /api/user/progress
POST /api/user/progress/:lessonId
```

---

## Tasks

| # | Task | Trạng thái | PRD |
|---|------|------------|-----|
| 01 | Authentication & Progress Tracking | **Đang lên kế hoạch** | [PRD](./tasks/01-authentication/PRD.md) |
| 02 | API Endpoints (Courses, Stories) | Chờ | - |
| 03 | Content Management | Chờ | - |

---

## Notes

- Backend sẽ được thiết kế để match với UI đã có
- Ưu tiên simple & functional trước, optimize sau
- Có thể deploy frontend và backend riêng hoặc cùng trong Next.js API routes
