# MT5 多终端中控台

多账户 MT5 监控系统。**只读监控**，不含下单 / 平仓 / 改单能力。

技术方案见 [docs/MT5中控台技术栈-v0.1.md](docs/MT5中控台技术栈-v0.1.md)。

## 目录结构

项目根目录即 `/Users/MT`，各子项目平铺，不再套外层目录。

```text
MT/
├── frontend/      # Ant Design Pro / React / TypeScript / ECharts 业务前端
├── backend/       # FastAPI / SQLModel / PostgreSQL（基于 full-stack-fastapi-template 的 backend/）
├── collector/     # Windows MT5 采集器（自研，依赖 MetaTrader5 官方 Python 包）
├── deploy/        # Docker Compose / HTTPS 反向代理 / 环境配置
├── docs/          # 架构、需求、API、运维与验收文档
├── tests/         # 跨模块集成与端到端测试
└── vendor/        # 上游开源底座原始副本（只读参考，不直接参与构建）
```

## 开源底座与版本

| 目录 | 上游仓库 | 许可证 |
| --- | --- | --- |
| `frontend/` | [ant-design/ant-design-pro](https://github.com/ant-design/ant-design-pro) | MIT |
| `backend/` | [fastapi/full-stack-fastapi-template](https://github.com/fastapi/full-stack-fastapi-template)（仅 `backend/`） | MIT |
| `vendor/echarts/` | [apache/echarts](https://github.com/apache/echarts) | Apache-2.0 |

上游源码快照的 commit、拉取时间和许可证信息记录在 [UPSTREAM.md](UPSTREAM.md)。业务依赖 ECharts 时通过 npm 包引入，`vendor/echarts` 仅作源码参考与许可证留存。

## 整合原则

- 只用 Ant Design Pro 作为前端底座；**不使用** FastAPI 模板自带的 React 前端（`backend/` 已剔除，模板原 `frontend/` 未引入）。
- 后端从模板的 `backend/` 提取，重新对接登录状态、权限与 API 类型。
- 固定经过验收的版本（见 `UPSTREAM.md`），不追踪上游主分支。
- 采集链路：Windows 多开 MT5 → 本地 Collector → HTTPS → 云端 Backend → PostgreSQL → 前端 Web。

## 当前状态

P0 技术底座：目录骨架与三个上游底座已落地，尚未做裁剪、依赖安装和业务开发。

已知待办：

1. `backend/` 的依赖锁文件为上游工作区版本（`uv.lock.upstream`），需在独立化后重新 `uv lock`。
2. `frontend/` 仍是 Ant Design Pro 官方脚手架原始状态，需按业务删减示例页面并接入后端 API。
3. `collector/`、`deploy/`、`tests/` 仅有占位说明，待 P1 采集验证后填充。
