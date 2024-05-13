export interface ActionButtonProps {
    text: string; 
    onClick?: () => void;
    theme: 1 | 2 | 3 | 4;
    height?: string;
    width?: string;
    font_size?: number;
    shadow?: boolean;
}