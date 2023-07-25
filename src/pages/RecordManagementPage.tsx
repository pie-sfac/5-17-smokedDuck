import { Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import Modal from '@/components/common/Modal';
import Template from '@/components/Template';

export default function RecordManagementPage() {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedTemplateTitle, setSelectedTemplateTitle] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setSelectedTemplateTitle('');
    }
  }, [isOpen]);

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
          width={selectedTemplateTitle.length === 0 ? 700 : undefined}
          height={selectedTemplateTitle.length === 0 ? 400 : undefined}
          setIsOpen={setIsOpen}
        >
          <Template
            selectedTemplateTitle={selectedTemplateTitle}
            setSelectedTemplateTitle={setSelectedTemplateTitle}
          />
        </Modal>
      )}
    </div>
  );
}
