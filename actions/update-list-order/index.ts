"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { UpdateListOrder } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth();
	if (!userId || !orgId) {
		return {
			error: "Unauthorized",
		};
	}

	const { items, boardId } = data;

	let lists;

	try {
		// TODO: This should be a transaction
		lists = await Promise.all(
			items.map((item) =>
				db.list.update({
					where: {
						id: item.id,
						board: {
							orgId,
						}
					},
					data: {
						title: item.title,
						order: item.order,
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
	return { data: lists };
};

export const updateListOrder = createSafeAction(UpdateListOrder, handler);
