"use server";

import { CreateAuditLog } from "@/lib/create-audit-log";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { hasAvailableCount, increamentAvailableCount } from "@/lib/org-limit";
import { auth } from "@clerk/nextjs";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { CreateBoard } from "./schema";
import { InputType } from "./types";

const handler = async (data: InputType) => {
	const { userId, orgId } = auth();

	if (!userId || !orgId) {
		throw new Error("Unauthorized");
	}

	const canCreate = await hasAvailableCount();

	if (!canCreate) {
		return {
			error: "You have reached your limit of boards. Please upgrade your plan",
		};
	}

	const { title, image } = data;

	const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
		image.split("|");

	if (
		!imageId ||
		!imageThumbUrl ||
		!imageFullUrl ||
		!imageLinkHTML ||
		!imageUserName
	) {
		return {
			error: "Missing fields. Failed to create board",
		};
	}
	let board;

	try {
		board = await db.board.create({
			data: {
				title,
				orgId,
				imageId,
				imageThumbUrl,
				imageFullUrl,
				imageLinkHTML,
				imageUserName,
			},
		});

		await increamentAvailableCount();
		await CreateAuditLog({
			entityTitle: board.title,
			entityId: board.id,
			entityType: ENTITY_TYPE.BOARD,
			action: ACTION.CREATE,
		});
	} catch (error) {
		return {
			error: "Failed to create board",
		};
	}
	revalidatePath(`/board/${board.id}`);
	return { data: board };
};

export const createBoard = createSafeAction(CreateBoard, handler);
