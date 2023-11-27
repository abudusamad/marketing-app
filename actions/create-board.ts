"use server";
import z from "zod";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const CreateBoard = z.object({
	title: z.string(),
});

export async function create(formData: FormData) {
	const { title } = CreateBoard.parse({
		title: formData.get("title"),
	});
	await db.board.create({
		data: {
			title,
		},
	});
	revalidatePath(
		"http://localhost:3000/organization/org_2Yj0ov2icuNyQbnWUECEaATeLaK"
	);
}
