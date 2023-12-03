"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import Image from "next/image";

interface InfoProps {
	isPro: boolean;
}

export const Info = ({ isPro }: InfoProps) => {
	const { organization, isLoaded } = useOrganization();
	if (!isLoaded) {
        return (
            <Info.Skeleton/>
        );
	}
	return (
		<div className="flex items-center gap-x-4">
			<div className="w-[60px] h-[60px] relative">
				<Image
					fill
					src={organization?.imageUrl!}
					alt="Organization Image"
					className="rounded-md object-cover"
				/>
			</div>
			<div className="space-y-1">
				<p className="font-semibold text-xl ">{organization?.name}</p>
				<div className="flex items-center text-xs text-muted-foreground">
					<CreditCard className="w-4 h-4 mr-1" />
					{isPro ? "Pro" : "Free"}
				</div>
			</div>
		</div>
	);
};

Info.Skeleton = function SkeletonInfo() {
	return (
		<div className="flex items-center gap-x-4">
			<div className="w-[60px] h-[60px] relative">
				<Skeleton className="w-full h-full absolute" />
            </div>
            <div className="space-y-2">
                <Skeleton className="w-24 h-10" />
                <div className="flex items-center">
                    <Skeleton className="w-6 h-4 mr-2" />
                    <Skeleton className="w-10 h-4" />

                </div>

            </div>
		</div>
	);
};
