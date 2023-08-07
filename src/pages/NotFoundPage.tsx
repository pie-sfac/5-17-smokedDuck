import styled from '@emotion/styled';

import Logo from '../assets/Logo.svg';

export default function NotFoundPage() {
  return (
    <NotFoundContainer>
      <Title>404</Title>
      <Content>원하시는 페이지를 찾을 수 없습니다. </Content>
    </NotFoundContainer>
  );
}
const NotFoundContainer = styled('div')`
  margin-top: 130px;
  text-align: center;
`;

const Title = styled('div')`
  font-size: 170px;
  color: #6691ff;
  font-weight: 800;
`;

const Content = styled('p')`
  font-size: 24px;
  color: #737373;
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 46%;
    width: 1400px;
    height: 500px;
    background: url(${Logo});
    background-repeat: no-repeat;
    background-size: 1400px;
    opacity: 0.2;
  }
`;
