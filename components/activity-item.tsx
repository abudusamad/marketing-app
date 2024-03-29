"use client";

import { AuditLog } from "@prisma/client";
import { Avatar, AvatarImage } from "./ui/avatar";
import { generateLogMessage } from "@/lib/generate-log-message";
import { format } from "date-fns";

interface ActivityItemProps {
	data: AuditLog;
}

export const ActivityItem = ({ data }: ActivityItemProps) => {
	return (
		<li className="flex items-center gap-x-2">
			<Avatar className="h-8 w-8">
				<AvatarImage src={data.userImage} />
			</Avatar>
			<div className="flex flex-col space-y-0.5">
				<p className="text-sm text-muted-foreground">
					<span className="font-semibold lowercase text-neutral-700">
						{data.userName}
					</span>{generateLogMessage(data)}
				</p>
				<p className="text-xs text-muted-foreground">
					{format(new Date(data.createdAt), "MMMM dd, yyyy 'at' hh:mm a")}
				</p>
			</div>
		</li>
	);
};
