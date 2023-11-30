import { z } from "zod";

export const CreateCard= z.object({
	title: z
		.string({
			required_error: "Title is required",
			invalid_type_error: "Title must be a string",
		})
		.min(3, {
			message: "Title must be at least 3 characters long",
		}),
	boardId: z.string({
		required_error: "Board ID is required",
		invalid_type_error: "Board ID must be a string",
	}),
	listId: z.string({
		required_error: "Title ID is required",
		invalid_type_error: "Title ID must be a string",
	}),
});
