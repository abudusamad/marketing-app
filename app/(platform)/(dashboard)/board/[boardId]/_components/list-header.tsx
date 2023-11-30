"use client";

import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";
import { ElementRef, useRef, useState } from "react";

import { List } from "@prisma/client";
import { useAction } from "@/hooks/use-action";
import { updateList } from "@/actions/update-list";

import { FormInput } from "@/components/form/form-input";

interface ListHeaderProps {
	data: List;
	onAddCard?: () => void;
}

export const ListHeader = ({ data, onAddCard }: ListHeaderProps) => {
	const [title, setTitle] = useState(data.title);
	const [isEditing, setIsEditing] = useState(false);

	const formRef = useRef<ElementRef<"form">>(null);
	const inputRef = useRef<ElementRef<"input">>(null);

	const enableEditing = () => {
		setIsEditing(true);
		setTimeout(() => {
			inputRef.current?.focus();
			inputRef.current?.select();
		});
	};

	const disableEditing = () => {
		setIsEditing(false);
	};

	const { execute } = useAction(updateList, {
		onSuccess: (data) => {
			toast.success(`List title update to ${data.title}`);
			setTitle(data.title);
			disableEditing();
		},
		onError: (error) => {
			toast.error(error);
		},
	});

	const handleSubmit = (formData: FormData) => {
		const title = formData.get("title") as string;
		const id = formData.get("id") as string;
		const boardId = formData.get("boardId") as string;

		if (title === data.title) {
			disableEditing();
			return;
        }
        
        execute({
            id,
            title,
            boardId
        })

	};
    
    const onBlur = () => {
        formRef.current?.requestSubmit();
    };

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Escape") {
			formRef.current?.requestSubmit();
		}
	};

	useEventListener("keydown", onKeyDown);

	return (
		<div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
			{isEditing ? (
                <form
                    ref={formRef}
                    action={handleSubmit}
                    className="flex-1 px-[2px]">
					<input hidden id="id" name="id" value={data.id} />
					<input hidden id="boardId" name="boardId" value={data.boardId} />
					<FormInput
						ref={inputRef}
						onBlur={onBlur}
						id="title"
						placeholder="Enter list title..."
						defaultValue={title}
						className="w-full text-sm px-2.5 py-1 h-7 border-transparent hover:border-input focus:border-input transition  bg-transparent focus:bg-white font-medium"
                    />
                    <button hidden type="submit"/>
				</form>
			) : (
				<div
					onClick={enableEditing}
					className="w-full text-sm px-2.5 py-1 h-7 border-transparent font-medium"
				>
					{title}
				</div>
			)}
		</div>
	);
};
