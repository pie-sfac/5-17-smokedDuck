import axios from 'axios';
import { Dispatch, SetStateAction, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import DeleteModal from '@/components/Common/DeleteModal/DeleteModal';
import useRecord from '@/hooks/useRecord';
import { MainContext } from '@/store';
import { recordListType } from '@/types/recordList.interface';

type DeleteModalPropsType = {
  id: number;
  setDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
};
const baseUrl = import.meta.env.VITE_BASE_URL as string;

export default function DeleteModalContainer({
  id,
  setDeleteModalOpen,
}: DeleteModalPropsType) {
  const { deleteMediaItem } = useContext(MainContext);

  const { pathname } = useLocation();

  const { loginToken } = useContext(MainContext);
  const { recordListData, mutate } = useRecord();

  const handleDeleteClick = async () => {
    const headers = {
      Authorization: `Bearer ${loginToken.accessToken}`,
      'Content-Type': 'application/json',
    };

    if (pathname === '/record' && recordListData) {
      const newRecordList: recordListType = recordListData.filter(
        (item: { id: number }) => item.id !== id
      );

      await mutate(
        axios.delete(`${baseUrl}/record-templates/${id}`, { headers }),
        {
          optimisticData: newRecordList,
          populateCache: false,
        }
      );
    }

    if (pathname === '/media') {
      deleteMediaItem(id);
    }

    setDeleteModalOpen(false);
  };

  return (
    <DeleteModal
      setDeleteModalOpen={setDeleteModalOpen}
      title={'템플릿 삭제'}
      text={'템플릿을 삭제하시겠습니까?'}
      handleDeleteClick={handleDeleteClick}
    />
  );
}
