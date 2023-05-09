import React from 'react';
import { Avatar, Button, Col, Row, Spacer, Text } from '@nextui-org/react';
import { FaTrophy, FaUser } from 'react-icons/fa';

interface UserCardProps {
  isLoggedIn?: boolean;
  nickname?: string;
  avatarUrl?: string;
}

const UserCard: React.FC<UserCardProps> = ({ isLoggedIn, nickname, avatarUrl }) => {
  return (
    <div>
      <Row align="center" justify="space-between">
        <Text>{isLoggedIn && nickname}</Text>
        {isLoggedIn && (
          <Avatar
            src={avatarUrl}
            alt="User Avatar"
            size="lg"
            text={nickname?.[0]}
          />
        )}
      </Row>
      <Spacer y={1} />
      <Row align="center" justify="flex-start">
        <FaUser />
        <Spacer x={0.5} />
        <Text>Profile</Text>
      </Row>
      <Spacer y={0.5} />
      <Row align="center" justify="flex-start">
        <FaTrophy />
        <Spacer x={0.5} />
        <Text>Achievements</Text>
      </Row>
      <Spacer y={1} />
      <Col>
        <Button style={{ width: '100%' }} size="md">
          Login
        </Button>
        <Spacer y={0.5} />
        <Button style={{ width: '100%' }} size="md">
          Register
        </Button>
      </Col>
    </div>
  );
};

export default UserCard;
