"use client";

import { ListWithCards } from "@/types";
import { ElementRef, useRef, useState } from "react";
import { ListHeader } from "./list-header";
import { CardForm } from "./card-form";

interface ListItemProps {
	data: ListWithCards;
	index: number;
}

export const ListItem = ({ data, index }: ListItemProps) => {
	const [isEditing, setIsEditing] = useState(false);

	const textareaRef = useRef<ElementRef<"textarea">>(null);

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

	return (
		<li className="shrink-0 h-full w-[272px] select-none px-2">
			<div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
				<ListHeader onAddCard={enableEditing} data={data} />
				<CardForm
					listId={data.id}
					ref={textareaRef}
					isEditing={isEditing}
					enableEditing={enableEditing}
					disableEditing={disableEditing}
				
				/>
			</div>
			
		</li>
	);
};
