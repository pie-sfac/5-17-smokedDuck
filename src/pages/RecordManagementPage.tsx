import { Button } from '@chakra-ui/react';
import Modal from 'components/common/Modal';
import { useState } from 'react';

export default function RecordManagementPage() {
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
        + 템플릿 추가
      </Button>
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
    </div>
  );
}
