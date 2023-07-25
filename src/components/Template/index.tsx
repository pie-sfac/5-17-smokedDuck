import TemplateContent from './TemplateContent';
import TemplateTitle from './TemplateTitle';

type TemplateProps = {
  selectedTemplateTitle: string;
  setSelectedTemplateTitle: React.Dispatch<React.SetStateAction<string>>;
};

export default function Template({
  selectedTemplateTitle,
  setSelectedTemplateTitle,
}: TemplateProps) {
  return (
    <>
      <TemplateTitle title={selectedTemplateTitle} />
      <TemplateContent
        selectedTemplateTitle={selectedTemplateTitle}
        setSelectedTemplateTitle={setSelectedTemplateTitle}
      />
    </>
  );
}
