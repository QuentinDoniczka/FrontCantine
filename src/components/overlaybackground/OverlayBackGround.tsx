import React from "react";
import { CustomBackgroundProps } from "../../types/bg.types";

// CustomBackground component that accepts various styling properties
const CustomBackground: React.FC<CustomBackgroundProps> = ({
                                                               top = "0%",      // Default top position (can be in %, px, vh, vw, etc.)
                                                               left = "0%",     // Default left position (can be in %, px, vh, vw, etc.)
                                                               width,           // Required width (can be in %, px, vh, vw, etc.)
                                                               height,          // Required height (can be in %, px, vh, vw, etc.)
                                                               zIndex = -1,     // Optional zIndex, default is -1
                                                               image,           // Optional image URL for background
                                                               color            // Optional color for background
                                                           }) => {
    const imageStyles: React.CSSProperties = {
        width: '100%',
        height: '100%',
        objectFit: 'cover'  // Assure that the image covers the container
    };

    const shadowStyles: React.CSSProperties = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        boxShadow: 'inset 0 0 30px 10px rgba(0, 0, 0, 0.5)', // Exaggerated inner shadow
        zIndex: 2  // Ensure the shadow is above the image
    };

    const containerStyles: React.CSSProperties = {
        position: 'absolute',
        top: top,
        left: left,
        width: width,
        height: height,
        zIndex: zIndex,
        backgroundColor: color,
        overflow: 'hidden' // Ensure the shadow doesn't spill outside the container
    };

    // Render an <img> element with an overlay for the shadow effect, or a <div> if no image is provided
    const BackgroundElement = image ? (
        <div style={containerStyles}>
            <img src={image} alt="background" style={imageStyles}/>
            <div style={shadowStyles}></div> {/* Shadow overlay */}
        </div>
    ) : (
        <div style={containerStyles}/>
    );

    // Return the background element
    return <>{BackgroundElement}</>;
};

export default CustomBackground;
