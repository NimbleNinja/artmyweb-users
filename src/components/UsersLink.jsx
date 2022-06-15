import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './users-link.module.css';

const UsersLink = () => {
  return (
    <Link className={styles.link} to='users'>
      <Button block type='primary'>
        USERS
      </Button>
    </Link>
  );
};

export default UsersLink;
