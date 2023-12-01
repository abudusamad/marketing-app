"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { UpdateCardOrder } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth();
	if (!userId || !orgId) {
		return {
			error: "Unauthorized",
		};
	}

	const { items, boardId } = data;

	let cards;

	try {
		// TODO: This should be a transaction
		cards = await Promise.all(
			items.map((card) =>
				db.card.update({
					where: {
						id: card.id,
						list: {
							board: {
								orgId,
							}
						}
					},
					data: {
						title: card.title,
						order: card.order,
						listId: card.listId,
					},
				})
			)
		);


		
	} catch (error) {
		return {
			error: "Failed to Update List",
		};
	}

	revalidatePath(`/board/${boardId}`);
	return { data: cards };
};

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler);
