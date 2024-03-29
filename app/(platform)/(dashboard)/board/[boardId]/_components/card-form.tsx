"use client";

import { createCard } from "@/actions/create-card";
import { FormSubmit } from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { Plus, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ElementRef, KeyboardEventHandler, forwardRef, useRef } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface CardFormProps {
	listId: string;
	isEditing: boolean;
	enableEditing: () => void;
	disableEditing: () => void;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
	({ listId, isEditing, enableEditing, disableEditing }, ref) => {
		const params = useParams();
		const router = useRouter();
		const formRef = useRef<ElementRef<"form">>(null);

		const { execute, fieldErrors } = useAction(createCard, {
			onSuccess: (data) => {
				toast.success(`card ${data.title} created!`);
				disableEditing();
				formRef.current?.reset();
				router.refresh();
			},
			onError: (error) => {
				toast.error(error);
			},
		});
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				disableEditing();
			}
		};

		useOnClickOutside(formRef, disableEditing);
		useEventListener("keydown", onKeyDown);

		const onTextareaKeydown: KeyboardEventHandler<HTMLTextAreaElement> = (
			e
		) => {
			if (e.key === "Enter" && !e.shiftKey) {
				e.preventDefault();
				formRef.current?.requestSubmit();
			}
		};

		const onSubmit = (formData: FormData) => {
			const title = formData.get("title") as string;
			const listId = formData.get("listId") as string;
			const boardId = params.boardId as string;

			execute({
				title,
				listId,
				boardId
				
			});
		};

		if (isEditing) {
			return (
				<form
					action={onSubmit}
					ref={formRef}
					className="m-1 py-0.5 px-1 space-y-4"
				>
					<FormTextarea
						id="title"
						ref={ref}
						onKeyDown={onTextareaKeydown}
						placeholder="Enter a title for this card ..."
						errors={fieldErrors}
					/>
					<input type="hidden" name="listId" value={listId} />
					<div className="flex items-center gap-x-1">
						<FormSubmit>Add card</FormSubmit>
						<Button onClick={disableEditing} size="sm" variant="ghost">
							<X className="w-4 h-4" />
						</Button>
					</div>
				</form>
			);
		}
		return (
			<div className="pt-2 px-2">
				<Button
					onClick={enableEditing}
					className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm "
					size="sm"
					variant="ghost"
				>
					<Plus className="w-4 h-4 mr-2" />
					Add a Card
				</Button>
			</div>
		);
	}
);

CardForm.displayName = "CardForm";
