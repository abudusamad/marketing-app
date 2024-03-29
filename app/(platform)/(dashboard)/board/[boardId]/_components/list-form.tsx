"use client";

import { createList } from "@/actions/create-list";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { Plus, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ElementRef, Key, useRef, useState } from "react";
import { toast } from "sonner";
import { ListWrapper } from "./list-wrapper";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

export const ListForm = () => {
	const [isEditing, setIsEditing] = useState(false);
	const router = useRouter();
	const params = useParams();

	const formRef = useRef<ElementRef<"form">>(null);
	const inputRef = useRef<ElementRef<"input">>(null);

	const enableEditing = () => {
		setTimeout(() => {
			inputRef.current?.focus();
			inputRef.current?.select();
		});
		setIsEditing(true);
	};

	const disableEditing = () => {
		setIsEditing(false);
	};

	const { execute, fieldErrors } = useAction(createList, {
		onSuccess: (data) => {
			toast.success(`List ${data.title} created!`);
			disableEditing();
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
    }

    useEventListener("keydown", onKeyDown);
    useOnClickOutside(formRef, disableEditing);

	const onSubmit = (formData: FormData) => {
		const title = formData.get("title") as string;
		const boardId = formData.get("boardId") as string;

		execute({
			boardId,
			title,
		});
	};

	if (isEditing) {
		return (
			<ListWrapper>
				<form
                    action={onSubmit}
                    ref={formRef}
					className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
				>
                    <FormInput
                        ref={inputRef}
                        error={fieldErrors}
						id="title"
						className="text-sm px-2 py-1 h-7 font-medium boarder-transparent hover:border-input focus:border-input transition"
						placeholder="Enter list title..."
					/>
					<input hidden value={params.boardId} name="boardId" />
					<div className="flex items-center gap-x-1">
						<FormSubmit>Add List</FormSubmit>
						<Button size="sm" variant="ghost" onClick={disableEditing}>
							<X className="w-5 h-5" />
						</Button>
					</div>
				</form>
			</ListWrapper>
		);
	}

	return (
		<ListWrapper>
			<Button
				onClick={enableEditing}
				className="w-full rounded_md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm text-black"
			>
				<Plus className="w-4 h-4 mr-2" />
				Add a list
			</Button>
		</ListWrapper>
	);
};
