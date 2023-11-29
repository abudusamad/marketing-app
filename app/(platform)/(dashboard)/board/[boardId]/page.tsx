import { ListContainer } from "./_components/list-container";

interface BoardIdPageProps {
    params: {
        boardId: string;
    }
}

const BoardIdPage = ({params}:BoardIdPageProps) => {
    return (<div className="p-4 h-full overflow-x-auto">
        <ListContainer
            boardId={params.boardId}
            data={lists}
        />
    </div> );
}
 
export default BoardIdPage;