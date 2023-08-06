import { SkeletonText } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useContext, useState } from 'react';

import DeleteModalContainer from '@/components/Common/DeleteModal';
import EditBox from '@/components/Common/EditBox';
import Modal from '@/components/Common/Modal';
import RecordDetailTemplate from '@/components/Template/RecordDetailTemplate';
import { MainContext } from '@/store';

// import useRecordDetail from '@/hooks/useRecordDetail';
// import { recordDetailType } from '@/types/recordDetail.interface';
// import Template from '../Template';

// import useRecordDetail from '@/hooks/useRecordDetail';
// import { recordDetailType } from '@/types/recordDetail.interface';
// import Template from '../Template';

type RecordCardPropsType = {
  title: string;
  id: number;
};

export default function RecordCard({ title, id }: RecordCardPropsType) {
  const {
    setSeletedRecordCardId,
    setIsRecordEdit,
    // setSelectedTemplateTitle,
    // setSelectedRecordCard,
  } = useContext(MainContext);
  const [recordTemplateOpen, setRecordTemplateOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const cardClickHandler = () => {
    setRecordTemplateOpen(true);
    setSeletedRecordCardId(id);
    setIsRecordEdit(false);
  };

  // const { recordDetailData } = useRecordDetail(id);

  // const handleClickedEditButton = () => {
  //   setIsRecordEdit(true);
  //   setEditModalOpen(true);
  //   setSelectedTemplateTitle(
  //     recordDetailData?.category === 'INTERVIEW' ? '문진 템플릿' : '처치 템플릿'
  //   );
  //   const previousTemplateContent: recordDetailType = {
  //     id: recordDetailData!.id,
  //     category: recordDetailData!.category,
  //     title: recordDetailData!.title,
  //     description: recordDetailData?.description,
  //     questions: recordDetailData!.questions,
  //     createdAt: recordDetailData!.createdAt,
  //     updatedAt: recordDetailData!.updatedAt,
  //     message: recordDetailData?.message,
  //   };
  //   setSelectedRecordCard(previousTemplateContent);
  // };

  return (
    <>
      <CardContainer onClick={cardClickHandler}>
        <CardTitle>{title}</CardTitle>
        <LineArea>
          <SkeletonText mt="8" noOfLines={4} spacing="4" skeletonHeight={2} />
        </LineArea>
        <EditBox
          top={0}
          right={13}
          id={id}
          // onEditClick={() => {
          //   handleClickedEditButton();
          // }}
          onDeleteClick={() => {
            setDeleteModalOpen(true);
          }}
        />
      </CardContainer>
      {recordTemplateOpen && (
        <Modal setIsOpen={setRecordTemplateOpen}>
          <RecordDetailTemplate />
        </Modal>
      )}
      {editModalOpen && (
        <Modal setIsOpen={setEditModalOpen}>
          <RecordDetailTemplate />
        </Modal>
      )}
      {deleteModalOpen && (
        <DeleteModalContainer
          title={'템플릿 삭제'}
          text={'템플릿을 삭제하시겠습니까?'}
          id={id}
          setDeleteModalOpen={setDeleteModalOpen}
        />
      )}
    </>
  );
}

const LineArea = styled.div`
  width: 7rem;
  height: 7rem;
`;

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
`;
