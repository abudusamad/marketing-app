import { z } from "zod";

export const UpdateCard = z.object({
	id: z.string(),
	boardId: z.string(),
	title: z
		.string({
			required_error: "Title is required",
			invalid_type_error: "Title must be a string",
		})
		.min(4, {
			message: "Title must be at least 4 characters",
		}),
	description: z
		.string({
			required_error: "Description is required",
			invalid_type_error: "Description must be a string",
		})
		.min(3, {
			message: "Description must be at least 3 characters",
		})
		.optional(),
});
