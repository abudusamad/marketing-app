"use client";

import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { Board } from "@prisma/client";
import { useState } from "react";

interface BoardTitleFormProps {
	data: Board;
}

export const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const [title, setTitle] = useState(data.title);

	const disableEditing = () => {
		setIsEditing(false);
	};
	const enableEditing = () => {
		setIsEditing(true);
	};

	const onSumbit = (formData: FormData) => {
		const title = formData.get("title") as string;

		if (title) {
			console.log(title);
		}
	};

	if (isEditing) {
		return (
			<form className="flex items-center gap-x-2">
				<FormInput
					id={title}
					type="text"
					defaultValue={data.title}
					className="tex-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent  border-none"
				/>
			</form>
		);
	}

	return (
		<Button
			onClick={enableEditing}
			variant="tranparent"
			className="font-bold text-lg h-auto p-1 px-2"
		>
			{title}
		</Button>
	);
};
