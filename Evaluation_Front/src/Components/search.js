import React from 'react';
import 'antd/dist/antd.min.css'
import '../CSS/search.css';
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const { Search } = Input;

const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1890ff',
        }}
    />
);

const onSearch = value => console.log(value);

export default () => (
    <Space direction="vertical">
        <Search placeholder="请输入医生姓名" onSearch={onSearch} enterButton  size={"large"}
                style={{width:"300%"}}  />
    </Space>
);
