import styled from '@emotion/styled';

export default function NotFoundPage() {
  return (
    <NotFoundContainer>
      <Title>404</Title>
      <Content>원하시는 페이지를 찾을 수 없습니다. </Content>
    </NotFoundContainer>
  );
}
const NotFoundContainer = styled('div')`
  margin-top: 230px;
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
`;
