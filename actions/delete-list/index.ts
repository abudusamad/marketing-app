"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { DeleteList } from "./schema";
import { InputType, ReturnType } from "./types";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { CreateAuditLog } from "@/lib/create-audit-log";

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth();
	if (!userId || !orgId) {
		return {
			error: "Unauthorized",
		};
	}
	const { id, boardId } = data;

	let list;

	try {
		const board = await db.board.findUnique({
			where: {
				id: boardId,
				orgId,
			},
		});
		if (!board) {
			return {
				error: "Board not found",
			};
		}
		list = await db.list.delete({
			where: {
				id,
				boardId,
				board: {
					orgId,
				},
			},
		});
		await CreateAuditLog({
			entityTitle: list.title,
			entityId: list.id,
			entityType: ENTITY_TYPE.LIST,
			action: ACTION.DELETE
		});
	} catch (error) {
		return {
			error: "Failed to delte List",
		};
	}

	revalidatePath(`/board/${boardId}`);
	return { data: list };
};

export const deleteList = createSafeAction(DeleteList, handler);
