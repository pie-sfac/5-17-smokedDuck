import { useContext } from 'react';

import { MainContext } from '@/store';

import TemplateContent from './TemplateContent';
import TemplateTitle from './TemplateTitle';

export default function Template() {
  const { selectedTemplateTitle } = useContext(MainContext);
  return (
    <>
      <TemplateTitle title={selectedTemplateTitle} />
      <TemplateContent />
    </>
  );
}
