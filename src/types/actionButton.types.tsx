export interface ActionButtonProps {
  text: string;
  onClick?: () => void;
  theme?: number;
  height?: string;
  width?: string;
  font_size?: number;
  shadow?: boolean;
  type?: 'button' | 'submit' | 'reset'; // Adding type prop
}
