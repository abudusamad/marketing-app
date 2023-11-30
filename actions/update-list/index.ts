"use sever";

import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { UpdateList } from "./schema";
import { InputType, ReturnType } from "./types";

const hander = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth();
	if (!userId || !orgId) {
		return {
			error: "Unauthorized",
		};
	}

	const { title, id, boardId } = data;

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

		list = await db.list.update({
			where: {
				id,
				boardId,
				board: {
					orgId,
				},
			},
			data: {
				title,
			},
		});
	} catch (error) {
		return {
			error: "Failed to Update List",
		};
	}

	revalidatePath(`/board/${boardId}`);
	return { data: list };
};

export const updateList = createSafeAction(UpdateList, hander);
