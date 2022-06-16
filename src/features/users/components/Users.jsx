import { PageHeader, Pagination, Select, Space, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUsers } from '../users.gateway';

const { Option } = Select;

const Users = () => {
  const navigate = useNavigate();

  const [gender, setGender] = useState('all');
  const [usersList, setUsersList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUsers(currentPage).then(({ users, totalItems }) => {
      setUsersList(users);
      setTotalItems(totalItems);
      setIsLoading(false);
    });
  }, [currentPage]);

  const filteredUsers =
    gender === 'all'
      ? usersList
      : usersList.filter(user => user.gender === gender);

  return (
    <div>
      <PageHeader
        className="site-page-header"
        onBack={() => navigate('/')}
        title="Users"
      />
      <Space direction="vertical" size="middle">
        <Space size="large">
          <span>Filter by gender </span>
          <Select defaultValue={gender} onChange={option => setGender(option)}>
            <Option value="all">all</Option>
            <Option value="male">male</Option>
            <Option value="female">female</Option>
          </Select>
        </Space>

        <Table
          dataSource={filteredUsers}
          pagination={false}
          rowKey={user => user.id}
          loading={isLoading}
        >
          <Column title="Name" dataIndex="name" key="name" />
          <Column title="Email" dataIndex="email" key="email" />
          <Column title="Gender" dataIndex="gender" key="gender" />
          <Column title="Status" dataIndex="status" key="status" />
          <Column
            title="Action"
            key="status"
            render={(_, { id }) => <Link to={`/users/${id}`}>Edit</Link>}
          />
        </Table>

        <Pagination
          current={currentPage}
          total={totalItems}
          onChange={page => setCurrentPage(page)}
          pageSize={20}
          showSizeChanger={false}
        />
      </Space>
    </div>
  );
};

export default Users;
