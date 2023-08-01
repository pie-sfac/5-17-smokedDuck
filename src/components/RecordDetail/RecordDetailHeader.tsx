type RecordDetailHeaderPropsType = {
  id: number;
  title: string;
};

export default function RecordDetailHeader({
  id,
  title,
}: RecordDetailHeaderPropsType) {
  return <div>{`${id}${title}`}</div>;
}
