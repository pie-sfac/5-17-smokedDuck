import { useContext } from 'react';

import { MainContext } from '@/store';

import Modal from '../Common/Modal';
import LinkComponent from '../Link';
import MediaCategorySelector from './MediaCategorySelector';
import MediaListContainer from './MediaListContainer';

export default function Media() {
  const { mediaModalOpen, setMediaModalState } = useContext(MainContext);

  return (
    <>
      <MediaCategorySelector />
      <MediaListContainer />
      {mediaModalOpen && (
        <Modal
          width={940}
          height={640}
          title={'센터 링크 생성'}
          setIsOpen={setMediaModalState}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <LinkComponent mode="CREATE" />
          </div>
        </Modal>
      )}
    </>
  );
}
