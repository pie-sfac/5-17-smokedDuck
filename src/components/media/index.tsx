import { useContext, useState } from 'react';

import { MediaContext } from '@/store/MediaProvider';

import Modal from '../Common/Modal';
import LinkComponent from '../Link';
import MediaCategorySelector from './MediaCategorySelector';
import MediaListContainer from './MediaListContainer';

export default function Media() {
  const { mediaModalOpen, setMediaModalState } = useContext(MediaContext);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const categoryChange = (title: string) => {
    setSelectedCategory(title);
  };
  return (
    <>
      <MediaCategorySelector
        selectedCategory={selectedCategory}
        categoryChange={categoryChange}
      />
      <MediaListContainer selectedCategory={selectedCategory} />
      {mediaModalOpen && (
        <Modal
          width={940}
          height={640}
          title={'센터 링크 생성'}
          setIsOpen={setMediaModalState}
          showConfirmationAlert={true}
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
