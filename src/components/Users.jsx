import { List, PageHeader, Pagination, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUsers } from '../users.gateway';
import styles from './users.module.css';

const { Option } = Select;

const Users = () => {
  const navigate = useNavigate();

  const [gender, setGender] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    getUsers().then(users => {
      console.log(users);
      setUsersList(users);
    });
  }, []);

  const filteredUsers = gender
    ? usersList.filter(user => user.gender === gender)
    : usersList;

  const startIndex = pageSize * (currentPage - 1);
  const endIndex = startIndex + pageSize;
  const currentPageUsers = filteredUsers.slice(startIndex, endIndex);

  return (
    <div className={styles.users}>
      <PageHeader
        className='site-page-header'
        onBack={() => navigate('/')}
        title='Users'
      />
      <div className={styles.filter}>
        <span>Filter by gender: </span>
        <Select defaultValue={gender} onChange={option => setGender(option)}>
          <Option value='male'>male</Option>
          <Option value='female'>female</Option>
        </Select>
      </div>
      <List
        className={styles.list}
        itemLayout='horizontal'
        dataSource={currentPageUsers}
        renderItem={user => (
          <List.Item
            className={styles['list-item']}
            actions={[<Link to={`/users/${user.id}`}>edit</Link>]}>
            <List.Item.Meta title={user.name} description={user.email} />
            <div className={styles.status}>{user.status}</div>
            <div>{user.gender}</div>
          </List.Item>
        )}
      />
      <Pagination
        current={currentPage}
        total={filteredUsers.length}
        pageSize={pageSize}
        pageSizeOptions={[5, 10, 15, 20, 50]}
        onChange={page => setCurrentPage(page)}
        onShowSizeChange={(_, size) => setPageSize(size)}
        showSizeChanger
      />
    </div>
  );
};

export default Users;
