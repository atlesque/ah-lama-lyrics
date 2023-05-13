import { MouseEvent, useState } from 'react';
import Button, { ButtonProps } from './Button';
import styles from './ConfirmButton.module.scss';

const ConfirmButton = ({ ...buttonProps }: ButtonProps) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleInitialClick = (): void => {
    setShowConfirm(true);
  };

  const handleCancelClick = (): void => {
    setShowConfirm(false);
  };

  const handleConfirmClick = (e: MouseEvent<HTMLButtonElement>): void => {
    setShowConfirm(false);
    if (buttonProps.onClick) {
      buttonProps.onClick(e);
    }
  };

  if (showConfirm) {
    return (
      <div className={styles.buttonGroup}>
        <Button {...buttonProps} onClick={handleConfirmClick}>
          {buttonProps.children}
        </Button>
        <Button color="info" onClick={handleCancelClick}>
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <Button {...buttonProps} onClick={handleInitialClick}>
      {buttonProps.children}
    </Button>
  );
};

export default ConfirmButton;
