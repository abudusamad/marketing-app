"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/use-card-modal";
import { fetcher } from "@/lib/fetcher";
import { CardWithList } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Header } from "./header";

export const CardModal = () => {
	const id = useCardModal((state) => state.id);
	const isOpen = useCardModal((state) => state.isOpen);
	const onClose = useCardModal((state) => state.onClose);

	const { data: cardData } = useQuery<CardWithList>({
		queryKey: ["card", id],
		queryFn: async () => fetcher(`/api/cards/${id}`),
	})

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				{cardData?.title}
			</DialogContent>
		</Dialog>
	);
};
