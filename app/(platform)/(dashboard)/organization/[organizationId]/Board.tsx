import { deleteBoard } from "@/actions/delete-board";
import { Button } from "@/components/ui/button";

interface BoardProps {
	id: string;
	title: string;
}

export const Board = async ({ title, id }: BoardProps) => {
	const deleteBoardWithId = deleteBoard.bind(null, id);
	return (
		<form action={deleteBoardWithId} className="flex items-center gap-x-2">
			<p>Boarde Title: {title}</p>
			<Button type="submit" variant="destructive">
				Delete
			</Button>
		</form>
	);
};
