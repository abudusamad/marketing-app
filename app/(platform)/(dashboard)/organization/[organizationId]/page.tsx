import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { BoardList } from "./_components/board-list";
import { Info } from "./_components/info";

const OrganizationIdPage = async () => {
	return (
		<div className="w-full mb-20">
			<Info />
			<Separator className="my-4" />
			<div className="px-2 md:px-4">
				<Suspense fallback={<BoardList.Skeleton />}>
					<BoardList />
				</Suspense>
			</div>
		</div>
	);
};

export default OrganizationIdPage;
