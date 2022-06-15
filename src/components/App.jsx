import { Layout, Typography } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Users from './Users';
import UsersLink from './UsersLink';
import './app.css';
import EditUser from './EditUser';

const { Title } = Typography;

function App() {
  return (
    <BrowserRouter>
      <Layout className='app'>
        <Header className='header'>
          <Typography>
            <Title className='title'>ArtMyWeb</Title>
          </Typography>
        </Header>
        <Content className='content'>
          <Routes>
            <Route path='/' element={<UsersLink />} />
            <Route path='/users' element={<Users />} />
            <Route path='/users/:userId' element={<EditUser />} />
            <Route path='/*' element={<p>error page</p>} />
          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
