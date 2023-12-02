import { ActivityItem } from "@/components/activity-item";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Activity } from "lucide-react";
import { redirect } from "next/navigation";

export const ActiviList = async () => {
	const { orgId } = auth();
	if (!orgId) {
		return redirect("/select-org");
	}

	const auditlogs = await db.auditLog.findMany({
		where: {
			orgId,
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	return (
		<div>
			<div className="flex items-start gap-x-3 w-full">
				<Activity className="h-5 w-5 text-neutral-700 mt-0.5" />
				<p className="font-semibold text-neutral-700 mb-2">Activity</p>
			</div>
			<ol className="space-y-4 mt-4">
				<p className="hidden las:block text-xs text-center text-muted-foreground">
					No activity found inside this organization.
				</p>
				{auditlogs.map((log) => (
					<ActivityItem key={log.id} data={log} />
				))}
			</ol>
		</div>
	);
};

ActiviList.Skeleton = function ActivityListSkeleton() {
    return (
			<div>
				<div className="flex items-start gap-x-3 w-full">
					<Skeleton className="h-6 w-6 bg-neutral-200" />
					<Skeleton className="h-6 w-24 mb-2 bg-neutral-200" />
				</div>
				<ol className="space-y-4 mt-4">
					<Skeleton className="h-10 w-fullbg-neutral-200" />
					<Skeleton className="h-10 w-fullbg-neutral-200" />
					<Skeleton className="h-10 w-fullbg-neutral-200" />
					<Skeleton className="h-10 w-fullbg-neutral-200" />
					<Skeleton className="h-10 w-fullbg-neutral-200" />
					<Skeleton className="h-10 w-fullbg-neutral-200" />
					<Skeleton className="h-10 w-fullbg-neutral-200" />
					<Skeleton className="h-10 w-fullbg-neutral-200" />
					<Skeleton className="h-10 w-fullbg-neutral-200" />
					<Skeleton className="h-10 w-fullbg-neutral-200" />
					<Skeleton className="h-10 w-fullbg-neutral-200" />
					<Skeleton className="h-10 w-fullbg-neutral-200" />
				</ol>
			</div>
		);
};

