import Button from '../UI/Button';

import styles from './Vote.module.scss';
import upvoteIcon from '../../assets/icons/upvote-icon.png';
import downvoteIcon from '../../assets/icons/downvote-icon.png';

interface VoteProps {
  handleUpvote: () => void;
  handleDownvote: () => void;
  upvotes: number;
  downvotes: number;
}

const Vote = ({
  handleUpvote,
  handleDownvote,
  upvotes,
  downvotes,
}: VoteProps) => {
  return (
    <div className={styles.votes}>
      <Button onClick={handleUpvote}>
        <img src={upvoteIcon} alt="upvote icon" />
      </Button>
      <p className={styles.upvote}>{upvotes}</p>
      <Button onClick={handleDownvote}>
        <img src={downvoteIcon} alt="downvote icon" />
      </Button>
      <p className={styles.downvote}>{downvotes}</p>
    </div>
  );
};

export default Vote;
