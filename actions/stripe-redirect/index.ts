"use server";

import { createSafeAction } from "@/lib/create-safe-action";

import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { StripeRedirect } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth();
	const user = await currentUser();
	if (!userId || !orgId || !user) {
		return {
			error: "Unauthorized",
		};
	}

	const settingUrl = absoluteUrl(`/organization/${orgId}/`);

	let url = "";

	try {
		const orgSubscription = await db.orgSubscription.findUnique({
			where: { orgId },
		});
		if (orgSubscription && orgSubscription.stripeCustomerId) {
			const stripeSession = await stripe.billingPortal.sessions.create({
				customer: orgSubscription.stripeCustomerId,
				return_url: settingUrl,
			});
		} else {
			const stripeSession = await stripe.checkout.sessions.create({
				success_url: settingUrl,
				cancel_url: settingUrl,
				payment_method_types: ["card"],
				mode: "subscription",
				billing_address_collection: "auto",
				customer_email: user.emailAddresses[0].emailAddress,
				line_items: [
					{
						price_data: {
							currency: "USD",
							product_data: {
								name: "Marketing pro",
								description:
									"Unlimited boards, unlimited team members, unlimited everything",
							},
							unit_amount: 2000,
							recurring: {
								interval: "month",
							},
						},
						quantity: 1,
					},
				],
				metadata: {
					orgId,
				},
			});
			url = stripeSession.url || "";
		}
	} catch (error) {
		return {
			error: "Failed to create stripe session",
		};
	}
	revalidatePath(`/organization/${orgId}`);
	return { data: url };
};

export const stripeRedirect = createSafeAction(StripeRedirect, handler);
