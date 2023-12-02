"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/use-card-modal";
import { fetcher } from "@/lib/fetcher";
import { CardWithList } from "@/types";
import { AuditLog } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Activity } from "./activty";
import { Description } from "./desciptions";
import { Header } from "./header";

export const CardModal = () => {
	const id = useCardModal((state) => state.id);
	const isOpen = useCardModal((state) => state.isOpen);
	const onClose = useCardModal((state) => state.onClose);

	const { data: cardData } = useQuery<CardWithList>({
		queryKey: ["card", id],
		queryFn: async () => fetcher(`/api/cards/${id}`),
	});
	const { data: auditLogData } = useQuery<AuditLog[]>({
		queryKey: ["card", id],
		queryFn: async () => fetcher(`/api/cards/${id}/logs`),
	});

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				{!cardData ? <Header.Skeleton /> : <Header data={cardData} />}
				{cardData?.title}

				<div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
					<div className="col-span-3">
						<div className="w-full space-y-6">
							{!cardData ? (
								<Description.Skeleton />
							) : (
								<Description data={cardData} />
							)}
							{!auditLogData ? (
								<Activity.Sekeleton />
							) : (
								<Activity items={auditLogData} />
							)}
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};
