"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { DeleteCard } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth();
	if (!userId || !orgId) {
		return {
			error: "Unauthorized",
		};
	}
	const { id, boardId, listId } = data;

	let card;

	try {
		const list = await db.list.findUnique({
			where: {
				id: boardId,
				board: {
					orgId,
				},
			},
		});
		if (!list) {
			return {
				error: "list not found",
			};
		}
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
	} catch (error) {
		return {
			error: "Failed to delete card",
		};
	}

	revalidatePath(`/board/${boardId}`);
	return { data: card };
};

export const deleteCard = createSafeAction(DeleteCard, handler);
