# PRD: Story Narrative Flow

> Task 03 - Phase 1 (UI/UX)

---

## Thông tin

| Field | Value |
|-------|-------|
| Task ID | 03-story-narrative-flow |
| Trạng thái | **HOÀN THÀNH** |
| Ngày tạo | 2026-01-25 |
| Ngày hoàn thành | 2026-01-25 |

---

## Mục tiêu

Thay đổi trang Story từ "đề xuất khóa học" sang "kể chuyện" - người dùng sẽ học qua các câu chuyện đời sống của nhân vật.

---

## Thay đổi so với hiện tại

### Hiện tại (Task 02)
```
/story/student
├── Hero: Minh - Sinh viên năm 3
├── "Khóa học phù hợp với Minh"
│   └── [Course Cards: Thuế, Tư duy, Kinh tế]
└── Placeholder tương lai
```

### Mới (Task 03)
```
/story/student
├── Hero: Minh - Sinh viên năm 3
├── "Lắng nghe câu chuyện của Minh"
│   ├── [Câu chuyện về Thuế]
│   ├── [Câu chuyện về Chính trị]
│   └── [Câu chuyện về ...]
└── Click story → /story/student/thue (story detail)
```

---

## Flow mới

```
┌─────────────────┐     ┌──────────────────────┐     ┌─────────────────┐
│  Trang chủ      │────▶│  Story Page          │────▶│  Story Detail   │
│  (chọn nhân vật)│     │  (chọn câu chuyện)   │     │  (danh sách     │
│                 │     │                      │     │   chapters)     │
└─────────────────┘     └──────────────────────┘     └─────────────────┘
                                                            │
                                                            ▼
                                                     ┌─────────────────┐
                                                     │  Exercise Flow  │
                                                     │  (bài tập)      │
                                                     └─────────────────┘
```

---

## Thiết kế Chi tiết

### 1. Story Page (`/story/[characterId]`)

**Section thay đổi**: Thay "Khóa học phù hợp" bằng "Lắng nghe câu chuyện"

```
┌─────────────────────────────────────────────────┐
│  [Icon] Lắng nghe câu chuyện của Minh           │
│         Khám phá kiến thức qua những trải       │
│         nghiệm thực tế của Minh                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌─────────────────┐  ┌─────────────────┐       │
│  │ 📋              │  │ 🏛️              │       │
│  │ Câu chuyện về   │  │ Câu chuyện về   │       │
│  │ THUẾ            │  │ CHÍNH TRỊ       │       │
│  │                 │  │                 │       │
│  │ "Minh vừa nhận  │  │ "Minh tham gia  │       │
│  │  lương đầu tiên │  │  bầu cử lần đầu │       │
│  │  và thắc mắc..."│  │  và tự hỏi..."  │       │
│  │                 │  │                 │       │
│  │ 4 chương        │  │ 3 chương        │       │
│  └─────────────────┘  └─────────────────┘       │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Story Card bao gồm:**
- Icon/Emoji theo chủ đề
- Tiêu đề: "Câu chuyện về [CHỦ ĐỀ]"
- Teaser: Mô tả ngắn tình huống của nhân vật
- Số chương (chapters)

### 2. Story Detail Page (`/story/[characterId]/[storySlug]`)

**Layout**: Tương tự Course Detail nhưng với narrative style

**Cột trái - Story Info:**
```
┌─────────────────────────┐
│  [Icon lớn]             │
│                         │
│  Câu chuyện của Minh    │  ← Badge: "Minh's Story"
│  về Thuế                │
│                         │
│  "Minh vừa nhận lương   │
│   đầu tiên 8 triệu/     │
│   tháng. Bạn bè bảo     │
│   phải đóng thuế nhưng  │
│   Minh không biết bắt   │
│   đầu từ đâu..."        │
│                         │
│  📖 4 Chương            │
│  ⏱️ ~20 phút            │
└─────────────────────────┘
```

**Cột phải - Chapters (thay vì Lessons):**
```
┌─────────────────────────────────────┐
│  PHẦN 1                             │
│  Lương đầu tiên                     │
├─────────────────────────────────────┤
│                                     │
│  ● Chương 1: Nhận lương             │  ← Active
│  │                                  │
│  ○ Chương 2: Thuế là gì?            │  ← Locked
│  │                                  │
│  ○ Chương 3: Tính thuế              │  ← Locked
│  │                                  │
│  ○ Chương 4: Kê khai                │  ← Locked
│                                     │
└─────────────────────────────────────┘
```

**Bên dưới Chapters - Related Stories:**
```
┌─────────────────────────────────────┐
│  📚 Câu chuyện liên quan            │
├─────────────────────────────────────┤
│  [Câu chuyện về Đầu tư]             │
│  [Câu chuyện về Tiết kiệm]          │
└─────────────────────────────────────┘
```

---

## Data Structure (Đề xuất)

```typescript
interface Story {
  slug: string;
  characterId: string;
  title: string;           // "Câu chuyện về Thuế"
  teaser: string;          // Mô tả ngắn tình huống
  icon: string;
  estimatedTime: string;   // "~20 phút"
  relatedCourseSlug: string; // Liên kết với course gốc
  chapters: Chapter[];
  relatedStories: string[]; // story slugs
}

