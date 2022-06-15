import { Form, Button, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { getUserById, updateUser } from '../users.gateway';
import 'react-toastify/dist/ReactToastify.css';

const { Option } = Select;

const EditUser = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    getUserById(userId).then(userData => {
      setUser(userData);
    });
  }, [userId]);

  const fields = [
    { name: ['name'], value: user.name },
    { name: ['email'], value: user.email },
    { name: ['gender'], value: user.gender },
    { name: ['status'], value: user.status },
  ];

  const onFinishHandler = userData => {
    toast
      .promise(updateUser(user.id, userData), {
        pending: {
          render() {
            return 'Loading...';
          },
          icon: false,
        },
        success: {
          render({ data }) {
            return `User ${data.id} was updated!`;
          },
        },
        error: {
          render({ data }) {
            return data.message;
          },
        },
      })
      .then(() => {
        setTimeout(() => {
          navigate('/users');
        }, 2000);
      });
  };

  return (
    <>
      <ToastContainer autoClose={2000} pauseOnFocusLoss={false} />
      <Form
        style={{ alignSelf: 'center' }}
        name='basic'
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        fields={fields}
        onFinish={onFinishHandler}>
        <Form.Item
          label='Name'
          name='name'
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label='Email'
          name='email'
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item label='Gender' name='gender'>
          <Select>
            <Option value='male' />
            <Option value='female' />
          </Select>
        </Form.Item>

        <Form.Item label='Status' name='status'>
          <Select>
            <Option value='active' />
            <Option value='inactive' />
          </Select>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}>
          <Button type='primary' htmlType='submit'>
            Update
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditUser;
