import React from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames/bind';

export type ButtonVariant = 'outlined' | 'contained' | 'text';

export type ButtonColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

const cx = classNames.bind(styles);

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  isFullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'outlined',
  color = 'info',
  isFullWidth = false,
  className,
  ...htmlProps
}: ButtonProps) => {
  const props = {
    ...htmlProps,
    className: cx(
      styles.root,
      variant,
      color,
      {
        [styles.fullWidth]: isFullWidth,
      },
      className
    ),
  };

  return React.createElement('button', props, props.children);
};

export default Button;
