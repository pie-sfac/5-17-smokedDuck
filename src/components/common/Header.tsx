import { Avatar } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';

import Logo from '../../assests/Logo.svg';

const HeaderContainer = styled.header`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const HeaderCategoryList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
`;
const HeaderCategoryListItem = styled.li`
  padding: 0;
  margin-right: 56px;
  font-weight: 600;
  &:hover {
    color: #2d62ea;
  }
  cursor: pointer;
`;

const UserArea = styled.div`
  &::after {
    content: '';
    border: 1px solid #e7e7e7;
    margin: 0 8px;
  }

  &::before {
    content: '';
    border: 1px solid #e7e7e7;
    margin: 0 8px;
  }
`;

const PlanUser = styled.span`
  font-size: 10px;
  margin-left: 16px;
  color: #2d62ea;
`;

const LogoutArea = styled.button`
  border: none;
`;

const AvatarArea = styled.span`
  margin-right: 8px;
`;

export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const category: string[] = [
    '직원 관리',
    '수강권 관리',
    '기록 관리',
    '미디어 관리',
    '운영 데이터',
    '알림메시지',
    '센터 정보',
  ];
  const userName = '박관리자01';

  const handlePageMove = (index: number) => {
    if (index === 2) {
      navigate('/record');
    }

    if (index === 3) {
      navigate('/media');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (pathname === '/login') {
    return <></>;
  }

  return (
    <HeaderContainer>
      <img src={Logo} />
      <HeaderCategoryList>
        {category.map((item, index) => (
          <HeaderCategoryListItem
            key={index}
            onClick={() => handlePageMove(index)}
          >
            {item}
          </HeaderCategoryListItem>
        ))}
      </HeaderCategoryList>
      <UserArea>
        <AvatarArea>
          <Avatar src="https://bit.ly/broken-link" size="xs" />
        </AvatarArea>
        {userName}
        <PlanUser>플랜 이용중</PlanUser>
      </UserArea>
      <LogoutArea onClick={handleLogout}>로그아웃</LogoutArea>
    </HeaderContainer>
  );
}
