# PRD: Lesson Content Flow

> Task 04 - Phase 1 (UI/UX)

---

## Thông tin

| Field | Value |
|-------|-------|
| Task ID | 04-lesson-content-flow |
| Trạng thái | **HOÀN THÀNH** |
| Ngày tạo | 2026-01-26 |
| Ngày hoàn thành | 2026-01-26 |

---

## Mục tiêu

Thiết kế lại nội dung bên trong một lesson để kết hợp:
- Bài giảng (text + hình ảnh)
- Câu hỏi Q&A (multiple choice)
- Progressive reveal: nội dung hiển thị từng phần khi nhấn Continue

---

## Tham khảo (Brilliant)

1. **Text content**: Tiêu đề + đoạn văn giải thích
2. **Visual content**: Hình ảnh, diagrams, chat bubbles
3. **Interactive content**: Code editor, inputs
4. **Question**: Multiple choice với Check button
5. **Continue button**: Reveal thêm content, scroll xuống

---

## Content Types

```typescript
type ContentBlock = 
  | { type: 'text'; title?: string; paragraphs: string[] }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'callout'; icon?: string; text: string }
  | { type: 'question'; question: string; options: Option[]; correctId: string };
```

---

## Behavior

1. Page load: Chỉ hiển thị block đầu tiên
2. User đọc content → nhấn "Continue"
3. Scroll xuống + reveal block tiếp theo
4. Nếu block là question:
   - User chọn đáp án → nhấn "Check"
   - Hiển thị feedback đúng/sai
   - Nút đổi thành "Continue" để tiếp tục
5. Khi hết blocks → nút "Hoàn thành" để quay lại

---

## Implementation

### Files đã tạo/sửa

```
tepup/
├── data/courses.ts              # Thêm ContentBlock types + lessonContents data
├── app/learn/[lessonId]/
│   └── page.tsx                 # Rewrite với progressive reveal
└── app/globals.css              # Update animation
```

### Content Types đã implement

1. **TextBlock**: Tiêu đề + paragraphs
2. **CalloutBlock**: Icon + title + text với variants (info/warning/success)
3. **QuestionBlock**: Multiple choice với explanation

### Behavior

1. Chỉ hiển thị block đầu tiên khi load
2. Nhấn "Tiếp tục" → reveal block tiếp theo + scroll
3. Nếu block là question:
   - Chọn đáp án → đáp án highlight (màu xanh dương)
   - Nút đổi thành "Kiểm tra" (màu xanh dương)
   - Nhấn "Kiểm tra" → hiển thị kết quả đúng/sai + explanation
   - Nút đổi thành "Tiếp tục"
4. Khi hết blocks → nút "Hoàn thành"

### Sample Content

Đã tạo content cho:
- `thue-1` (Thu nhập chịu thuế) - 7 blocks
- `minh-thue-1` (Ngày nhận lương - Story) - 6 blocks
