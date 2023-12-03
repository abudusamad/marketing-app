"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { DeleteBoard } from "./schema";
import { InputType, ReturnType } from "./types";
import { redirect } from "next/navigation";
import { CreateAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { decreasetAvailableCount } from "@/lib/org-limit";

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth();
	if (!userId || !orgId) {
		return {
			error: "Not authenticated",
		};
	}

	const { id } = data;
	let board;

	try {
		board = await db.board.delete({
			where: {
				id,
				orgId,
			},
		});

	decreasetAvailableCount();
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
