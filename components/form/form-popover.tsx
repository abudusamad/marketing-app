"use client";

import { createBoard } from "@/actions/create-board";
import {
	Popover,
	PopoverClose,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";
import { FormInput } from "./form-input";
import { FormPicker } from "./form-picker";
import { FormSubmit } from "./form-submit";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { ElementRef, useRef } from "react";
import { toast } from "sonner";

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
    const router = useRouter();
    const closeRef = useRef<ElementRef<"button">>(null);


	const { execute, fieldErrors } = useAction(createBoard, {
		onSuccess: (data) => {
            toast.success("Board created");
            closeRef.current?.click();
            router.push(`/board/${data.id}`);
		},
		onError: (errors) => {
            toast.error(errors);
            
        }
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
				<PopoverClose ref={closeRef} asChild>
					<Button
						className="h-auto w-auto absolute top-2 right-2 text-neutral-500 transition"
						variant="ghost"
					>
						<X className="w-4 h-4" />
					</Button>
				</PopoverClose>
				<form action={onSubmit} className="space-y-4">
					<div className="space-y-4">
						<FormPicker id="image" errors={fieldErrors} />
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
