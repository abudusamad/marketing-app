"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { CopyList } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth();
	if (!userId || !orgId) {
		return {
			error: "Unauthorized",
		};
	}

	const {  id, boardId } = data;

	let list;

	try {
		const lastList = await db.list.findFirst({
			where: { id },
			orderBy:{}
		})
		
	} catch (error) {
		return {
			error: "Failed to copy List",
		};
	}

	revalidatePath(`/board/${boardId}`);
	return { data: list };
};

export const copyList = createSafeAction(CopyList, handler);
