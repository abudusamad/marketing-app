"use server";

import { CreateAuditLog } from "@/lib/create-audit-log";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { decreasetAvailableCount } from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { DeleteBoard } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth();
	if (!userId || !orgId) {
		return {
			error: "Not authenticated",
		};
	}

	const isPro = await checkSubscription();

	const { id } = data;
	let board;

	try {
		board = await db.board.delete({
			where: {
				id,
				orgId,
			},
		});
		if (!isPro) {
			decreasetAvailableCount();
		}

		await CreateAuditLog({
			entityTitle: board.title,
			entityId: board.id,
			entityType: ENTITY_TYPE.BOARD,
			action: ACTION.DELETE,
		});
	} catch (error) {
		return {
			error: "Failed to delete board",
		};
	}

	revalidatePath(`/organization/${orgId}`);
	redirect(`/organization/${orgId}`);
};

export const deleteBoard = createSafeAction(DeleteBoard, handler);
