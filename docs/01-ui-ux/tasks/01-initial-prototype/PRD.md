# PRD: Initial Prototype

> Task 01 - Phase 1 (UI/UX)

---

## Thông tin

| Field | Value |
|-------|-------|
| Task ID | 01-initial-prototype |
| Trạng thái | **HOÀN THÀNH** |
| Ngày tạo | 2026-01-25 |
| Ngày hoàn thành | 2026-01-25 |

---

## Mục tiêu

Tạo prototype cơ bản với 3 flows chính dựa trên screenshots từ Brilliant.org:
1. Learning Paths (trang chủ)
2. Course Detail (chi tiết khóa học)
3. Exercise Flow (làm bài tập)

---

## Requirements

### 1. Learning Paths Page

**URL**: `/`

**Mô tả**: Trang chủ hiển thị danh sách các lộ trình học

**Components**:
- Header với logo, navigation, gamification badges (streak, points)
- Tiêu đề "Lộ trình Học"
- Categories với icon và description
- Course cards với hover effects và badge "NEW"

**Behavior**:
- Click course card → navigate to Course Detail

### 2. Course Detail Page

**URL**: `/courses/[slug]`

**Mô tả**: Chi tiết một khóa học với roadmap học tập

**Layout**: 2 cột
- Cột trái: Course info (icon, tên, mô tả, stats)
- Cột phải: Learning roadmap với lesson nodes

**Components**:
- Course info card (sticky)
- Level headers
- Lesson nodes (active, locked, completed states)
- Lesson popup khi click node

**Behavior**:
- Click lesson node (unlocked) → show popup
- Click "Bắt đầu" in popup → navigate to Exercise Flow

### 3. Exercise Flow

**URL**: `/learn/[lessonId]`

**Mô tả**: Full-screen mode để làm bài tập

**Components**:
- Minimal header (close button, progress bar, points)
- Exercise content (title, instruction)
- Answer options (multiple choice)
- Footer (check button)

**Behavior**:
- Select answer → enable check button
- Click check → show feedback (correct/incorrect)
- Continue to next exercise or return to course

---

## Fake Data

Đã tạo static data trong `data/courses.ts` với:
- 3 categories: Nền tảng KHXH, Kinh tế & Thuế, Triết học Chính trị
- 8 courses với lessons và exercises mẫu
- Multiple choice exercises

---

## Kết quả

### Files đã tạo

```
tepup/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    # Learning Paths
│   ├── globals.css                 # Custom animations
│   ├── courses/[slug]/page.tsx     # Course Detail
│   └── learn/[lessonId]/page.tsx   # Exercise Flow
├── components/
│   ├── Header.tsx
│   ├── CourseCard.tsx
│   ├── CategorySection.tsx
│   ├── LearningPath.tsx
│   ├── LessonNode.tsx
│   └── LessonPopup.tsx
└── data/
    └── courses.ts
```

### Screenshots

*(Có thể thêm screenshots sau khi review)*

---

## Feedback & Changes

*(Ghi nhận các feedback và thay đổi trong quá trình thực hiện)*

| Ngày | Feedback | Thay đổi |
|------|----------|----------|
| - | - | - |

---

## Notes

- Prototype hiện tại chưa có responsive hoàn chỉnh
- Animations cơ bản, có thể cải thiện sau
- Data structure có thể thay đổi khi có requirements chi tiết hơn
