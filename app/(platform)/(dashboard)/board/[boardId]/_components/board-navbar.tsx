import { Board } from "@prisma/client";

interface BoardNavbarProps {
    data: Board;
}

export const BoardNavbar = ({ data }:BoardNavbarProps) => {
    return (<div>
        Board Navbar
    </div> );
}