import { PageHeader, Select, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUsers } from '../users.gateway';
import styles from './users.module.css';

const { Option } = Select;

const Users = () => {
  const navigate = useNavigate();

  const [gender, setGender] = useState('all');
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    getUsers().then(users => {
      setUsersList(users);
    });
  }, []);

  const filteredUsers =
    gender === 'all'
      ? usersList
      : usersList.filter(user => user.gender === gender);

  return (
    <div className={styles.users}>
      <PageHeader
        className='site-page-header'
        onBack={() => navigate('/')}
        title='Users'
      />
      <div>
        <span>Filter by gender: </span>
        <Select defaultValue={gender} onChange={option => setGender(option)}>
          <Option value='male'>male</Option>
          <Option value='female'>female</Option>
        </Select>
      </div>
      <Table dataSource={filteredUsers} pagination={{ pageSize: 6 }}>
        <Column title='Name' dataIndex='name' key='name' />
        <Column title='Email' dataIndex='email' key='email' />
        <Column title='Gender' dataIndex='gender' key='gender' />
        <Column title='Status' dataIndex='status' key='status' />
        <Column
          title='Action'
          key='status'
          render={(_, { id }) => <Link to={`/users/${id}`}>Edit</Link>}
        />
      </Table>
    </div>
  );
};

export default Users;
