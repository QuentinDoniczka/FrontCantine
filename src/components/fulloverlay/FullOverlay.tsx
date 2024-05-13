import React from "react";
import OverlayBackGround from "../overlaybackground/OverlayBackGround";
import { FullOverlayProps } from "../../types/bg.types";
import img from "../../assets/img/test.png";

const FullOverlay: React.FC<FullOverlayProps> = ({ height1, height2, height3 }) => {
    //const backgroundImageUrl = process.env.PUBLIC_URL + '/assets/img/test.png';

    // Calculate the 'top' position for each OverlayBackground based on the provided heights
    const top1 = "0px"; // First element always starts at the top
    console.log(height1);
    const top2 = height1 || "0px"; // Defaults to "0px" if height1 is not provided
    const top3 = height2 ? `calc(${height1} + ${height2})` : "0px"; // height2 is added to height1
    const color1 = "var(--secondary-color)";
    const color2 = "var(--primary-color)";
    
    
    return (
        <div style={{ position: "relative",height:"0px"}}>
            {height1 && <OverlayBackGround top={top1} left={"0px"} width={"100%"} height={height1} image={img}/>}
            {height2 && <OverlayBackGround top={top2} left={"0px"} width={"100%"} height={height2} color={color1}/>}
            {height3 && <OverlayBackGround top={top3} left={"0px"} width={"100%"} height={height3} color={color2}/>}
        </div>
    );
}

export default FullOverlay;
