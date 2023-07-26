import styled from '@emotion/styled';
import { useContext } from 'react';

import Template from '@/assets/Template.svg';
import { MainContext } from '@/store';

import SelectionBox from '../Common/SelectionBox';

export default function TemplateSelections() {
  const { setSelectedTemplateTitle } = useContext(MainContext);

  return (
    <SelectionBoxContainer>
      <SelectionBox
        title={'문진 템플릿'}
        titleDescription={'첫 방문 또는 회원 현재 상태를 체크 합니다.'}
        image={Template}
        onClick={() => setSelectedTemplateTitle('문진 템플릿')}
      />

      <SelectionBox
        title={'처치 템플릿'}
        titleDescription={'수업 시, 작성합니다.'}
        image={Template}
        onClick={() => setSelectedTemplateTitle('처치 템플릿')}
      />
    </SelectionBoxContainer>
  );
}
const SelectionBoxContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 16rem;
`;
