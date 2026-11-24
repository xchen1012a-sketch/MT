# MT 项目 AI 入口

本文件只提供阅读导航，不记录项目进度，不重复维护 SSOT 规则。

## 阅读顺序

1. 先读 [README.md](README.md)，了解项目范围和模块划分。
2. 读取对应模块的 `SSOT.md` 总则，再按下表读取任务涉及的专题规范。
3. 再按需阅读对应模块的 README 和已有业务文档。

## 模块导航

| 任务范围 | 必读规范 | 补充说明 |
| --- | --- | --- |
| 前端请求对接 | [总则](<frontend/.ai-spec/SSOT.md>)、[API 客户端](<frontend/.ai-spec/api-client.md>) | 同时读后端 API 契约 |
| 前端登录权限 | [登录会话](<frontend/.ai-spec/auth-session.md>) | 同时读后端认证规范 |
| 前端数据与页面 | [数据展示](<frontend/.ai-spec/data-display.md>)、[页面组件](<frontend/.ai-spec/ui-structure.md>) | [前端 README](frontend/README.zh-CN.md) |
| 前端工程与验证 | [工程规范](<frontend/.ai-spec/engineering.md>) | [前端入口](frontend/CLAUDE.md) |
| 后端 HTTP 接口 | [总则](<backend/.ai-spec/SSOT.md>)、[API 契约](<backend/.ai-spec/api-contract.md>) | [后端 README](backend/README.md) |
| 后端认证与权限 | [认证安全](<backend/.ai-spec/auth-security.md>) | 前端涉及会话时同时阅读 |
| 数据建模与财务计算 | [数据库存储](<backend/.ai-spec/database-storage.md>)、[数据语义](<backend/.ai-spec/data-semantics.md>) | 前端不得另行定义同一字段格式 |
| 采集器与后端接收 | [采集接收](<backend/.ai-spec/ingestion.md>)、数据语义、认证安全 | [采集器 README](collector/README.md) |
| 后端工程与验证 | [工程规范](<backend/.ai-spec/engineering.md>) | 涉及数据库时还读存储规范 |
| 部署或集成测试 | 读取受影响模块的专题规范 | [部署 README](deploy/README.md)、[测试 README](tests/README.md) |

## 使用边界

- 两份 `SSOT.md` 是同一套六条总则，修改时同步；专题按职责分别维护，共享契约引用后端定义，不复制一套到前端。
- `.ai-spec` 内只平铺专题 Markdown，不放进度、任务清单、文件台账或具体业务接口与数据库表的清单；导航集中在本文件。
- 规范定义开发约束，不代表功能已经实现。代码不符合规范时指出差异并按冲突规则处理，不把旧实现自动当作新规则。
- 上游示例与实际项目配置不同，以 MT 规范和明确确认的契约为开发依据；不能照搬演示响应格式、公开 API 地址或旧测试命令。
- 开发前读取相关路由、模型和配置核实上下文；缺少具体业务定义时先明确，不自行补造公式、状态阈值、精度或接口。
- `vendor/` 为只读上游参考，不直接参与构建。
