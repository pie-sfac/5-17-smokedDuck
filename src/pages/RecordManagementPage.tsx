import { Button, chakra } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Modal from 'components/common/Modal';
import RecordCard from 'components/RecordCard';
import { useState } from 'react';
import { recordList } from 'utils/constants/recordList';

export default function RecordManagementPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <PageContainer>
      <PageTitle>기록 템플릿</PageTitle>
      <span>{`문진(00)`}</span>
      <span>{`처치(00)`}</span>

      <ListBackGround>
        <ListContainer>
          {recordList.map(item => (
            <RecordCard title={item.title} key={item.id} id={item.id} />
          ))}
        </ListContainer>
      </ListBackGround>

      <BlueButton onClick={() => setIsOpen(true)}>+ 템플릿 추가</BlueButton>
      {isOpen && (
        <Modal
          width={700}
          height={400}
          title={'템플릿 생성'}
          setIsOpen={setIsOpen}
        >
          {}
        </Modal>
      )}
    </PageContainer>
  );
}

const BlueButton = chakra(Button, {
  baseStyle: {
    width: '146px',
    height: '44px',
    border: 'none',
    background: '#2d62ea',
    color: '#ffffff',
    position: 'absolute',
    bottom: '-3.5rem',
    right: '0',
  },
});

const PageTitle = styled.span`
  font-size: 20px;
  font-weight: 800;
  display: block;
  margin: 2rem 0;
`;

const PageContainer = styled.div`
  margin-top: 2rem;
  position: relative;
`;

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;
  overflow: hidden;
  height: calc(696px - 6rem);
`;

const ListBackGround = styled.div`
  height: 696px;
  background-color: rgba(235, 241, 255, 0.8);
  border-radius: 10px;
  padding: 3rem 6rem;
  margin-top: 1rem;
  border: 1px solid #e7e7e7;
`;
