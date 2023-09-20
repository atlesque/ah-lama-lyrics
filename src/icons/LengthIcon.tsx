import { ReactElement, SVGProps } from 'react';
const LengthIcon = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="m109.7 30.594h-91.391c-8.3203 0-15.105 6.7852-15.105 15.105v36.352c0 8.3203 6.7852 15.105 15.105 15.105h91.266c8.3203 0 15.105-6.7852 15.105-15.105l-0.003906-36.227c0.12891-8.3203-6.6562-15.23-14.977-15.23zm-2.5586 35.199-15.105 13.695c-0.64062 0.64062-1.6641 0.76953-2.5586 0.38281-0.25781-0.12891-0.51172-0.25781-0.76953-0.51172-0.38281-0.38281-0.64062-1.0234-0.64062-1.6641v-7.2969h-48.129v7.2969c0 0.89453-0.51172 1.793-1.4062 2.1758-0.89453 0.38281-1.9219 0.25781-2.5586-0.38281l-15.105-13.695-0.12891-0.12891c-0.38281-0.38281-0.64062-1.0234-0.64062-1.6641s0.25781-1.2812 0.76953-1.793l15.105-13.695c0.64062-0.64062 1.6641-0.76953 2.5586-0.38281 0.89453 0.38281 1.4062 1.2812 1.4062 2.1758l0.003906 7.2969h48.129v-7.2969c0-0.89453 0.51172-1.793 1.4062-2.1758 0.89453-0.38281 1.9219-0.25781 2.5586 0.38281l15.105 13.695c0.51172 0.51172 0.76953 1.1523 0.76953 1.793-0.003906 0.64062-0.25781 1.2812-0.76953 1.793z"
      fill="currentColor"
    />
  </svg>
);
export default LengthIcon;
