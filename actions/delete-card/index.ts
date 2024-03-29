"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { DeleteCard } from "./schema";
import { InputType, ReturnType } from "./types";
import { CreateAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth();
	if (!userId || !orgId) {
		return {
			error: "Unauthorized",
		};
	}
	const { id, boardId} = data;

	let card;

	try {
		card = await db.card.delete({
			where: {
				id,
				list: {
					board: {
						orgId,
					},
				},
			},
		});
		await CreateAuditLog({
			entityTitle: card.title,
			entityId: card.id,
			entityType: ENTITY_TYPE.CARD,
			action: ACTION.DELETE,
		});
	} catch (error) {
		return {
			error: "Failed to delete card",
		};
	}

	revalidatePath(`/board/${boardId}`);
	return { data: card };
};

export const deleteCard = createSafeAction(DeleteCard, handler);
