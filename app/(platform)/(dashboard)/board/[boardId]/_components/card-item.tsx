"use client";

import { Card } from "@prisma/client";

interface CardItemProp {
    index: number;
    data: Card;
}

export const CardItem = ({
    index,
    data,
}:CardItemProp) => {
    
    return (
        <div
            role="button"
        
            className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm">
            {data.title}    
        </div>
    )
}