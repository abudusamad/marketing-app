"use client";

import { ListWithCards } from "@/types";

interface ListContainerProps {
    data: ListWithCards[];
    boardId: string;
}

export const ListContainer = ({data, boardId}:ListContainerProps) => {
    return (
        <div>
            List Container
        </div>
    )
}