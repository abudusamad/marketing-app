import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { Info } from "../_components/info";
import { ActiviList } from "./_components/activity-list";

const ActivityPage = () => {
	return (
		<div className="w-full">
			<Info />
			<Separator className="my-2" />
			<Suspense fallback={<ActiviList.Skeleton />}>
				<ActiviList />
			</Suspense>
		</div>
	);
};

export default ActivityPage;
