# MTPL

**M**arkdown **T**emplated **P**DF **L**ite via YAML

MTPL 是一个轻量级的、基于 YAML 配置驱动的 Markdown 转 PDF 解决方案。它作为一个**基座项目**，专注于提供核心的渲染引擎与编辑器体验，本身**不内置任何特定模板**，而是通过灵活的加载机制支持外部模板生态。

[![License](https://img.shields.io/badge/license-AGPLv3.0-blue.svg)](LICENSE)

## 🌟 项目定位

MTPL 旨在构建一个去中心化的文档生成生态系统：

- **MTPL Core (本仓库)**: 核心渲染器、编辑器及插件系统。
- **Official Templates (规划中)**: 官方维护的标准公文、论文、简历等模板集合。
- **Template Starter (规划中)**: 用于快速创建新模板的脚手架仓库。

## ✨ 核心特性

- **YAML 驱动**: 通过 Front-Matter 灵活控制文档元数据、样式变量及模板选择。
- **模板解耦**: 核心库不绑定特定样式，支持从 GitHub 或其他源动态加载模板。
- **所见即所得**: 实时 Markdown 编辑与 PDF 预览，支持 PWA 离线使用。
- **纯前端架构**: 零后端依赖，所有渲染逻辑在浏览器端完成，安全且隐私。

## 🚀 一键部署

部署你自己的 MTPL 实例：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMTPL-via-YAML%2FMTPL)

## 🛠️ 使用指南

### 基础配置

在 Markdown 文件头部使用 YAML 定义配置：

```yaml
---
title: "我的文档"
template:
  source: "github" # 模板来源
  repo: "Mrered/mtpl-official-templates" # 模板仓库 (示例)
  name: "report-v1" # 模板名称
data:
  author: "张三"
  date: "2024-01-01"
---
```

*(注：具体配置字段取决于所加载的模板定义)*

## 💻 本地开发

```bash
# 克隆仓库
git clone https://github.com/MTPL-via-YAML/MTPL.git

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 🤝 参与贡献

MTPL 是一个开放的生态系统，欢迎提交 PR 改进核心引擎，或发布自己的模板仓库。

## 📝 开源协议

本项目基于 AGPL 3.0 协议开源 - 详见 [LICENSE](LICENSE) 文件。

其中包含部分 **个人非商用** 授权的字体文件 [方正小标宋](fonts/fzxbs.ttf) ，请遵循字体文件的[使用协议](https://www.foundertype.com/index.php/About/powerPer.html)。