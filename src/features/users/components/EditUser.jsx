import { Form, Button, Input, Select, Space } from 'antd';
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
  const [isActiveButton, setIsActiveButton] = useState(true);

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
            setIsActiveButton(false);
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
        }, 3000);
      });
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        pauseOnFocusLoss={false}
      />
      <Form
        style={{ alignSelf: 'center' }}
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        fields={fields}
        onFinish={onFinishHandler}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Gender" name="gender">
          <Select>
            <Option value="male" />
            <Option value="female" />
          </Select>
        </Form.Item>

        <Form.Item label="Status" name="status">
          <Select>
            <Option value="active" />
            <Option value="inactive" />
          </Select>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 16,
          }}
        >
          <Space>
            <Button onClick={() => navigate('/users')}>Cancel</Button>
            <Button type="primary" htmlType="submit" disabled={!isActiveButton}>
              Update
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditUser;
