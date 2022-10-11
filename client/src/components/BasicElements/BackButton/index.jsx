import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const BackButton = () => {
  const navigate = useNavigate();

  const onClickHandle = () => {
    navigate(-1);
  };

  return (
    <Button onClick={onClickHandle} variant='outline-dark' className='w-100'>Back</Button>
  );
};

export default BackButton;
