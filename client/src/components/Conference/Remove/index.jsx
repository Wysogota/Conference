import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { capitalize } from 'lodash';
import { conferenceStore } from '../../../store';
import useAfterRequestAction from '../../../hooks/useAfterRequestAction';
import CONSTANTS from '../../../constants';
const { PAGES: { HOME } } = CONSTANTS;

const initial = { y: -10, opacity: 0 };

const Remove = observer((props) => {
  const { id, hovered, className } = props;
  const { remove, error } = conferenceStore;
  
  const navigate = useNavigate();
  const action = () => navigate(HOME, { replace: true });
  const { setIsRequested } = useAfterRequestAction(action, error);

  const onClickHandle = () => {
    remove(id);
    setIsRequested(true);
  };

  const whileInView = {
    y: hovered ? 0 : -10,
    opacity: hovered ? 1 : 0,
    transition: { duration: 0.2 },
  };

  if (hovered === undefined) {
    return (
      <Button variant='outline-dark' onClick={onClickHandle} className={className}>{capitalize('remove')}</Button>
    );
  }

  return (
    <motion.div initial={initial} whileInView={whileInView}>
      <Button variant='outline-dark' onClick={onClickHandle} className={className}>{capitalize('remove')}</Button>
    </motion.div>
  );
});

export default Remove;
