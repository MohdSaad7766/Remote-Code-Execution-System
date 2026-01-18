import React from "react";
export default function DSAImg({src,alt})
{
    return(
        <div className="text-center m-3.5 place-items-center align-middle">
            <img src={src} alt={alt} className="w-180 bg-gray-800" />
            <p className="text-xs text-gray-800">fig. {alt}</p>
        </div>
    );
}