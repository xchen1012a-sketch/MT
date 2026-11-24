# 认证与权限规范

本规范沿用底座的 JWT Bearer 用户认证，设备认证与用户认证分别设计。

## 用户认证协议

- 登录：`POST /api/v1/login/access-token`，使用 `application/x-www-form-urlencoded`，字段为 `username`、`password`；`username` 的业务含义是用户邮箱。
- 登录成功直接返回 `{"access_token": "...", "token_type": "bearer"}`，不是模板的 `{status: "ok"}`。
- 受保护接口使用 `Authorization: Bearer <access_token>`；当前用户通过 `GET /api/v1/users/me` 获取。
- 用户公开字段沿用 `id`、`email`、`full_name`、`is_active`、`is_superuser`、`created_at`，不得要求前端提交 `access: "admin"` 证明权限。
- JWT 校验签名、有效期及用户状态；密钥由环境配置提供，不写入仓库。

## 错误与权限

- 沿用底座兼容行为：缺少 Bearer 凭据由安全依赖返回 401；无效或过期 token 返回 403；登录失败或停用账户可返回 400。已有用户查找失败可返回 404。
- 不将所有 403 解释为登录失效；权限不足同样使用 403。若统一认证错误码，必须同步修改服务端契约、客户端识别和测试。
- 业务路由必须在服务端检查用户身份、角色及资源访问范围；隐藏前端按钮不能替代后端授权。
- 更新自身资料与管理员更新采用不同输入模型；普通用户不得通过额外字段提升角色。
- 只读监控禁止的是交易执行；用户管理、设备配对、告警确认等经授权的管理操作仍可写入系统。

## 凭据边界

- 用户密码只存哈希，公开接口不得返回密码或哈希；不得把底座发送明文密码邮件的示例作为新增业务的规则。
- 不上传 MT5 交易密码；设备配对密钥不能复用用户 token，须支持撤销与轮换。
- `/private` 测试辅助路由仅在显式开发环境启用，生产环境不得开放。
- 公网通信使用 HTTPS；CORS 使用明确配置的前端来源，不能用放开 CORS 替代认证。
- 日志、异常、诊断及通知不得泄露密码、Bearer token、签名密钥或数据库凭据。

协议依据：[FastAPI OAuth2 表单与 Bearer](https://fastapi.tiangolo.com/tutorial/security/simple-oauth2/)。项目采用的状态码以本规范和实际路由契约为准。
