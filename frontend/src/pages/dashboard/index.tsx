import { PageContainer } from '@ant-design/pro-components';
import { Card, Col, Empty, Row, Statistic, Tag, Typography } from 'antd';
import React from 'react';

const { Paragraph } = Typography;

/**
 * 总览页（占位）
 *
 * P0 阶段只保留页面骨架，数值全部显示占位符 —— 不填假数据，
 * 避免「没数据」和「数值为 0」被混为一谈（见技术文档第四节第 2 条）。
 * 真实数据在 P2 接入 /api 后填充。
 */
const Dashboard: React.FC = () => {
  const placeholder = '--';

  const metrics = [
    { title: '账户总数', value: placeholder },
    { title: '总净值', value: placeholder },
    { title: '当日盈亏', value: placeholder },
    { title: '在线设备', value: placeholder },
  ];

  return (
    <PageContainer
      header={{ title: '总览' }}
      extra={<Tag color="default">未接入采集数据</Tag>}
    >
      <Row gutter={[16, 16]}>
        {metrics.map((item) => (
          <Col xs={24} sm={12} lg={6} key={item.title}>
            <Card variant="borderless">
              <Statistic title={item.title} value={item.value} />
            </Card>
          </Col>
        ))}
      </Row>

      <Card variant="borderless" style={{ marginTop: 16 }}>
        <Empty
          description={
            <Paragraph type="secondary" style={{ marginBottom: 0 }}>
              尚无采集器上报数据。Windows 采集器接入后，这里将展示账户净值曲线、
              当日盈亏与风险告警。
            </Paragraph>
          }
        />
      </Card>
    </PageContainer>
  );
};

export default Dashboard;
