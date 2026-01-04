# MTPL 深色模式设计规范 (Dark Mode Design System)

## 1. 核心原则 (Core Principles)
- **可读性优先 (Readability)**: 确保文字与背景在深色模式下具有 WCAG 2.1 AA 级对比度（至少 4.5:1）。
- **层级分明 (Hierarchy)**: 利用不同深度的灰色（Slate Scale）来区分界面层级，避免纯黑（#000000）带来的视觉疲劳。
- **一致性 (Consistency)**: 保持与浅色模式相同的布局和交互逻辑，仅改变色彩映射。
- **系统融合 (System Integration)**: 标题栏透明化，沉浸式体验，与系统状态栏融为一体。

## 2. 色彩系统 (Color System)

基于 Tailwind CSS Slate 色系构建。

### 2.1 背景色 (Backgrounds)
| Token | Light Mode (RGB) | Dark Mode (RGB) | 用途 |
|-------|------------------|-----------------|------|
| `bg-surface-50` | 248 250 252 (Slate 50) | 15 23 42 (Slate 900) | 应用底色，最底层背景 |
| `bg-surface-100` | 241 245 249 (Slate 100) | 30 41 59 (Slate 800) | 次级背景，如侧边栏、工具栏 |
| `bg-surface-200` | 226 232 240 (Slate 200) | 51 65 85 (Slate 700) | 边框、分割线、输入框背景 |
| `bg-surface-white`| 255 255 255 (White) | 30 41 59 (Slate 800) | 卡片、内容区域背景 |

### 2.2 文字颜色 (Typography)
| Token | Light Mode (RGB) | Dark Mode (RGB) | 用途 |
|-------|------------------|-----------------|------|
| `text-primary` | 15 23 42 (Slate 900) | 241 245 249 (Slate 100) | 主要标题、正文 |
| `text-secondary`| 71 85 105 (Slate 600) | 148 163 184 (Slate 400) | 次级信息、说明文字 |
| `text-muted` | 148 163 184 (Slate 400) | 100 116 139 (Slate 500) | 占位符、禁用状态 |

### 2.3 品牌色 (Brand Colors)
| Token | Light Mode (RGB) | Dark Mode (RGB) | 用途 |
|-------|------------------|-----------------|------|
| `primary` | 37 99 235 (Blue 600) | 59 130 246 (Blue 500) | 深色模式下提亮以增加对比度 |

## 3. 组件规范 (Component Specs)

### 3.1 标题栏 (Header)
- **Light**: 白色半透明 (`bg-white/80`) + 模糊
- **Dark**: 完全透明 (`bg-transparent`)，无边框或极低透明度边框。让内容背景色自然延伸。

### 3.2 侧边栏 (Sidebar)
- **Light**: 白色 (`bg-white`)
- **Dark**: 深色层级 (`bg-surface-white` / Slate 800)，与主内容区区分。

### 3.3 编辑器 (Editor)
- **Container**: 跟随卡片背景 (`bg-surface-white`)。
- **Text**: `text-primary`。

### 3.4 预览区 (Preview)
- **Wrapper**: `bg-surface-100` (Slate 800)。
- **Paper**: 保持白色 (`#ffffff`) 以模拟真实打印效果，文字保持黑色。

## 4. 交互与动画 (Interaction & Animation)
- 所有颜色属性变化（`color`, `background-color`, `border-color`）应有 300ms 的过渡时间 (`ease-in-out`)。
