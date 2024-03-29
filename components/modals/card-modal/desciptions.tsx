import { updateCard } from "@/actions/update-card";
import { FormSubmit } from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { CardWithList } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { AlignLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { title } from "process";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface DescriptionProps {
	data: CardWithList;
}

export const Description = ({ data }: DescriptionProps) => {
    const params = useParams();
    const queryClient = useQueryClient();


	const [isEditing, setIsEditing] = useState(false);
	const textareaRef = useRef<ElementRef<"textarea">>(null);
	const formRef = useRef<ElementRef<"form">>(null);

	const enableEditing = () => {
		setIsEditing(true);
		setTimeout(() => {
			textareaRef.current?.focus();
			textareaRef.current?.select();
		});
	};

	const disableEditing = () => {
		setIsEditing(false);
    };

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Escape") {
			disableEditing();
		}
	};
 useEventListener("keydown", onKeyDown);
    useOnClickOutside(formRef, disableEditing);
    
    const { execute, fieldErrors } = useAction(updateCard, {
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey:["card-logs", data.id]
            })
            toast.success(`Card "${data.title}" updated`);
            disableEditing();
        },
        onError: (error) => {
            toast.error(error);
        }
    })

    const onSubmit = (formData: FormData) => {
        const description = formData.get("description") as string;
        const boardId = params.boardId as string;

        execute({
            description,
            boardId,
            id: data.id,
            title
        })
    
    }

	return (
		<div className="flex items-start gap-x-3 w-full">
			<AlignLeft className="w-5 h-5 mt-0.5 text-neutral-700" />
			<div className="w-full">
				<p className="font-semibold text-neutral-700 mtb-2">Description</p>
				{isEditing ? (
					<form action={onSubmit} ref={formRef} className="space-y-2">
						<FormTextarea
                            ref={textareaRef}
                            errors={fieldErrors}
							id="description"
							defaultValue={data?.description || undefined}
							placeholder="Add more detailed description ..."
						/>
						<div className="flex items-center gap-x-2">
							<FormSubmit>Save</FormSubmit>
							<Button
								type="button"
								variant="ghost"
								size="sm"
								onClick={disableEditing}
							>
								Cancel
							</Button>
						</div>
					</form>
				) : (
					<div
						onClick={enableEditing}
						role="button"
						className="min-h-[78px] bg-neutral-200 textsm font-mediun  py-3 px-3.5 rounded-md"
					>
						{data?.description || "Add a more detailed description..."}
					</div>
				)}
			</div>
		</div>
	);
};

Description.Skeleton = function DescriptionSkeleton() {
	return (
		<div className="flex items-start gap-x-3 w-full">
			<Skeleton className="h-6 w-6 bg-neutral-200" />
			<div className="w-full">
				<Skeleton className="h-6 w-24 mb-2 bg-neutral-200" />
				<Skeleton className="h-[78px] w-full bg-neutral-200" />
			</div>
		</div>
	);
};
