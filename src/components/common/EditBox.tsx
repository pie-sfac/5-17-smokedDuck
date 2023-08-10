import styled from '@emotion/styled';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import HambergerDot from '@/assets/hamburgerDots.svg';

type EditBoxProps = {
  top?: number;
  right?: number;
  bottom?: number;
  id: number;
  onDeleteClick?: () => void;
  onEditClick?: () => void;
};

export default function EditBox({
  top,
  right,
  bottom,
  onDeleteClick,
  onEditClick,
}: EditBoxProps) {
  const [editOpen, setEditOpen] = useState(false);
  const editBoxRef = useRef<HTMLDivElement | null>(null);

  const EditBoxStyle = useMemo(
    () => ({
      top,
      right,
      bottom,
    }),
    [top, right, bottom]
  );

  const clickHandler = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setEditOpen(prevOpen => !prevOpen);
  }, []);

  const handleOutsideClick = useCallback((e: MouseEvent) => {
    if (editBoxRef.current && !editBoxRef.current.contains(e.target as Node)) {
      setEditOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return (
    <>
      <EditContainer onClick={clickHandler}>
        <ImgContainer src={HambergerDot} alt="편집/삭제버튼" />
        {editOpen && (
          <EditItemArea ref={editBoxRef} style={{ ...EditBoxStyle }}>
            <EditItem onClick={onEditClick}>편집</EditItem>
            <EditItem onClick={onDeleteClick}>삭제</EditItem>
          </EditItemArea>
        )}
      </EditContainer>
    </>
  );
}

const EditItemArea = styled.div`
  position: absolute;
  margin-top: 8px;
  margin-right: 14px;
  width: 5rem;
  height: 6rem;
  border-radius: 10px;
  border: 1px solid #e7e7e7;
  background-color: #fff;
  box-shadow: 0px 1px 4px -2px rgba(0, 0, 0, 0.75);
`;

const EditItem = styled.div`
  width: 100%;
  height: 3rem;
  text-align: center;
  font-weight: 600;
  line-height: 3rem;
  &:first-of-type {
    border-bottom: 1px solid #e7e7e7;
  }

  &:hover {
    background-color: rgba(235, 241, 255, 0.8);
  }
`;

const EditContainer = styled.div`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 36px;
  height: 36px;
  padding: 10px;
`;

const ImgContainer = styled.img`
  width: 1rem;
  height: 1rem;
  z-index: 999;
`;
