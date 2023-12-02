import { auth, currentUser } from "@clerk/nextjs";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { db } from "./db";

interface Props {
	entityTitle: string;
	action: ACTION;
	entityType: ENTITY_TYPE;
	entityId: string;
}

export const CreateAuditLog = async (props: Props) => {
	const { orgId } = auth();
	const user = await currentUser();

	try {
		if (!orgId || !user) {
			throw new Error("User cannot be found");
		}

		const { entityTitle, action, entityType, entityId } = props;
		await db.auditLog.create({
			data: {
				orgId,
				action,
				entityType,
				entityId,
				entityTitle,
				userId: user.id,
				userImage: user?.imageUrl,
				userName: user?.firstName + " " + user?.lastName,
			},
		});
	} catch (error) {
		console.log("[AUDIT LOG ERROR]", error);
	}
};
