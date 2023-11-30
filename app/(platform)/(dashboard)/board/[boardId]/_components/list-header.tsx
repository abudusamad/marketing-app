import { List } from "@prisma/client";
import { useState } from "react";

interface ListHeaderProps {
	data: List;
	onAddCard?: () => void;
}

export const ListHeader = ({ data, onAddCard }: ListHeaderProps) => {
	const [title, setTitle] = useState(data.title);
	const [isEditing, setIsEditing] = useState(false);

	const enableEditing = () => {
		setIsEditing(true);
	};

	const disableEditing = () => {
		setIsEditing(false);
	};
	return (
		<div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
			{isEditing ? (
				<form>
					<input hidden />
				</form>
			) : (
				<div
					onClick={enableEditing}
					className="w-full text-sm px-2.5 py-1 h-7 border-transparent hover:border-input focus:border-input transition  bg-transparent focus:bg-white"
				>
					{title}
				</div>
			)}
		</div>
	);
};
