"use client";

import { AuditLog } from "@prisma/client";
import { Avatar, AvatarImage } from "./ui/avatar";

interface ActivityItemProps {
	data: AuditLog;
}

export const AcvitiyItem = ({ data }: ActivityItemProps) => {
	return (
		<li className="flex items-center gap-x-2">
			<Avatar className="h-8 w-8" />
			<AvatarImage src={data.userImage} />
		</li>
	);
};
