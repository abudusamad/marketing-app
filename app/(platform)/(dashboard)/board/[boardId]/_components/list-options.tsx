"use client";

import { deleteList } from "@/actions/delete-list";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverClose,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/use-action";
import { List } from "@prisma/client";
import { MoreHorizontal, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { ElementRef, useRef } from "react";
import { toast } from "sonner";

interface ListOptionsProps {
	data: List;
	onAddCard: () => void;
}

export const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
    const router = useRouter();

    const closeRef = useRef<ElementRef<"button">>(null);

    const { execute: executeDelte } = useAction(deleteList, {
        onSuccess: (data) => {
            toast.success(`list title ${data.title} deleted`);
            closeRef.current?.click();
            router.refresh();

        },
        onError(error) {
            toast.error(error);
        }
    })


    const onDelete =(formData: FormData) => {
        const id = formData.get("id") as string;
        const boardId = formData.get("boardId") as string;

        executeDelte({
            id, 
            boardId
        })
    }


	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button className="h-auto w-auto p-2" variant="ghost">
					<MoreHorizontal className="w-5 h-5" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
				<div className="text-sm font-medium text-center text-neutral-600 pb-4">
					List actions
				</div>
				<PopoverClose ref={closeRef} asChild>
					<Button
						onClick={onAddCard}
						variant="ghost"
						className="h-auto w-auto absolute p-2 top-2 right-2  text-neutral-600"
					>
						<X className="w-5 h-5" />
					</Button>
				</PopoverClose>
				<Button
					variant="ghost"
					className="rounded_none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
				>
					Add card...
				</Button>
				<form >
					<input hidden name="id" id="id" value={data.id} />
					<input hidden name="boardId" id="boardId" value={data.boardId} />
					<FormSubmit
						variant="ghost"
						className="rounded_none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
					>
						Copy list...
					</FormSubmit>
				</form>
				<Separator/>
				<form action={onDelete}>
					<input hidden name="id" id="id" value={data.id} />
					<input hidden name="boardId" id="boardId" value={data.boardId} />
					<FormSubmit
						variant="ghost"
						className="rounded_none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
					>
						Delete list...
					</FormSubmit>
				</form>
			</PopoverContent>
		</Popover>
	);
};
