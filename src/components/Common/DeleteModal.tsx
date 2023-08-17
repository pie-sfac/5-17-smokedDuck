import { Button, ButtonGroup, chakra } from '@chakra-ui/react';
import styled from '@emotion/styled';
import axios from 'axios';
import { Dispatch, SetStateAction, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { mutate as globalMutate } from 'swr';

import { deleteCategory } from '@/apis/Category';
import { deleteLink, LINK_URL } from '@/apis/Media';
import Modal from '@/components/Common/Modal';
import { SelectedIdContext } from '@/store/SelectedIdProvider';
import {
  GetLinkDetailResponse,
  GetLinkListResponse,
} from '@/types/media.interface';
import { RecordList } from '@/types/recordList.interface';
import useCategory from '@/utils/categoryData';
import { useRecord } from '@/utils/recordData';

type DeleteModalProps = {
  id: number | number[];
  setDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  text: string;
  categoryId?: number;
  setIsDeleteMode?: Dispatch<SetStateAction<boolean>>;
};

export default function DeleteModal({
  id,
  title,
  text,
  setDeleteModalOpen,
  categoryId,
  setIsDeleteMode,
}: DeleteModalProps) {
  const { pathname } = useLocation();

  const { selectedIds, setSelectedIds } = useContext(SelectedIdContext);
  const { recordListData, mutate } = useRecord();
  const { categoryListData, mutate: mutateCategory } = useCategory();

  const handleDeleteClick = async () => {
    if (pathname === '/record' && recordListData) {
      const newRecordList: RecordList = recordListData.filter(
        (item: { id: number }) => item.id !== id
      );

      await mutate(axios.delete(`record-templates/${Number(id)}`), {
        optimisticData: newRecordList,
        populateCache: false,
      });
    }

    if (pathname === '/media') {
      deleteLink(Number(id));
      globalMutate(
        LINK_URL,
        (data: GetLinkListResponse | undefined) => {
          const updatedArchiveLinks = [...(data?.archiveLinks || [])];

          return {
            archiveLinks: updatedArchiveLinks.filter(
              (archiveLink: GetLinkDetailResponse) => archiveLink.id !== id
            ),
            message: data?.message || '',
          };
        },
        false
      );
      if (categoryListData) {
        const pickedCategory = categoryListData.categories.find(
          item => item.id === categoryId
        );

        const pickedCategoryIndex = categoryListData.categories.findIndex(
          item => item.id === categoryId
        );

        if (pickedCategory && pickedCategoryIndex) {
          const newCategory = {
            ...pickedCategory,
            totalCount: pickedCategory.totalCount - 1,
          };

          categoryListData.categories.splice(
            pickedCategoryIndex,
            1,
            newCategory
          );

          mutateCategory(categoryListData, false);
        }
      }
    }

    if (pathname === '/category') {
      selectedIds.map((id: number) => deleteCategory(id));
      const updatedCategoryList = categoryListData?.categories.slice() || [];
      selectedIds.forEach(id => {
        const index = updatedCategoryList.findIndex(item => item.id === id);
        if (index !== -1) {
          updatedCategoryList.splice(index, 1);
        }
      });

      const updatedCategoryListData = {
        ...categoryListData!,
        categories: updatedCategoryList,
      };
      mutateCategory(updatedCategoryListData, false);
      if (setIsDeleteMode) {
        setIsDeleteMode(false);
      }
      setSelectedIds([]);
    }
    setDeleteModalOpen(false);
  };

  return (
    <Modal width={340} height={180} setIsOpen={setDeleteModalOpen}>
      {
        <DeleteContainer>
          <TitleArea>{title}</TitleArea>
          <TextArea>{text}</TextArea>
          <ButtonGroup gap="2">
            <GrayButton onClick={() => setDeleteModalOpen(false)}>
              {'취소'}
            </GrayButton>
            <BlueButton onClick={handleDeleteClick}>{'삭제'}</BlueButton>
          </ButtonGroup>
        </DeleteContainer>
      }
    </Modal>
  );
}

const DeleteContainer = styled.section`
  padding: 32px 20px 16px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleArea = styled.h4`
  margin-bottom: 8px;
  font-weight: 800;
`;

const TextArea = styled.div`
  font-size: 14px;
  margin-bottom: 20px;
  white-space: pre-line;
`;

const BlueButton = chakra(Button, {
  baseStyle: {
    width: '146px',
    height: '44px',
    border: 'none',
    background: '#2d62ea',
    color: '#ffffff',
  },
});
const GrayButton = chakra(Button, {
  baseStyle: {
    width: '146px',
    height: '44px',
    border: 'none',
    background: '#f4f4f4',
    color: '#000',
  },
});
