import { auth } from "@clerk/nextjs";
import { startCase } from "lodash";
import { OrgControl } from "./_components/org-control";

export async function generateMetadata() {
	const { orgSlug } = auth();
	return {
		title: startCase(orgSlug || "Organization"),
	};
}

const OrganizationIdPage = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<OrgControl />
			{children}
		</>
	);
};

export default OrganizationIdPage;
