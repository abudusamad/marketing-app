"use client";

import { createBoard } from "@/actions/create-board";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";
import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";

interface FormPopoverProps {
	children: React.ReactNode;
	side?: "left" | "right" | "top" | "bottom";
	align?: "start" | "center" | "end";
	sideOffset?: number;
}

export const FormPopover = ({
	children,
	side = "bottom",
	align,
	sideOffset = 0,
}: FormPopoverProps) => {
	const { execute, fieldErrors } = useAction(createBoard, {
		onSuccess: (data) => {
			console.log("success");
		},
		onError: (errors) => {
			console.log(" error ");
		},
	});

	const onSubmit = (formData: FormData) => {
		const title = formData.get("title") as string;
		const image = formData.get("image") as string;

		execute({ title, image });
	};
	return (
		<Popover>
			<PopoverTrigger asChild>{children}</PopoverTrigger>
			<PopoverContent
				align={align}
				side={side}
				sideOffset={sideOffset}
				className="w-80 pt-3"
			>
				<div className="text-sm font-medium text-center text-neutral-600 pb-4">
					create new board
				</div>
				<form action={onSubmit} className="space-y-4">
					<div className="space-y-4">
						<FormInput
							id="title"
							label="Board title"
							type="text"
							error={fieldErrors}
						/>
					</div>
					<FormSubmit className="w-full">Create</FormSubmit>
				</form>
			</PopoverContent>
		</Popover>
	);
};
