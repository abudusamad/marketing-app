import Hint from "@/components/Hint";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { HelpCircle, User2 } from "lucide-react";
import { redirect } from "next/navigation";

export const BoardList = async () => {
	const { orgId } = auth();
	if (!orgId) {
		return redirect("/select-org");
	}
	const boards = await db.board.findMany({
		where: {
			orgId,
		},
		orderBy: {
			createdAt: "desc",
		},
	});
	return (
		<div>
			<div className="flex items-center font-semibold text-lg text-neutral-700">
				<User2 className="w-6 h-6 mr-2" />
				Your board
			</div>
			<div className="grid grid-cols-2 sm:grid-col-3 lg:grid-cols-4 gap-4 py-4">
				<div className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition">
					<p className="text-sm">Create New bpard</p>
                    <span className="text-xs">5 remaining</span>
                    <Hint
                        sideOffset={50}
                        description="You can create up to 5 boards in the free plan."
                    
                    >
                        <HelpCircle className="absolute bottom-2 right-2 h-[14px] w=[14px]"/>
                    </Hint>
				</div>
			</div>
		</div>
	);
};
