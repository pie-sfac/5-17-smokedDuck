export type Category = {
  id: number;
  name: string;
  text: string;
};

export const userName = '박관리자01';

export const categoryList: Category[] = [
  { id: 0, name: 'employee', text: '직원관리' },
  { id: 1, name: 'tikect', text: '수강권 관리' },
  { id: 2, name: 'record', text: '기록 관리' },
  { id: 3, name: 'media', text: '미디어 관리' },
  { id: 4, name: 'data', text: '운영 데이터' },
  { id: 5, name: 'alram', text: '알림메세지' },
  { id: 6, name: 'center', text: '센터 정보' },
];
