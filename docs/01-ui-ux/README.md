# Phase 1: UI/UX

> Tập trung hoàn thiện giao diện và trải nghiệm người dùng

---

## Trạng thái: **HOÀN THÀNH**

Phase 1 đã hoàn thành với tất cả các tính năng UI/UX cơ bản được triển khai.

---

## Mục tiêu Phase này

- [x] Hoàn thiện tất cả screens theo design reference (Brilliant.org)
- [x] Fake data / Static data (chưa cần backend)
- [x] Animations và micro-interactions
- [x] User có thể navigate qua toàn bộ flow

---

## Screens & Flows đã hoàn thành

### 1. Learning Paths (`/`)
- Trang chủ với danh sách categories và courses
- Section "Học theo Câu chuyện" với 3 nhân vật
- Header với streak, points, premium button

### 2. Course Detail (`/courses/[slug]`)
- Chi tiết khóa học với roadmap và lesson nodes
- Popup khi click lesson node
- Related stories section
- Back button với browser history

### 3. Story Page (`/story/[characterId]`)
- Character hero section
- Danh sách "Lắng nghe câu chuyện của [Nhân vật]"
- Story cards với thông tin và button

### 4. Story Detail (`/story/[characterId]/[storySlug]`)
- Thông tin story và statistics
- Chapter path với visual roadmap
- Related courses section

### 5. Learn Page (`/learn/[lessonId]`)
- Progressive content reveal
- Text blocks, Callout blocks, Question blocks
- "Kiểm tra" flow cho questions
- Progress bar và points system
- Auto-scroll khi reveal content

---

## Tasks đã hoàn thành

| # | Task | Trạng thái | PRD |
|---|------|------------|-----|
| 01 | Initial Prototype | **Hoàn thành** | [Link](./tasks/01-initial-prototype/PRD.md) |
| 02 | Story-based Learning | **Hoàn thành** | [Link](./tasks/02-story-based-learning/PRD.md) |
| 03 | Story Narrative Flow | **Hoàn thành** | [Link](./tasks/03-story-narrative-flow/PRD.md) |
| 04 | Lesson Content Flow | **Hoàn thành** | [Link](./tasks/04-lesson-content-flow/PRD.md) |

---

## Design Reference

Dựa trên screenshots từ Brilliant.org:
1. **Screenshot 1**: Learning Paths page - Categories, course cards
2. **Screenshot 2**: Course Detail - Left info panel, right roadmap với nodes
3. **Screenshot 3**: Exercise - Minimal header, interactive question, check button

---

## Tech Stack (Frontend)

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Data**: Static TypeScript files

---

## Files Structure

```
tepup/
├── app/
│   ├── page.tsx                    # Learning Paths
│   ├── courses/[slug]/page.tsx     # Course Detail
│   ├── story/
│   │   ├── [characterId]/page.tsx  # Story Page
│   │   └── [characterId]/[storySlug]/page.tsx  # Story Detail
│   └── learn/[lessonId]/page.tsx   # Learn Page
├── components/
│   ├── Header.tsx
│   ├── CourseCard.tsx
│   ├── CategorySection.tsx
│   ├── LessonNode.tsx
│   ├── LessonPopup.tsx
│   ├── LearningPath.tsx
│   ├── CharacterCard.tsx
│   ├── StorySection.tsx
│   ├── StoryCard.tsx
│   ├── ChapterNode.tsx
│   ├── ChapterPopup.tsx
│   ├── ChapterPath.tsx
│   └── BackButton.tsx
└── data/
    └── courses.ts                   # All fake data + types
```

---

## Sẵn sàng cho Phase 2

Phase 1 đã định nghĩa rõ:
- Tất cả data models cần thiết
- UI/UX flows hoàn chỉnh
- Component structure

Backend (Phase 2) sẽ build API để replace fake data với real data.
