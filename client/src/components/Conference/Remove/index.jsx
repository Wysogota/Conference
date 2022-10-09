/* eslint-disable react/prop-types */
import { observer } from 'mobx-react-lite';
import { Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { conferenceStore } from '../../../store';
import styles from './Remove.module.scss';

const initial = { y: -10, opacity: 0 };

const Remove = observer((props) => {
  const { id, hovered } = props;
  const { remove } = conferenceStore;
  const onClickHandle = () => { remove(id); };

  const whileInView = {
    y: hovered ? 0 : -10,
    opacity: hovered ? 1 : 0,
    transition: { duration: 0.2 },
  };

  return (
    <motion.div initial={initial} whileInView={whileInView} className={styles.remove_button}>
      <Button variant='outline-dark' onClick={onClickHandle} className='h-10'>Remove</Button>
    </motion.div>
  );
});

export default Remove;
