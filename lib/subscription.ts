import { auth } from "@clerk/nextjs";
import { db } from "./db";
const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
	const { orgId } = auth();

	if (!orgId) {
		throw new Error("Unauthorized");
	}

	const orgSubscription = await db.orgSubscription.findUnique({
		where: { orgId },
		select: {
			stripeCurrentPeriodEnd: true,
			stripeSubscriptionId: true,
			stripeCustomerId: true,
			stripePriceId: true,
		},
	});

	if (!orgSubscription) {
		throw new Error("No subscription found");
	}

	const isValid =
        orgSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();
    
    return !!isValid;
};
