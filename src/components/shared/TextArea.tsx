import React from 'react';
import styles from './Input.module.scss';
import clsx from 'clsx';

interface TextAreaProps extends React.ComponentPropsWithRef<'textarea'> {
  error?: string;
  isFullWidth?: boolean;
  showLabel?: boolean;
  showPlaceholder?: boolean;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      error,
      isFullWidth = false,
      showLabel = true,
      showPlaceholder = false,
      className,
      ...textAreaProps
    },
    ref
  ) => (
    <div className={styles.root}>
      {showLabel && (
        <label htmlFor={textAreaProps.name} className={styles.label}>
          {textAreaProps.placeholder}
        </label>
      )}
      <textarea
        id={textAreaProps.id ?? textAreaProps.name}
        {...textAreaProps}
        placeholder={showPlaceholder ? textAreaProps.placeholder : undefined}
        className={clsx(
          styles.input,
          {
            [styles.isFullWidth]: isFullWidth,
          },
          className
        )}
        ref={ref}
      />
      {error !== undefined && <span className={styles.error}>{error}</span>}
    </div>
  )
);

export default TextArea;

TextArea.displayName = 'TextArea';
