import { useCallback, useState } from 'react';

import { updateTemplateAPI } from '@/apis/Template';
import UpdateTemplateContent from '@/components/UpdateTemplate/UpdateTemplateContent';
import UpdateTemplateFooter from '@/components/UpdateTemplate/UpdateTemplateFooter';
import UpdateTemplateTitle from '@/components/UpdateTemplate/UpdateTemplateTitle';
import useRecord from '@/hooks/useRecord';
import { Questions, StringQuestionTypes } from '@/types/question.interface';
import { recordDetailType } from '@/types/recordDetail.interface';
import { UpdateTemplateType } from '@/types/template.interface';

type UpdateTemplatePropType = {
  id: number;
  recordDetailData: recordDetailType;
};

export default function UpdateTemplate({
  id,
  recordDetailData,
}: UpdateTemplatePropType) {
  const { recordListData, mutate: mutateTitle } = useRecord();

  const [currTemplateSubHeader, setCurrTemplateSubHeader] = useState({
    title: recordDetailData.title,
    description: recordDetailData.description
      ? recordDetailData.description
      : '',
  });
  const [deleteIds, setDeleteIds] = useState<number[]>([]);
  const [updateQuestions, setUpdateQuestions] = useState<Questions[]>(
    recordDetailData.questions
  );
  const [addQuestions, setAddQuestions] = useState<Questions[]>([]);
  const [totalList, setTotalList] = useState<Questions[]>(updateQuestions);
  const [validation, setValidation] = useState({
    isValidate: false,
    errorMessage: '',
  });
  const [caption, setCaption] = useState({
    isduplicate: false,
    isMaximum: false,
    errorMessage: '',
  });

  const checkValidation = useCallback(() => {
    let isValid = true;
    let errorMessage = '';

    if (currTemplateSubHeader.title.length === 0) {
      isValid = false;
      errorMessage = '템플릿 제목을 입력해주세요.';
    }

    totalList.forEach(listItem => {
      if (
        (listItem.type === 'TEXT' || listItem.type === 'MEDIA') &&
        listItem.title.length === 0
      ) {
        isValid = false;
        errorMessage = `${listItem.type} 문항의 제목을 입력해주세요.`;
      }
      if (listItem.type === 'SELECT' && listItem.options?.length === 0) {
        isValid = false;
        errorMessage = '선택형 문항의 보기가 존재하지 않습니다.';
      } else if (listItem.type === 'SELECT' && listItem.options?.length !== 0) {
        const set = new Set(listItem.options);
        if (set.size !== listItem.options?.length) {
          isValid = false;
          errorMessage =
            '작성하신 선택형 문항의 보기 중 중복값이 존재합니다. 중복을 수정해주세요.';
        }
      }
    });

    setValidation({
      isValidate: isValid,
      errorMessage,
    });

    return isValid;
  }, [currTemplateSubHeader.title.length, totalList]);

  const syncOrder = useCallback(
    (targetList: Questions[], correctOrderList: Questions[]) => {
      return targetList.map(listItem => {
        const newOrder = correctOrderList.find(item => item.id === listItem.id)
          ?.order;
        return {
          ...listItem,
          order: newOrder ? newOrder : 0,
        };
      });
    },
    []
  );

  const handleClickedSaveButton = async (templateId?: number) => {
    const isRight = checkValidation();
    if (!isRight) return;

    const updateList = syncOrder(updateQuestions, totalList);
    const addList = syncOrder(addQuestions, totalList);
    const updatedTemplateContent: UpdateTemplateType = {
      title: currTemplateSubHeader.title,
      description: currTemplateSubHeader.description,
      updateQuestions: updateList,
      addQuestions: addList,
      deleteIds,
    };

    if (templateId) {
      await updateTemplateAPI(templateId, updatedTemplateContent);
    }

    if (recordListData) {
      mutateTitle(
        recordListData.map(listItem => {
          return listItem.id === id
            ? { ...listItem, title: currTemplateSubHeader.title }
            : listItem;
        }),
        true
      );
    }
  };

  const questionsListHandler = useCallback(
    (type: StringQuestionTypes, tagName: string) => {
      setCaption({
        isMaximum: false,
        isduplicate: false,
        errorMessage: '',
      });

      const newQuestionId =
        updateQuestions.length === 0
          ? addQuestions.length === 0
            ? 1
            : addQuestions[addQuestions.length - 1].id + 1
          : addQuestions.length === 0
          ? updateQuestions[updateQuestions.length - 1].id + 1
          : addQuestions[addQuestions.length - 1].id + 1;

      const newOrder =
        totalList.length === 0 ? 1 : totalList[totalList.length - 1].order + 1;

      if (
        type === 'PAIN_HSTRY' ||
        type === 'PAIN_INTV' ||
        type === 'CONDITION'
      ) {
        if (totalList.find(listItem => listItem.type === type)) {
          setCaption({
            ...caption,
            isduplicate: true,
            errorMessage: '전문 문항은 중복으로 추가할 수 없습니다.',
          });
          return;
        }
      }
      if (totalList.length > 29) {
        setCaption({
          ...caption,
          isMaximum: true,
          errorMessage: '템플릿당 문항수는 30개를 초과할 수 없습니다.',
        });
        return;
      }

      const newQuestion = {
        id: newQuestionId,
        type,
        order: newOrder,
        required: false,
        title: '',
        tagName,
        description: '',
        paragraph: false,
        options: [],
        allowMultiple: false,
        addOtherOption: false,
      };
      setAddQuestions([...addQuestions, newQuestion]);
      setTotalList([...totalList, newQuestion]);
    },
    [addQuestions, caption, totalList, updateQuestions]
  );

  const existQuestionContentHandler = useCallback(
    (order: number, valueKey: string, value: string | string[] | boolean) => {
      const currentUpdatedQuestion = updateQuestions.map(question =>
        question.order === order ? { ...question, [valueKey]: value } : question
      );
      setUpdateQuestions(currentUpdatedQuestion);
      setTotalList(
        [...currentUpdatedQuestion, ...addQuestions].sort(
          (a, b) => a.order - b.order
        )
      );
    },

    [addQuestions, updateQuestions]
  );

  const newQuestionContentHandler = useCallback(
    (order: number, valueKey: string, value: string | string[] | boolean) => {
      if (addQuestions.length !== 0) {
        const currentUpdatedQuestion = addQuestions.map(question =>
          question.order === order
            ? { ...question, [valueKey]: value }
            : question
        );
        setAddQuestions(currentUpdatedQuestion);
        setTotalList(
          [...updateQuestions, ...currentUpdatedQuestion].sort(
            (a, b) => a.order - b.order
          )
        );
      }
    },
    [addQuestions, updateQuestions]
  );

  const questionDeleteHandler = useCallback(
    (order: number, isNew: boolean) => {
      const targetQuestion = totalList.find(item => item.order === order);
      if (!isNew && targetQuestion) {
        setDeleteIds([...deleteIds, targetQuestion.id]);
        setUpdateQuestions(
          updateQuestions.filter(item => item.order !== order)
        );
      } else if (targetQuestion) {
        setAddQuestions(addQuestions.filter(item => item.order !== order));
      }

      setTotalList(
        totalList
          .filter(item => item.order !== order)
          .sort((a, b) => a.order - b.order)
          .map((item, index) => {
            return { ...item, order: index + 1 };
          })
      );
    },
    [addQuestions, deleteIds, totalList, updateQuestions]
  );

  const questionMoveHandler = useCallback(
    (targetOrder: number, direction: string) => {
      if (direction === 'up' && targetOrder === 1) {
        alert('첫번째 문항입니다.');
        return;
      } else if (
        direction === 'down' &&
        targetOrder === totalList[totalList.length - 1].order
      ) {
        alert('마지막 문항입니다.');
        return;
      }

      if (direction === 'up') {
        const newList = totalList.map(item => {
          if (item.order === targetOrder - 1)
            return { ...item, order: item.order + 1 };

          if (item.order === targetOrder)
            return { ...item, order: item.order - 1 };

          return item;
        });

        setTotalList(newList.sort((a, b) => a.order - b.order));
        setAddQuestions(syncOrder(addQuestions, newList));
        setUpdateQuestions(syncOrder(updateQuestions, newList));
      }
      if (direction === 'down') {
        const newList = totalList.map(item => {
          if (item.order === targetOrder + 1)
            return { ...item, order: item.order - 1 };

          if (item.order === targetOrder)
            return { ...item, order: item.order + 1 };

          return item;
        });
        setTotalList(newList.sort((a, b) => a.order - b.order));
        setAddQuestions(syncOrder(addQuestions, newList));
        setUpdateQuestions(syncOrder(updateQuestions, newList));
      }
    },

    [addQuestions, syncOrder, totalList, updateQuestions]
  );

  return (
    <>
      <UpdateTemplateTitle id={id} isEditing={true} />
      <UpdateTemplateContent
        id={id}
        setCurrTemplateSubHeader={setCurrTemplateSubHeader}
        questionsListHandler={questionsListHandler}
        newQuestionContentHandler={newQuestionContentHandler}
        existQuestionContentHandler={existQuestionContentHandler}
        handleDelete={questionDeleteHandler}
        handleMove={questionMoveHandler}
        totalList={totalList}
        caption={caption}
      />
      <UpdateTemplateFooter
        handleClickedSaveButton={handleClickedSaveButton}
        validation={validation}
        id={id}
      />
    </>
  );
}
