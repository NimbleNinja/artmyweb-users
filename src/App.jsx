import { Layout, Typography } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Users from './features/users/components/Users';
import UsersLink from './features/users/components/UsersLink';
import './styles/app.scss';
import EditUser from './features/users/components/EditUser';

const { Title } = Typography;

function App() {
  return (
    <HashRouter>
      <Layout className="app">
        <Header className="header">
          <Typography>
            <Title className="header__title">ArtMyWeb</Title>
          </Typography>
        </Header>
        <Content style={{ paddingBottom: '20px' }} className="content">
          <Routes>
            <Route path="/" element={<UsersLink />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:userId" element={<EditUser />} />
            <Route path="/*" element={<p>error page</p>} />
          </Routes>
        </Content>
      </Layout>
    </HashRouter>
  );
}

export default App;
