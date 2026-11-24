# 上游开源底座记录（UPSTREAM）

本文件用于记录引入的第三方开源底座，满足技术文档第六节「仅从官方仓库获取源码、保留许可证与版权声明、固定验收版本」的要求。

各底座的完整源代码快照已平铺到本仓库对应目录，`vendor/` 下保留原始仓库副本（含历史）以便对照与升级评估。

## 快照清单

| 项目 | 落地位置 | 上游仓库 | 版本 | Commit | 拉取日期 | 许可证 |
| --- | --- | --- | --- | --- | --- | --- |
| Ant Design Pro | `frontend/` | https://github.com/ant-design/ant-design-pro | v6.0.3 | `c70e0d89` | 2026-11-24 | MIT |
| Full Stack FastAPI Template | `backend/`（仅 `backend/` 子目录） | https://github.com/fastapi/full-stack-fastapi-template | 0.12.0 | `77e550a` | 2026-11-24 | MIT |
| Apache ECharts | `vendor/echarts/` | https://github.com/apache/echarts | 6.1.0 | `34f4d927e` | 2026-11-24 | Apache-2.0 |
| MetaTrader5 Python 包 | 仅依赖，不入库 | PyPI `MetaTrader5`（官方 MQL5 发布） | 待 P1 锁定 | - | - | 见包内声明 |

## 使用约束

1. **不追踪上游主分支。** 升级时先在独立分支验证，通过后更新本表并提交。
2. **保留许可证与版权声明。** `frontend/LICENSE`、`backend/LICENSE`、`vendor/echarts/LICENSE` 不得删除或修改。
3. `vendor/` 只作源码参考与许可证留存，**不参与构建**；业务实际依赖走 npm 包（ECharts）与 Python 包（MetaTrader5）。
4. 依赖锁文件与漏洞扫描在 P0 验收时补齐。
5. 各目录存的是**源码快照**（不含 `.git`），避免与主仓库形成嵌套仓库。需要历史时按上表 commit 从上游检出，或改造成 git submodule。

## 已做的裁剪

- FastAPI 模板：只取 `backend/`，模板自带的 React `frontend/`、根级 compose 与 CI 配置均未引入。
- 模板根级 `uv.lock` 为工作区模式产物，暂存为 `backend/uv.lock.upstream` 供参考，独立化后需重新 `uv lock` 生成正式锁文件。
- Ant Design Pro：保留完整脚手架（含 mock、e2e、config），业务裁剪在后续迭代进行。
