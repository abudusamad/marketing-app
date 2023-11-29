import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";

const BoardLayout = async ({
	children,
	params,
}: {
	children: React.ReactNode;
	params: {
		boardId: string;
	};
}) => {
	const { orgId } = auth();
	if (!orgId) {
		return redirect("/select-org");
	}
	const board = await db.board.findUnique({
		where: {
			id: params.boardId,
		},
	});
	if (!board) {
		notFound();
	}
	return (
		<div
			className="relative h-full w-full bg-no-repeat bg-cover bg-center"
			style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
        >
            <div className="absolute inset-0 bg-black/10"/>
			<main className="relative pt-28 h-full">{children}</main>
		</div>
	);
};

export default BoardLayout;
