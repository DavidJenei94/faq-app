import { ComponentProps } from 'react';

import styles from './Textarea.module.scss';

const Textarea = ({ ...otherProps }: ComponentProps<'textarea'>) => {
  return <textarea className={styles.textarea} {...otherProps} />;
};

export default Textarea;
