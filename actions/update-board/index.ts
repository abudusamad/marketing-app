"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth();
	if (!userId || !orgId) {
		return {
			error: "Not authenticated",
		};
	}

	const { title, id } = data;
	let board;

	try {
		board = await db.board.update({
			where: {
				id,
				orgId,
			},
			data: {
				title,
			},
		});
	} catch (error) {
		return {
			error: "Failed to update board",
		};
	}

	revalidatePath(`/board/${id}`);
	return { data: board };
};
