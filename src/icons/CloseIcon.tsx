import { ReactElement, SVGProps } from 'react';
const CloseIcon = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="m10.843 7.5 4.264-4.265a1.34 1.34 0 0 0 0-1.896L14.16.392a1.34 1.34 0 0 0-1.896 0L8 4.656 3.735.392a1.34 1.34 0 0 0-1.896 0l-.947.948a1.34 1.34 0 0 0 0 1.896L5.156 7.5.892 11.764a1.34 1.34 0 0 0 0 1.896l.948.947a1.34 1.34 0 0 0 1.896 0L8 10.343l4.264 4.264a1.34 1.34 0 0 0 1.896 0l.947-.947a1.34 1.34 0 0 0 0-1.896L10.843 7.5Z"
      fill="currentColor"
    />
  </svg>
);
export default CloseIcon;
