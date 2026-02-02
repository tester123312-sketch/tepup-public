# PRD: Học theo Câu chuyện (Story-based Learning)

> Task 02 - Phase 1 (UI/UX)

---

## Thông tin

| Field | Value |
|-------|-------|
| Task ID | 02-story-based-learning |
| Trạng thái | **HOÀN THÀNH** |
| Ngày tạo | 2026-01-25 |
| Ngày hoàn thành | 2026-01-25 |

---

## Mục tiêu

Thêm một section đặc biệt trên trang Learning Paths cho phép người dùng học qua góc nhìn của các nhân vật khác nhau.

---

## Vị trí trên UI

**Trang**: Learning Paths (`/`)

**Vị trí**: Phía trên các categories hiện tại (nổi bật hơn)

---

## Design Concept

### Section Header
- Tiêu đề: **"Học theo Câu chuyện"**
- Mô tả: "Khám phá kiến thức qua hành trình của các nhân vật"

### Character Cards

Mỗi card đại diện cho một nhân vật:

| Nhân vật | Icon suggestion | Mô tả (draft) |
|----------|-----------------|---------------|
| Sinh viên | 🎓 GraduationCap | Từ giảng đường đến thực tế |
| Nhân viên văn phòng | 💼 Briefcase | Quản lý tài chính cá nhân |
| Bán hàng rong | 🛒 ShoppingCart | Khởi nghiệp từ vỉa hè |

### Card Layout (Rich Style)

```
┌───────────────────────────────────────┐
│                                       │
│   [Avatar]     Nhân viên Văn phòng    │
│   (large)                             │
│               "Lương 15 triệu/tháng,  │
│                muốn hiểu về thuế và   │
│                đầu tư tài chính"      │
│                                       │
│               [Khám phá →]            │
│                                       │
└───────────────────────────────────────┘
```

**Đặc điểm:**
- Card lớn, ngang (horizontal layout)
- Avatar/illustration bên trái
- Tên nhân vật + mô tả tình huống bên phải
- Button CTA "Khám phá" hoặc "Bắt đầu hành trình"

---

## Đã xác nhận

1. **Flow sau khi chọn nhân vật**: Vẫn vào các course bình thường nhưng content được customize theo context của nhân vật

2. **Visual style**: Cards lớn hơn với nhiều thông tin (avatar, tên, tình huống...)

## Đã xác nhận (tiếp)

3. **Số lượng nhân vật**: 3 nhân vật
4. **Avatar style**: Illustration cartoon/flat design

---

## Chi tiết Nhân vật (Đề xuất)

### 1. Sinh viên
- **Tên**: Minh - Sinh viên năm 3
- **Avatar**: Illustration sinh viên trẻ với ba lô
- **Tình huống**: "Sắp ra trường, muốn hiểu về thuế và tài chính cá nhân trước khi đi làm"
- **Màu chủ đạo**: Xanh lá / Teal

### 2. Nhân viên Văn phòng  
- **Tên**: Hương - Nhân viên kế toán
- **Avatar**: Illustration người đi làm với laptop
- **Tình huống**: "Lương 15 triệu/tháng, muốn tối ưu thuế và bắt đầu đầu tư"
- **Màu chủ đạo**: Xanh dương

### 3. Bán hàng rong
- **Tên**: Bác Tư - Chủ xe bánh mì
- **Avatar**: Illustration người bán hàng với xe đẩy
- **Tình huống**: "Bán bánh mì 10 năm, muốn hiểu nghĩa vụ thuế và mở rộng kinh doanh"
- **Màu chủ đạo**: Cam / Vàng

---

**Lưu ý**: Vì chưa có illustration thật, prototype sẽ dùng placeholder icon + màu sắc để phân biệt. Có thể thay thế bằng illustration sau.

---

## Mockup so sánh

### Trước (hiện tại)
```
┌──────────────────────────────────────┐
│ Header                               │
├──────────────────────────────────────┤
│ Lộ trình Học                         │
│                                      │
│ [Nền tảng KHXH]                      │
│   [Card] [Card]                      │
│                                      │
│ [Kinh tế & Thuế]                     │
│   [Card] [Card] [Card]               │
└──────────────────────────────────────┘
```

### Sau (đề xuất)
```
┌──────────────────────────────────────┐
│ Header                               │
├──────────────────────────────────────┤
│ Lộ trình Học                         │
│                                      │
│ ⭐ HỌC THEO CÂU CHUYỆN              │  ← NEW
│   [Sinh viên] [NVVP] [Bán hàng]      │
│                                      │
│ [Nền tảng KHXH]                      │
│   [Card] [Card]                      │
│                                      │
│ [Kinh tế & Thuế]                     │
│   [Card] [Card] [Card]               │
└──────────────────────────────────────┘
```

---

## Chờ feedback

Vui lòng confirm hoặc bổ sung các điểm trên để tôi có thể implement.

---

## Implementation

### Files đã tạo/sửa

```
tepup/
├── data/courses.ts              # Thêm Character interface + characters data
├── components/
│   ├── CharacterCard.tsx        # Card hiển thị nhân vật (NEW)
│   └── StorySection.tsx         # Section "Học theo Câu chuyện" (NEW)
├── app/
│   ├── page.tsx                 # Thêm StorySection
│   └── story/[characterId]/
│       └── page.tsx             # Trang story của từng nhân vật (NEW)
```

### Data Structure

```typescript
interface Character {
  id: string;
  name: string;
  role: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  recommendedCourses: string[]; // course slugs
}
```

### Routes mới

- `/story/student` - Trang của Minh (Sinh viên)
- `/story/office-worker` - Trang của Hương (Nhân viên VP)
- `/story/street-vendor` - Trang của Bác Tư (Bán hàng rong)

---

## Changelog

| Ngày | Thay đổi |
|------|----------|
| 2026-01-25 | Tạo PRD draft |
