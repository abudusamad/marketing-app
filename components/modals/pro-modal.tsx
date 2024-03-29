"use client";

import { stripeRedirect } from "@/actions/stripe-redirect";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAction } from "@/hooks/use-action";
import { useProModal } from "@/hooks/use-pro-modal";
import Image from "next/image";
import { toast } from "sonner";

export const ProModal = () => {
	const proModal = useProModal();

	const { execute, isLoading } = useAction(stripeRedirect, {
		onSuccess: (data) => {
			window.location.href = data;
		},
		onError: (error) => {
			toast.error(error);
		},
	});

	const onSubmit = () => {
		execute({});
	};

	return (
		<Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
			<DialogContent className="max-w-md p-0 overflow-hidden">
				<div className="aspect-video relative flex items-center justify-center">
					<Image src="/hero.svg" alt="Hero" fill className="object cover" />
				</div>
				<div className="text-neutral-700 mx-auto space-y-6 p-6">
					<h2 className="font-semibold text-neutral-600">
						Upgrade to Marketing app for Pro features
					</h2>
					<p className="tex-xs font-semibold text-xl">
						Explore the best of Marketing App today!
					</p>
					<div className="pl-3">
						<ul className="text-sm list-disc">
							<li>Unlimited boards</li>
							<li>Advanced checklists</li>
							<li>Admin and security features</li>
							<li>And more!</li>
						</ul>
					</div>
					<Button
						onClick={onSubmit}
						disabled={isLoading}
						className="w-full mt-4"
						variant="primary"
					>
						Upgrade
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