interface Chapter {
  id: string;
  title: string;           // "Nhận lương đầu tiên"
  isCompleted: boolean;
  isLocked: boolean;
}
```

---

## Đã xác nhận

1. **Nội dung chapters**: Hoàn toàn mới, viết riêng cho story (narrative style)
2. **Flow danh sách chapters**: Giống y hệt flow danh sách lessons hiện tại

---

## Mockup (ASCII)

### Story Page - Sau khi update:

```
┌─────────────────────────────────────────────────────────────┐
│  ← Quay lại                                                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [🎓]  Minh                                                 │
│        Sinh viên năm 3                                      │
│        "Sắp ra trường, muốn hiểu về thuế..."                │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [📖] Lắng nghe câu chuyện của Minh                        │
│       Khám phá kiến thức qua trải nghiệm thực tế            │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ Câu chuyện   │  │ Câu chuyện   │  │ Câu chuyện   │       │
│  │ về THUẾ      │  │ về CHÍNH TRỊ │  │ về ĐẦU TƯ    │       │
│  │              │  │              │  │              │       │
│  │ 4 chương     │  │ 3 chương     │  │ 5 chương     │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Implementation

### Files đã tạo/sửa

```
tepup/
├── data/courses.ts                          # Thêm Story, Chapter interfaces + data
├── components/
│   ├── StoryCard.tsx                        # Card hiển thị story (NEW)
│   ├── ChapterNode.tsx                      # Node trong chapter path (NEW)
│   ├── ChapterPopup.tsx                     # Popup khi click chapter (NEW)
│   └── ChapterPath.tsx                      # Path với các chapters (NEW)
├── app/
│   ├── story/[characterId]/
│   │   └── page.tsx                         # Cập nhật: hiển thị stories thay vì courses
│   ├── story/[characterId]/[storySlug]/
│   │   └── page.tsx                         # Story Detail page (NEW)
│   └── learn/[lessonId]/
│       └── page.tsx                         # Cập nhật: hỗ trợ cả lessons và chapters
```

### Data Structure đã implement

```typescript
interface Story {
  slug: string;
  characterId: string;
  title: string;
  teaser: string;
  icon: string;
  estimatedTime: string;
  chaptersCount: number;
  parts: StoryPart[];
  relatedStories: string[];
}

interface StoryPart {
  id: string;
  name: string;
  chapters: Chapter[];
}

interface Chapter {
  id: string;
  title: string;
  isCompleted: boolean;
  isLocked: boolean;
}
```

### Routes mới

- `/story/student` - Danh sách stories của Minh
- `/story/student/minh-thue` - Story detail: Câu chuyện về Thuế
- `/story/student/minh-kinh-te` - Story detail: Câu chuyện về Kinh tế
- `/story/office-worker/huong-thue` - Story detail của Hương
- `/story/street-vendor/bactu-thue` - Story detail của Bác Tư
- (và các stories khác)

### Stories đã tạo

| Nhân vật | Story | Chapters |
|----------|-------|----------|
| Minh | Câu chuyện về Thuế | 4 |
| Minh | Câu chuyện về Kinh tế | 3 |
| Hương | Câu chuyện về Thuế | 4 |
| Hương | Câu chuyện về Đầu tư | 5 |
| Bác Tư | Câu chuyện về Thuế | 3 |
| Bác Tư | Câu chuyện về Mở rộng | 4 |
