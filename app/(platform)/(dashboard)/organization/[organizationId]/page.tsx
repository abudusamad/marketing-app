import { create } from "@/actions/create-board";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { Board } from "./Board";

const OrganizationIdPage = async() => {
    const boards = await db.board.findMany();
	return (
		<div className="flex flex-col space-y-4" >
			<form action={create}>
				<input
					type="text"
					id="title"
					name="title"
					required
					placeholder="Organization ID"
					className="border-black border p-2"
				/>
				<Button type="submit" size="sm" className="ml-2 pt-4">
					submit
				</Button>
            </form>
            {boards.map((board) => (
                <Board key={board.id} title={board.title} id={board.id} />
            ))}
            
		</div>
	);
};

export default OrganizationIdPage;
