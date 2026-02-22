# Tepup - Website Học Khoa học Xã hội

> Nền tảng học tập tương tác về Khoa học Xã hội, Kinh tế, Thuế và Triết học Chính trị  
> UX lấy cảm hứng từ Brilliant.org

---

## Tổng quan Dự án

### Mục tiêu
Xây dựng một website học tập hoàn chỉnh với:
- Giao diện người dùng trực quan, gamified
- Backend đầy đủ chức năng
- Hệ thống bài học và bài tập tương tác

### Tech Stack
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: (Sẽ định nghĩa ở Phase 2)
- **Database**: (Sẽ định nghĩa ở Phase 2)

---

## Các Giai đoạn

### [Phase 1: UI/UX](./01-ui-ux/README.md) - **HOÀN THÀNH**
Tập trung hoàn thiện giao diện và trải nghiệm người dùng.
- Fake data / Static data
- Hoàn thiện tất cả các screens và flows cơ bản
- Responsive design
- Animations và micro-interactions

**Kết quả đạt được:**
- 4 tasks hoàn thành
- Full flow từ Learning Paths → Course/Story → Lesson với progressive content
- Story-based learning với 3 nhân vật
- Interactive question với UX giống Brilliant

### [Phase 2: Backend](./02-backend/README.md) - **ĐANG TRIỂN KHAI**
Xây dựng backend để hỗ trợ đầy đủ các flows từ Phase 1.
- **Tech Stack**: Next.js API Routes + Supabase PostgreSQL + Prisma + NextAuth.js
- Authentication (Email/Password + Google OAuth)
- User progress tracking
- API endpoints

### [Phase 3: Admin Website](./03-admin/README.md) - **KẾ HOẠCH**
Xây dựng toàn bộ website admin để review content do AI viết.
- Giao diện quản trị riêng (admin dashboard)
- Review, chỉnh sửa, duyệt nội dung do AI tạo ra
- Quản lý bài học, story, câu hỏi… trước khi publish lên app người dùng

---

## Quy trình Làm việc

1. **Mỗi task** sẽ có file PRD (Product Requirement Document) riêng
2. **Trao đổi** qua PRD trước khi code
3. **Cập nhật** plan sau mỗi thay đổi
4. **Chỉ chuyển phase** khi đã hoàn thành và hài lòng với phase hiện tại

---

## Cấu trúc Thư mục Docs

```
docs/
├── PLAN.md                    # File này - Tổng quan dự án
├── 01-ui-ux/
│   ├── README.md              # Tổng quan Phase 1
│   └── tasks/
│       ├── 01-initial-prototype/PRD.md
│       ├── 02-story-based-learning/PRD.md
│       ├── 03-story-narrative-flow/PRD.md
│       └── 04-lesson-content-flow/PRD.md
├── 02-backend/
│   ├── README.md              # Tổng quan Phase 2
│   └── tasks/
│       └── 01-authentication/PRD.md
└── 03-admin/
    └── README.md              # Tổng quan Phase 3 - Admin website
```

---

## Tiến độ Tổng thể

| Giai đoạn | Trạng thái | Hoàn thành |
|-----------|------------|------------|
| Phase 1: UI/UX | **Hoàn thành** | 100% |
| Phase 2: Backend | **Đang triển khai** | 5% |
| Phase 3: Admin Website | **Kế hoạch** | 0% |

---

## Tổng kết Phase 1

### Các Màn hình đã xây dựng

1. **Learning Paths** (`/`)
   - Danh sách categories và courses
   - Section "Học theo Câu chuyện" với 3 nhân vật
   - Header với streak, points, premium

2. **Course Detail** (`/courses/[slug]`)
   - Thông tin khóa học
   - Learning path với lesson nodes
   - Related stories section
   - Back button với browser history

3. **Story Page** (`/story/[characterId]`)
   - Character hero section
   - Danh sách stories của nhân vật
   - Back button

4. **Story Detail** (`/story/[characterId]/[storySlug]`)
   - Thông tin story với chapter count
   - Chapter path giống lesson path
   - Related courses section
   - Back button

5. **Learn Page** (`/learn/[lessonId]`)
   - Progressive content reveal
   - Text blocks với title và paragraphs
   - Callout blocks (info/warning/success)
   - Question blocks với Kiểm tra flow
   - Progress bar và points

### Data Models (Fake Data)

- Categories, Courses, Levels, Lessons
- Characters, Stories, StoryParts, Chapters
- ContentBlocks (Text, Callout, Question)
- LessonContents

---

## Changelog

### 2026-01-25
- Khởi tạo dự án với Next.js 14 + Tailwind CSS
- Tạo prototype cơ bản với 3 flows:
  1. Learning Paths (trang chủ)
  2. Course Detail (chi tiết khóa học)
  3. Exercise Flow (làm bài tập)
- Thiết lập cấu trúc docs theo phases
- **[Task 02]** Thêm section "Học theo Câu chuyện" với 3 nhân vật:
  - Minh (Sinh viên)
  - Hương (Nhân viên VP)
  - Bác Tư (Bán hàng rong)
- **[Task 03]** Chuyển từ "đề xuất khóa học" sang "kể chuyện":
  - Story Page: "Lắng nghe câu chuyện của [Nhân vật]"
  - Story Detail: Danh sách chapters giống lessons
  - 6 stories cho 3 nhân vật (2 stories mỗi người)

### 2026-01-26
- **[Task 04]** Lesson Content Flow với progressive reveal:
  - Nội dung bài học: Text + Callout + Question
  - Progressive reveal: hiển thị từng block khi nhấn Continue
  - Question phải chọn đáp án + nhấn "Kiểm tra" trước khi tiếp tục
  - Scroll tự động khi reveal content mới
- **Hoàn thành Phase 1**: Tất cả UI/UX cơ bản đã xong

### 2026-01-30
- **Thêm Phase 3: Admin Website** vào kế hoạch:
  - Build toàn bộ website admin để review content do AI viết
  - Dashboard quản trị, review/chỉnh sửa/duyệt nội dung trước khi publish
  - Chi tiết sẽ được triển khai sau khi Phase 2 ổn định
