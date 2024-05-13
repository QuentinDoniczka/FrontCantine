export interface CustomBackgroundProps {
    top?: string;
    left?: string;
    width: string;
    height: string;
    zIndex?: number;
    image?: string;
    color?: string;
    shadow?: boolean;
}
export interface FullOverlayProps {
    height1?: string;  // Optional width for the first OverlayBackground
    height2?: string;  // Optional width for the second OverlayBackground
    height3?: string;  // Optional width for the third OverlayBackground
}