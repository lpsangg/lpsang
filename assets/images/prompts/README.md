# Prompts Images

Thư mục này chứa ảnh minh họa cho các prompts trong trang prompts.

## Quy tắc đặt tên file:
- Sử dụng tên file khớp với `id` của prompt trong `prompts.json`
- Format: `{prompt-id}.jpg` hoặc `{prompt-id}.png`
- Kích thước đề xuất: 800x800px (1:1 ratio)
- Tối ưu cho web (< 200KB)

## Ví dụ:
```
portrait-photography.jpg
product-photography.jpg
architecture-render.jpg
fantasy-character.jpg
logo-design.jpg
```

## Cách sử dụng trong prompts.json:
```json
{
  "id": "portrait-photography",
  "image": "../../assets/images/prompts/portrait-photography.jpg"
}
```
