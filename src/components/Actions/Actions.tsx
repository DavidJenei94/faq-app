import Modify from './Modify';
import Vote from './Vote';

import styles from './Action.module.scss';

interface ActionsProps {
  handleUpvote: () => void;
  handleDownvote: () => void;
  upvotes: number;
  downvotes: number;
  handleEdit: () => void;
  handleDelete: () => void;
}

const Actions = ({
  handleUpvote,
  handleDownvote,
  upvotes,
  downvotes,
  handleEdit,
  handleDelete,
}: ActionsProps) => {
  return (
    <div className={styles.actions}>
      <Vote
        handleUpvote={handleUpvote}
        handleDownvote={handleDownvote}
        upvotes={upvotes}
        downvotes={downvotes}
      />
      <Modify handleEdit={handleEdit} handleDelete={handleDelete} />
    </div>
  );
};

export default Actions;
