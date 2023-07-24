import { ReactNode } from 'react';

import TemplateSelections from './TemplateSelections';
import TemplateSubHeader from './TemplateSubHeader';

type TemplateContentProps = {
  children: ReactNode;
  selectedTemplateTitle: string;
  setSelectedTemplateTitle: React.Dispatch<React.SetStateAction<string>>;
};

export default function TemplateContent({
  children,
  selectedTemplateTitle,
  setSelectedTemplateTitle,
}: TemplateContentProps) {
  return (
    <div>
      {selectedTemplateTitle.length === 0 ? (
        <TemplateSelections
          setSelectedTemplateTitle={setSelectedTemplateTitle}
        />
      ) : (
        <>
          <TemplateSubHeader />
          {children}
        </>
      )}
    </div>
  );
}
