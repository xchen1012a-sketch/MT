# API 客户端规范

接口的权威规则见[后端 API 契约](<../../backend/.ai-spec/api-contract.md>)，本规范只定义前端如何调用与适配。

## 请求与类型

- 统一使用 `@umijs/max` 的 `request` 和全局请求配置；不在组件中另建绕过认证、错误处理的 fetch/axios 调用链。
- 请求放入服务层，页面只消费类型明确的结果；通用资源调用复用服务，页面专用调用可就近组织。
- 后端 OpenAPI 是字段与类型依据；配置生成器时只接 MT 后端 `/api/v1/openapi.json`，禁止从 Ant Design Pro 演示 schema 生成 MT 类型。
- `npm run openapi` 只有在生成来源和输出目录明确后才执行；生成代码不手工改业务逻辑，适配逻辑放在生成目录外。
- API 层保留 `snake_case` 原名；若页面需要视图模型，在明确的转换函数中映射，不全局递归改名。
- 实际后端地址从统一环境配置或同源反向代理确定；正式请求不得发往模板公共演示服务。开发代理不等于生产部署配置。

## 响应与分页适配

- `request` 默认取后端响应体，不把 Axios 的响应对象与业务对象混淆；需要状态或响应头时显式取完整响应。
- 单资源直接消费对象，列表消费 `{data, count}`；不能要求所有成功响应都有 `success: true`。
- 全局错误配置必须匹配 FastAPI 契约；不能沿用 `if (!success)` 将合法响应判为业务失败。
- 使用 ProTable 时，边界转换为 `skip=(current-1)*pageSize`、`limit=pageSize`，结果适配为 `{data, total: count, success: true}`；这里的 `success` 只服务组件，不改变后端协议。
- 使用 `useRequest` 时核对 `dataField` 行为，单对象和列表按契约取值，避免隐式拆包丢失字段。
- 新增 Mock 使用相同路径、HTTP 方法、字段与状态码，不能继续使用演示登录格式证明 MT 对接成立。

## 错误处理

- 解析 FastAPI 的 `detail`：字符串用于一般提示，422 数组按 `loc` 映射字段或汇总可读信息；不直接渲染对象。
- 请求错误由统一层或页面指定一处提示；使用 `skipErrorHandler` 时页面必须承担处理责任，避免重复提示。
- 网络失败、业务拒绝和认证失败分别处理；重试不得把失败写操作自动重复提交。

行为依据：[Umi Max 请求文档](https://umijs.org/docs/max/request)。认证判断遵守本目录的登录会话规范。
