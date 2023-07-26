import { Button } from '@chakra-ui/react';
import { useState } from 'react';

import Modal from '@/components/Common/Modal';
import LinkComponent from '@/components/Link';

export default function MediaManagementPage() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Button
        onClick={() => setIsOpen(true)}
        style={{
          width: 146,
          height: 44,
          border: 'none',
          backgroundColor: '#2D62EA',
          color: '#FFFFFF',
        }}
      >
        + 링크 추가
      </Button>

      {isOpen && (
        <Modal
          width={1064}
          height={736}
          title={'센터 링크 추가'}
          setIsOpen={setIsOpen}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <LinkComponent />
          </div>
        </Modal>
      )}
    </div>
  );
}
