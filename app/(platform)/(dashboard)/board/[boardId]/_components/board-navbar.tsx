import { Board } from "@prisma/client";
import { BoardTitleForm } from "./board-title-form";

interface BoardNavbarProps {
    data: Board;
}

export const BoardNavbar = ({ data }:BoardNavbarProps) => {
    return (<div className="w-full h-14 z-[40] bg-black/40 fixed top-14 flex items-center text-white gap-x-4 px-6">
       <BoardTitleForm data={data} />
    </div> );
}