import Button from '../UI/Button';

import styles from './Modify.module.scss';

interface ModifyProps {
  handleEdit: () => void;
  handleDelete: () => void;
}

const Modify = ({ handleEdit, handleDelete }: ModifyProps) => {
  return (
    <div className={styles.modify}>
      <Button onClick={handleEdit}>Edit</Button>
      <Button onClick={handleDelete}>Delete</Button>
    </div>
  );
};

export default Modify;
