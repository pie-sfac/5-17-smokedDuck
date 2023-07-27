import styled from '@emotion/styled';
import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { MainContext } from '@/store';

import CategoryTab from './CategoryTab';

export default function CategorySelector() {
  const { storedCategoryList } = useContext(MainContext);
  const location = useLocation();

  const [selectedCategory, setSelectedCategory] = useState(
    storedCategoryList[0].id
  );

  const navigate = useNavigate();

  return (
    <>
      {location.pathname.includes('category') ? (
        <CategoryTab />
      ) : (
        <CategoryTitle>
          {storedCategoryList.map(item => (
            <ul key={item.id}>
              <li
                onClick={() => setSelectedCategory(item.id)}
                style={{
                  color: selectedCategory === item.id ? '#6691FF' : 'inherit',
                  borderBottom:
                    selectedCategory === item.id
                      ? '1px solid #6691FF'
                      : 'inherit',
                }}
              >
                {item.title}
              </li>
            </ul>
          ))}
          <EditButton>
            <button onClick={() => navigate('/category')}>편집</button>
          </EditButton>
        </CategoryTitle>
      )}
    </>
  );
}

const CategoryTitle = styled('div')`
  display: flex;
  position: relative;
  margin-top: 2rem;
  & > ul {
    list-style: none;
    cursor: pointer;
    padding: 0 1rem;
  }
`;

const EditButton = styled('div')`
  position: absolute;
  right: 1rem;
  width: 64px;
  height: 32px;
  text-align: center;
  padding-top: 4px;
  border: 1px solid #e7e7e7;
  border-radius: 8px;
`;
