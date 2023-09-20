import { ReactElement, SVGProps } from 'react';
const ImageIcon = (props: SVGProps<SVGSVGElement>): ReactElement => (
  <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="m10.668 29.332v80h106.67v-80zm8 69.336 45.332-45.336 45.332 45.332zm77.332-34.668c-7.3633 0-13.332-5.9688-13.332-13.332 0-7.3672 5.9688-13.336 13.332-13.336s13.332 5.9688 13.332 13.332c0 7.3672-5.9688 13.336-13.332 13.336z"
      fill="currentColor"
    />
  </svg>
);
export default ImageIcon;
