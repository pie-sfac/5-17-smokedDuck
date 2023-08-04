import { Avatar } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { onSlientRefresh } from '@/apis/Login';
import Logo from '@/assets/Logo.svg';
import { category, userName } from '@/utils/constants/header';
import { categoryType } from '@/utils/constants/header';

export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [clickedIdNum, setClickedIdNum] = useState<number>(2);

  useEffect(() => {
    if (!localStorage.getItem('refreshToken')) {
      navigate('/');
    } else {
      onSlientRefresh();
    }
  }, [navigate]);

  const handlePageMove = (item: categoryType) => {
    if (item.id === 2 || item.id === 3) {
      navigate(`${item.name}`);
      setClickedIdNum(item.id);
    }
  };

  const handleLogout = useCallback(() => {
    localStorage.clear();
    navigate('/');
    setClickedIdNum(2);
  }, [navigate]);

  if (pathname === '/') {
    return null;
  }

  return (
    <HeaderContainer>
      <img src={Logo} />
      <HeaderCategoryList>
        {category.map(item => (
          <HeaderCategoryListItem
            key={item.id}
            onClick={() => handlePageMove(item)}
            className={item.id === clickedIdNum ? 'active' : ''}
          >
            {item.text}
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
const HeaderContainer = styled.header`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 2px solid rgba(231, 231, 231, 40%);
`;
const HeaderCategoryList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  .active {
    color: #2d62ea;
  }
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
