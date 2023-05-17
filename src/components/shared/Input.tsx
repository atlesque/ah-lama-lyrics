import React from 'react';
import styles from './Input.module.scss';
import clsx from 'clsx';

interface InputProps extends React.ComponentPropsWithRef<'input'> {
  error?: string;
  isFullWidth?: boolean;
  showLabel?: boolean;
  showPlaceholder?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      error,
      isFullWidth = false,
      showLabel = true,
      showPlaceholder = false,
      className,
      ...inputProps
    },
    ref
  ) => (
    <div className={styles.root}>
      {showLabel && (
        <label htmlFor={inputProps.name} className={styles.label}>
          {inputProps.placeholder}
        </label>
      )}
      <input
        id={inputProps.id ?? inputProps.name}
        {...inputProps}
        placeholder={showPlaceholder ? inputProps.placeholder : undefined}
        className={clsx(
          styles.input,
          {
            [styles.isFullWidth]: isFullWidth,
            [styles.isCheckbox]: inputProps.type === 'checkbox',
          },
          className
        )}
        ref={ref}
      />
      {error !== undefined && <span className={styles.error}>{error}</span>}
    </div>
  )
);

export default Input;

Input.displayName = 'Input';
