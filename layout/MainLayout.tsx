import React from 'react';
import { Container, Row, Col, Text, Button } from '@nextui-org/react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Container fluid>
        <Row>
            <Col span={12}>
            <div className="brand">Your Brand</div>
            </Col>
            <Col span={12}>
                <div className="header-buttons">
                    <Button auto size="sm" className="login-button">
                        Login
                    </Button>
                    <Button auto size="sm" className="register-button">
                        Register
                    </Button>
                </div>
            </Col>
        </Row>

        <Row className="layout-row">
        <Col span={18} className="main-content">
            {children}
        </Col>
        <Col span={3} className="sidebar">
            <nav>
                <ul>
                    <li>
                        <Text>
                        <a href="/">Home</a>
                        </Text>
                    </li>
                    <li>
                        <Text>
                        <a href="/videos">Videos</a>
                        </Text>
                    </li>
                    <li>
                        <Text>
                        <a href="/playlists">Playlists</a>
                        </Text>
                    </li>
                    {/* Add more menu items here */}
                </ul>
            </nav>
            </Col>
        </Row>


      <style jsx>{`
        .brand {
          display: inline-block;
          font-size: 24px;
          font-weight: bold;
          margin: 10px 0;
        }
        .auth-actions {
          text-align: right;
        }
        .auth-actions button {
          margin: 10px;
        }
        .sidebar {
          padding: 20px;
          background-color: #f1f1f1;
          height: 100vh;
          border-right: 1px solid #ddd;
        }
      `}</style>
    </Container>
  );
};

export default MainLayout;