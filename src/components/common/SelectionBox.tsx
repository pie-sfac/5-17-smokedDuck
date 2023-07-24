import styled from '@emotion/styled';
import { useMemo } from 'react';

type SelectionBoxProps = {
  width?: number;
  height?: number;
  title: string;
  titleDescription: string;
  image: string;
};

export default function SelectionBox({
  width = 310,
  height = 170,
  title,
  titleDescription,
  image,
}: SelectionBoxProps) {
  const selectionBoxContainerStyle = useMemo(
    () => ({
      width,
      height,
    }),
    [width, height]
  );

  return (
    <SelectionBoxContainer style={{ ...selectionBoxContainerStyle }}>
      <TitleContainer>
        <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>{title}</div>
        <div style={{ fontSize: '0.8rem' }}>{titleDescription}</div>
      </TitleContainer>
      <IconContainer>
        <StyledImage>
          <img
            id={'templateImg'}
            src={image}
            alt="템플릿 아이콘"
            width={16}
            height={20}
          />
        </StyledImage>
      </IconContainer>
    </SelectionBoxContainer>
  );
}

const SelectionBoxContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 1rem;
  border: 1px solid #e7e7e7;
  border-radius: 10px 10px 10px 10px;
  :hover {
    border: 1px solid #2d62ea;
    * {
      color: #2d62ea;
    }
    .css-19njikn {
      background-color: #ebf1ff;
    }
    #templateImg {
      filter: invert(29%) sepia(57%) saturate(5495%) hue-rotate(220deg)
        brightness(99%) contrast(85%);
    }
  }
`;

const TitleContainer = styled('div')`
  margin: 1rem;
  display: flex;
  flex-direction: column;
`;

const IconContainer = styled('div')`
  display: flex;
  justify-content: flex-end;
  margin: 0.8rem;
`;

const StyledImage = styled('div')`
  width: 2.2rem;
  height: 2.2rem;
  display: flex;
  justify-content: center;
  background-color: #f4f4f4;
  border-radius: 50%;
`;
