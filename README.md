# MT5 多终端中控台

多账户 MT5 监控系统。**只读监控**，不含下单 / 平仓 / 改单能力。

技术方案见 [docs/MT5中控台技术栈-v0.1.md](docs/MT5中控台技术栈-v0.1.md)。

## 目录结构

项目根目录即 `/Users/MT`，各子项目平铺。

```text
MT/
├── frontend/      # Ant Design Pro / React 19 / TypeScript（Umi Max）
├── backend/       # FastAPI / SQLModel / PostgreSQL
├── collector/     # Windows MT5 采集器（占位，待 P1）
├── deploy/        # Docker Compose / HTTPS 反向代理（占位）
├── docs/          # 架构、需求、API、运维与验收文档
├── tests/         # 跨模块集成与端到端测试（占位）
├── vendor/echarts # ECharts 源码与许可证留存（不参与构建）
├── .env           # 本地环境变量（不入库）
└── .env.example   # 环境变量模板（入库）
```

## 环境与依赖：全部在 MT 内部

所有解释器、依赖和缓存都落在本目录下，不往 `~` 或系统目录写东西。

| 内容 | 位置 |
| --- | --- |
| Python 解释器（3.14） | `.python/` |
| 后端虚拟环境 | `backend/.venv/` |
| uv 包缓存 | `.cache/uv/` |
| 前端依赖 | `frontend/node_modules/` |
| npm 缓存 | `.npm-cache/`（由 `frontend/.npmrc` 指定） |
| 环境变量 | `.env`（根目录，`backend/app/core/config.py` 读取 `../.env`） |

首次准备：

```bash
# 前端
cd frontend && npm install && npm run dev

# 后端（需要 PostgreSQL）
cd backend
UV_CACHE_DIR=/Users/MT/.cache/uv UV_PYTHON_INSTALL_DIR=/Users/MT/.python uv sync
.venv/bin/alembic upgrade head
.venv/bin/fastapi dev app/main.py     # http://localhost:8000/docs
```

> 建议把 `UV_CACHE_DIR`、`UV_PYTHON_INSTALL_DIR` 写进 shell 配置，避免 uv 把缓存写到 `~/.cache`。

## 相对上游做了哪些裁剪

上游三个底座都已按 P0 要求瘦身，只保留基础模块。

**前端（Ant Design Pro）** — 删掉全部示例业务页，源码从 45M 降到 888K：

| 删除 | 说明 |
| --- | --- |
| `pages/list`、`pages/table-list` | 查询表格 / 卡片列表 / 标准列表等示例列表 |
| `pages/form` | 基础 / 分步 / 高级表单示例 |
| `pages/profile`、`pages/account` | 详情页、个人中心、个人设置 |
| `pages/result`、`pages/chatbot`、`pages/Welcome`、`pages/Admin` | 结果页、AI 助手、欢迎页、二级管理页 |
| `pages/dashboard/*` | 分析页、监控页、工作台（换成单页总览骨架） |
| `components/*` | ArticleListContent、AvatarList、StandardFormRow、TagSelect、VersionDropdown、DocLink |
| `cloudflare-worker/`、`config/routes.simple.ts`、`scripts/simple.js` | 演示用 Worker 与简化脚本 |
| 依赖 | `@ant-design/plots`、`@ant-design/x*`、`d3`、`topojson-client`、`china-division`、`highlight.js` |

保留：登录 / 注册 / 注册结果、总览页、403 / 404 / 500，以及离线提示、错误边界、语言切换。

顺带处理：登录页去掉第三方（支付宝 / 淘宝 / 微博）登录和手机号验证码 Tab、去掉阿里 CDN 外链背景图与装饰图，标题改为「MT5 中控台」，保证内网离线可正常渲染。

**后端（FastAPI 模板）** — 删掉示例业务模块：

- `Item` 全链路：模型、`/items` 路由、CRUD、测试、`user` 表的级联删除逻辑。
- 5 个历史迁移合并为单个 `0001_initial_user.py`，只建 `user` 表。
- 移除模板自带的 React 静态托管（`app.frontend("/")`），前端独立部署。
- 保留：User 模型、JWT 登录、注册、密码找回、超管权限、健康检查。

**ECharts（vendor）** — 98M 降到 5.9M，只留 `src/`、`LICENSE`、`NOTICE`、`README.md`、`package.json`、`index.d.ts`、`tsconfig.json`、`licenses/`。

## 验收状态（P0）

| 项 | 结果 |
| --- | --- |
| 前端 `tsc --noEmit` | 通过 |
| 前端 `npm run build` | 通过，产物 2.4M，仅 login / dashboard / exception 页面 |
| 后端依赖安装 | 通过（Python 3.14.4，venv 在 MT 内） |
| 后端应用导入 / OpenAPI | 通过，13 个接口，`/items` 已消失 |
| 后端迁移 SQL | `alembic upgrade head --sql` 通过，只创建 `user` 表 |
| 后端 `ruff check` | 通过 |
| 后端测试 / 登录联调 | **未验证**，本机没有 PostgreSQL，且 Docker 不可用 |

## 待办

1. 起一个 PostgreSQL（`deploy/` 里放 compose），跑 `alembic upgrade head` + `pytest`，完成登录闭环。
2. 前端把 `config/config.ts` 的 `openAPI` 指向 `http://localhost:8000/api/v1/openapi.json`，用真实接口替换 mock。
3. `collector/`、`deploy/`、`tests/` 仍是占位，待 P1 采集验证后填充。
