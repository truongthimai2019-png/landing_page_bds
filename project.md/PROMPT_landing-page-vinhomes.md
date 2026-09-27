# Yêu cầu: Landing Page Vinhomes Grand Park – TP. Thủ Đức

> Dán nội dung file này vào khung chat Agent của Antigravity (hoặc gõ: "Làm theo file PROMPT_landing-page-vinhomes.md").

## 1. Mục tiêu
Tạo một trang **Landing Page tĩnh** quảng cáo dự án **Vinhomes Grand Park** tại **TP. Thủ Đức, TP.HCM**.
Chỉ dùng **HTML + CSS + JavaScript**, **Bootstrap 5 qua CDN**. **Không dùng backend** (không PHP, Node, Python, database…).

## 2. Cấu trúc thư mục cần tạo
```
vinhomes-landing/
├── index.html        ← mã nguồn chính (bắt buộc)
├── css/style.css     ← CSS tuỳ chỉnh (màu, font, hiệu ứng)
├── js/main.js        ← JavaScript (cuộn mượt, hiệu ứng, xử lý nút CTA)
└── images/           ← (tuỳ chọn) ảnh tải về máy nếu không dùng link online
```

## 3. Giao diện (bắt buộc)
| Thuộc tính | Giá trị |
|---|---|
| Màu nền chủ đạo | `#f2f2f2` |
| Màu chữ chủ đạo | `#2d2d86` |
| Nút CTA | nền `#2d2d86`, chữ trắng; hover đậm hơn |
| Font | Google Fonts hỗ trợ tiếng Việt (vd: `Be Vietnam Pro`) |
| Responsive | Hiển thị tốt trên điện thoại, tablet, máy tính |

Khai báo màu bằng biến CSS trong `:root`:
```css
:root {
  --bg-main: #f2f2f2;
  --text-main: #2d2d86;
}
```

## 4. Các phần của trang

### 4.1 Header / Navbar
- Logo dạng chữ: **VINHOMES** (có thể kèm dòng nhỏ "Grand Park").
- Menu: **Trang chủ · Tiện ích · Liên hệ** – bấm vào cuộn mượt tới từng phần.
- Navbar cố định trên cùng (`sticky-top`), có nút hamburger trên điện thoại.

### 4.2 Hero Section
- Bố cục 2 cột (Bootstrap grid): **chữ bên trái – hình ảnh bên phải**. Trên điện thoại: chữ ở trên, ảnh ở dưới.
- **Tiêu đề giật gân**, ví dụ: *"Sở hữu ngay tổ ấm đẳng cấp giữa lòng Thủ Đức – Chỉ còn số ít căn đẹp!"*
- **Đoạn mô tả ngắn** (2–3 câu) về vị trí, không gian xanh, hệ sinh thái Vinhomes.
- **1 nút CTA**: "Nhận bảng giá & ưu đãi" → cuộn xuống phần Liên hệ.
- **Hình ảnh bên phải**: bất động sản, biệt thự nghỉ dưỡng, trường Vinschool. Gợi ý: dùng Bootstrap **Carousel** tự chuyển 3 ảnh, hoặc lưới 3 ảnh xếp so le.

### 4.3 Features Section – 3 tính năng nổi bật
Dùng 3 **Bootstrap Card**, mỗi card **1 hình ảnh khác nhau**, tiêu đề và mô tả ngắn:
1. **Lối sống thượng lưu** – ảnh: căn hộ/biệt thự sang trọng, hồ bơi.
2. **Tiện ích tối ưu** – ảnh: công viên, trường học, trung tâm thương mại.
3. **Pháp lý nhanh gọn** – ảnh: ký kết hợp đồng, bàn giao chìa khoá.

Card có hiệu ứng hover (nổi lên nhẹ, đổ bóng).

### 4.4 Footer
- Thông tin bản quyền: `© <năm hiện tại> – Vinhomes Grand Park. All rights reserved.` (năm lấy tự động bằng JavaScript).
- Thông tin liên hệ: **Hotline, Email, Địa chỉ** → để dạng chỗ trống dễ sửa, KHÔNG tự bịa:
  - Hotline: `[ĐIỀN SỐ HOTLINE]`
  - Email: `[ĐIỀN EMAIL]`
  - Địa chỉ: `[ĐIỀN ĐỊA CHỈ]`
- Thêm 1 dòng nhỏ: *"Trang thông tin do đơn vị phân phối thực hiện. Hình ảnh mang tính minh hoạ."*

## 5. Hình ảnh
- Dùng ảnh miễn phí bản quyền từ **Unsplash** (`https://images.unsplash.com/...`) phù hợp từng chủ đề.
- Mọi thẻ `<img>` phải có `alt` tiếng Việt, `loading="lazy"`, `object-fit: cover` để ảnh không méo.
- Kiểm tra link ảnh hiển thị được; ảnh nào lỗi thì thay ảnh khác.

## 6. JavaScript (js/main.js)
- Cuộn mượt khi bấm menu và nút CTA.
- Tự đóng menu hamburger sau khi bấm một mục trên điện thoại.
- Hiệu ứng hiện dần (fade-in) khi cuộn tới các section (dùng `IntersectionObserver`).
- Tự cập nhật năm trong footer.

## 7. Tiêu chí hoàn thành
- [ ] Mở trực tiếp `index.html` bằng trình duyệt là chạy, không cần cài gì.
- [ ] Đúng màu `#f2f2f2` / `#2d2d86`.
- [ ] Hero: ảnh nằm bên phải trên máy tính.
- [ ] Features: đủ 3 tính năng, 3 ảnh khác nhau.
- [ ] Footer có bản quyền + liên hệ (chỗ trống để điền).
- [ ] Không lỗi Console, không thanh cuộn ngang trên điện thoại.
- [ ] Toàn bộ nội dung bằng tiếng Việt có dấu.
