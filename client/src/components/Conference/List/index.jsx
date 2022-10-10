import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { conferenceStore } from '../../../store';
import useFetching from '../../../hooks/useFetching';
import ListItem from '../ListItem';

const List = observer(() => {
  const { getAll, conferences, isFetching, error } = conferenceStore;
  useEffect(() => { getAll(); }, []);

  const fetching = useFetching({ data: conferences, isFetching });
  if (fetching) return fetching;

  return (
    conferences.map((conference) =>
      <ListItem key={conference.id} conference={conference} />,
    )
  );
});

export default List;
