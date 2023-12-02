"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { CopyCard } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth();
	if (!userId || !orgId) {
		return {
			error: "Unauthorized",
		};
	}

	const { id, boardId } = data;

	let card;

	try {
		const cardToCopy = await db.card.findUnique({
			where: {
				id,
				list: {
					board: {
						orgId,
					},
				},
			},
		});
		if (!cardToCopy) {
			return {
				error: "card not found",
			};
		}

		const lastCard = await db.card.findFirst({
			where: { listId: cardToCopy.listId },
			orderBy: { order: "desc" },
			select: { order: true },
		});

		const newList = lastCard ? lastCard.order + 1 : 1;

		// Copy card
		card = await db.card.create({
			data: {
				title: `${cardToCopy.title}-Copy`,
				description: cardToCopy.description,
				order: newList,
				listId: cardToCopy.listId,
			},
		});
	} catch (error) {
		return {
			error: "Failed to copy",
		};
	}

	revalidatePath(`/board/${boardId}`);
	return { data: card };
};

export const copyCard = createSafeAction(CopyCard, handler);
