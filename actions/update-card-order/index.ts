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

	const { items ,boardId} = data;

	let cards;

	try {
		// TODO: This should be a transaction
		cards = await Promise.all(
			items.map((item) =>
				db.card.update({
					where: {
						id: item.id,
						list: {
							board: {
								orgId,
							}
						}
					},
					data: {
						title: item.title,
						order: item.order,
						listId: item.listId,
					},
				})
			)
		);

		
	} catch (error) {
		return {
			error: "Failed to pdate card",
		};
	}

	revalidatePath(`/board/${boardId}`);
	return { data: cards };
};

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler);
