import { createContext, Dispatch, SetStateAction, useState } from 'react';

import { Template } from '@/types/template.interface';

type TemplateContext = {
  selectedTemplateTitle: string;
  setSelectedTemplateTitle: Dispatch<SetStateAction<string>>;
  templateContent: Template | undefined;
  setTemplateContent: Dispatch<SetStateAction<Template | undefined>>;
};

export const TemplateContext = createContext<TemplateContext>({
  selectedTemplateTitle: '',
  setSelectedTemplateTitle: () => {},
  templateContent: {
    category: '',
    title: '',
    description: '',
    questions: [],
  },
  setTemplateContent: () => {},
});

export const TemplateProvider = (props: { children: React.ReactNode }) => {
  const [selectedTemplateTitle, setSelectedTemplateTitle] = useState('');
  const [templateContent, setTemplateContent] = useState<Template>();

  const templateContextValue: TemplateContext = {
    selectedTemplateTitle,
    setSelectedTemplateTitle,
    templateContent,
    setTemplateContent,
  };

  return (
    <TemplateContext.Provider value={templateContextValue}>
      {props.children}
    </TemplateContext.Provider>
  );
};
