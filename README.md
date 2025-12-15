# Personal Portfolio Website - Le Phuoc Sang

Modern portfolio website showcasing AI/ML projects, professional experience, certifications, and blog posts.

## 🌟 Features

- **Responsive Design**: Mobile-first approach with glassmorphism UI
- **Neural Network Animation**: Interactive canvas background
- **Project Showcase**: 4 AI/ML projects with detailed pages
- **Blog System**: Dynamic blog posts loaded from JSON
- **Experience Carousel**: Photo gallery of internship memories
- **Active Navigation**: Scroll-based section highlighting
- **Certifications**: Professional skills and management certificates
- **Education**: GPA and scholarship highlights

## 📁 Project Structure

```
web_portfolio/
├── index.html                      # Main portfolio page
├── assets/                         # All static resources
│   ├── css/
│   │   ├── main.css               # Main styles (formerly styles.css)
│   │   ├── responsive.css         # Responsive breakpoints
│   │   └── projects/              # Project-specific styles
│   │       ├── exam-grading.css
│   │       └── fertilizer.css
│   ├── js/
│   │   └── main.js                # Main JavaScript (formerly script.js)
│   ├── images/
│   │   ├── logos/                 # Brand logos (logo.png, nas.png, pvcfc-logo.png)
│   │   ├── projects/              # Project thumbnails
│   │   │   ├── exam-grading.png
│   │   │   ├── fertilizer.png
│   │   │   ├── speaker-recognition.png
│   │   │   └── time-series.png
│   │   ├── blog/                  # Blog post images
│   │   │   ├── ci-cd.png
│   │   │   ├── yolo.jpeg
│   │   │   └── lstm.png
│   │   └── experience/            # Experience photos
│   │       └── pvcfc/             # PVCFC internship gallery (pvcfc-1.jpg to pvcfc-6.jpg)
│   ├── data/
│   │   └── blogs.json             # Blog posts content
│   └── documents/
│       └── CV_LePhuocSang.pdf     # Resume/CV
│
├── pages/                          # HTML pages (formerly template/)
│   ├── blog/
│   │   ├── index.html             # Blog listing page (formerly blog.html)
│   │   └── detail.html            # Blog detail page (formerly blog_detail.html)
│   ├── projects/
│   │   ├── exam-grading.html      # Automatic Exam Grading project
│   │   └── fertilizer.html        # Fertilizer Classification project
│   └── components/
│       ├── header.html            # Reusable header component
│       └── footer.html            # Reusable footer component
│
└── README.md                       # This file
```

## 🎨 Design System

### Color Palette
- **Primary Accent**: `#00bfff` (Cyan Blue)
- **Background**: `#4c4c4cb8` (Dark Gray with transparency)
- **Text on Dark**: `#ffffff` (White), `#ddd` (Light Gray)
- **Glassmorphism**: `rgba(255,255,255,0.1)` with `backdrop-filter: blur(20px)`

### Typography
- **Font Family**: IBM Plex Mono (Monospace)
- **Headings**: Bold weights (600-700)
- **Body Text**: 1rem base size, 1.6-1.8 line-height

### Components
- **Cards**: Glassmorphism with 2px white borders
- **Hover Effects**: `translateY(-8px)` with shadow transitions
- **Buttons**: Rounded, gradient backgrounds on hover
- **Carousel**: Auto-slide every 5 seconds with manual controls

## 🚀 Technologies Used

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Icons**: Font Awesome 6.4.2
- **Fonts**: IBM Plex Mono (Google Fonts)
- **Animation**: Canvas API for neural network background
- **Data**: JSON-based blog content management

## 📱 Responsive Breakpoints

- **Mobile**: < 600px (1 column grid)
- **Tablet**: 600px - 1024px (2 column grid)
- **Desktop**: > 1024px (3 column grid for projects)

## 🛠️ Development

### File Naming Conventions
- CSS: `kebab-case.css`
- Images: `kebab-case.png/jpg`
- Pages: `kebab-case.html`

### Path Structure
- Absolute paths from root: `assets/`, `pages/`
- Relative paths in subpages: `../../assets/`

## 📝 Content Management

### Adding a Blog Post
Edit `assets/data/blogs.json`:
```json
{
  "id": "unique-slug",
  "title": "Blog Title",
  "summary": "Short description",
  "thumbnail": "assets/images/blog/image.png",
  "date": "2024-01-15",
  "content": "<h2>HTML content</h2><p>...</p>"
}
```

### Adding a Project
1. Create project page in `pages/projects/project-name.html`
2. Add CSS in `assets/css/projects/project-name.css`
3. Update `index.html` project grid with new card
4. Add thumbnail to `assets/images/projects/`

### Adding Experience Photos
Upload images to `assets/images/experience/pvcfc/` as `pvcfc-1.jpg`, `pvcfc-2.jpg`, etc.

## 🌐 Deployment

1. Upload entire `web_portfolio/` folder to web server
2. Ensure `index.html` is in root directory
3. Verify all asset paths are accessible
4. Test responsive design on multiple devices

## 📄 License

Personal Portfolio - All rights reserved © 2024 Le Phuoc Sang

## 📧 Contact

- **Email**: lpsang.work@gmail.com
- **LinkedIn**: [Le Phuoc Sang](https://linkedin.com/in/le-phuoc-sang)
- **GitHub**: [lpsangg](https://github.com/lpsangg)

---

**Last Updated**: December 15, 2025
**Version**: 2.0.0 (Restructured)
