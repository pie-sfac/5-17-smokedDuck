import { useMediaQuery } from '@chakra-ui/media-query';
import styled from '@emotion/styled';
import { useContext, useState } from 'react';

import Textline from '@/assets/Textline.svg';
import DeleteModal from '@/components/Common/DeleteModal';
import EditBox from '@/components/Common/EditBox';
import Modal from '@/components/Common/Modal';
import RecordInfo from '@/components/Record/RecordInfo';
import { RecordContext } from '@/store/RecordProvider';
import { TemplateContext } from '@/store/TemplateProvider';

type RecordCardProps = {
  title: string;
  id: number;
};

export default function RecordCard({ title, id }: RecordCardProps) {
  const [isSmallScreen] = useMediaQuery('(min-height: 800px)');
  const { setSeletedRecordCardId, setIsRecordEdit, setSelectedRecordCard } =
    useContext(RecordContext);
  const { setSelectedTemplateTitle } = useContext(TemplateContext);
  const [recordTemplateOpen, setRecordTemplateOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const cardClickHandler = () => {
    setRecordTemplateOpen(true);
    setSeletedRecordCardId(id);
    setIsRecordEdit(false);
  };

  const saveHandler = () => {
    setTimeout(() => {
      setEditModalOpen(false);
      setSelectedTemplateTitle('');
      setSelectedRecordCard(undefined);
    }, 500);
  };

  return (
    <>
      <CardContainer onClick={cardClickHandler}>
        <CardTitle>{title}</CardTitle>
        <img src={Textline} style={{ height: '7rem', marginLeft: '1rem' }} />
        <EditBox
          top={0}
          right={13}
          id={id}
          onEditClick={() => {
            setEditModalOpen(true);
          }}
          onDeleteClick={() => {
            setDeleteModalOpen(true);
          }}
        />
      </CardContainer>
      {recordTemplateOpen && (
        <Modal
          setIsOpen={setRecordTemplateOpen}
          height={isSmallScreen ? 900 : undefined}
        >
          <RecordInfo id={id} isEditing={false} />
        </Modal>
      )}
      {editModalOpen && (
        <Modal
          setIsOpen={setEditModalOpen}
          height={isSmallScreen ? 900 : undefined}
          showConfirmationAlert={true}
        >
          <RecordInfo id={id} isEditing={true} saveHandler={saveHandler} />
        </Modal>
      )}
      {deleteModalOpen && (
        <DeleteModal
          title={'템플릿 삭제'}
          text={'템플릿을 삭제하시겠습니까?'}
          id={id}
          setDeleteModalOpen={setDeleteModalOpen}
        />
      )}
    </>
  );
}

const CardContainer = styled.div`
  padding: 0.8rem;
  box-shadow: 0px 1px 5px -2px rgba(0, 0, 0, 0.75);
  cursor: pointer;
  background-color: #fff;
  border-radius: 10px;
  height: 19rem;
  position: relative;

  @media screen and (max-height: 965px) {
    height: 18rem;
    padding: 0.4rem;
    box-shadow: 0px 1px 3px -2px rgba(0, 0, 0, 0.75);
  }

  @media screen and (max-height: 860px) {
    height: 15rem;
  }
`;

const CardTitle = styled.h4`
  font-weight: 700;
  height: 74px;
  width: 10rem;
  margin-top: 2rem;
  margin-left: 1rem;
`;
