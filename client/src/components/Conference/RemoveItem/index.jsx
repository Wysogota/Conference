/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { Button } from 'react-bootstrap';
import { conferenceStore } from '../../../store';

const initial = { y: 0, opacity: 0 };

const RemoveItem = observer((props) => {
  const { id, hovered } = props;
  const { remove } = conferenceStore;
  const onClickHandle = () => { remove(id); };

  const whileInView = {
    y: hovered ? -10 : 0,
    opacity: hovered ? 1 : 0,
    transition: { duration: 0.2 },
  };

  return (
    <motion.div initial={initial} whileInView={whileInView}>
      <Button onClick={onClickHandle}>Remove</Button>
    </motion.div>
  );
});

export default RemoveItem;
