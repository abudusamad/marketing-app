import { Suspense } from "react";
import { OrganizationSettings } from "./components/organizationSe";

const SettingsPage = () => {
	return (
		<div className="w-full">
			<Suspense fallback={<OrganizationSettings.Skeleton />}>
				<OrganizationSettings />
			</Suspense>
		</div>
	);
};

export default SettingsPage;
