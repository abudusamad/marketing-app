"use client";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

import { ListWithCards } from "@/types";
import { useEffect, useState } from "react";
import { ListForm } from "./list-form";
import { ListItem } from "./list-item";

interface ListContainerProps {
	data?: ListWithCards[];
	boardId: string;
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
	const [orderedData, setOrderedData] = useState(data);

	useEffect(() => {
		setOrderedData(data);
	}, [data]);
	return (
		<DragDropContext onDragEnd={() => {}}>
			<Droppable droppableId={boardId} type="list">
				{(provided) => ( 
					<ol
						{...provided.droppableProps}
						ref={provided.innerRef}
						className="flex gap-x-3 h-full"
					>
						{orderedData?.map((list, index) => {
							return <ListItem key={list.id} index={index} data={list} />;
						})}
						{provided.placeholder}	
						<ListForm />
						<div className="flex-shink-0 w-1" />
					</ol>
				)}
			</Droppable> 
		</DragDropContext>
	);
};
