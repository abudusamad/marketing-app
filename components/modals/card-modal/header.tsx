"use client";

import { updateCard } from "@/actions/update-card";
import { FormInput } from "@/components/form/form-input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { CardWithList } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { Layout } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

interface HeaderProps {
	data: CardWithList;
}

export const Header = ({ data }: HeaderProps) => {
	const inputRef = useRef<ElementRef<"input">>(null);
	const queryClient = useQueryClient();
	const params = useParams();
	const [title, setTitle] = useState(data?.title);

	const { execute } = useAction(updateCard, {
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ["card", data.id],
			});
			toast.success(`Rename to "${data.title}"`);
			setTitle(data.title);
		},
		onError: (error) => {
			toast.error(error);
		},
	});

	const onBlur = () => {
		inputRef.current?.form?.requestSubmit();
	};

	const onSubmit = (formData: FormData) => {
		const title = formData.get("title") as string;
		const boardId = params.boardId as string;

		if (title === data.title) {
			return;
		}
		execute({
			title,
			boardId,
			id: data.id,
		});
	};

	return (
		<div className="flex items-start gap-x-3 mb-6 w-full">
			<Layout className="w-5 h-5 mt-1 text-neutral-700" />
			<div>
				<form action={onSubmit} className="space-y-2">
					<FormInput
						ref={inputRef}
						id="title"
						onBlur={onBlur}
						defaultValue={title}
						className="font-semibold text-xl px-1 text-neutral-700 bg-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mg-0.5 truncate"
					/>
				</form>
				in list <span className="underline">{data?.list.title}</span>
			</div>
		</div>
	);
};

Header.Skeleton = function HeaderSkeleton() {
	return (
		<div className="flex items-start gap-x-3 mb-6">
			<Skeleton className="h-6 w-6 mt-1 bg-neutral-200" />
			<div>
				<Skeleton className="h-6 w-24 mt-1 bg-neutral-200" />
				<Skeleton className="h-6 w-12 bg-neutral-200" />
			</div>
		</div>
	);
};
