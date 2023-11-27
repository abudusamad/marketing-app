import MobileSidebar from "../_components/mobile-sidebar";
import { Sidebar } from "../_components/sidebar";


const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="pt-20 md:pt-24 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto">
			<MobileSidebar/>
			<div className="flex gap-x-7">
				<div className="w-64 srink-0 hidden md:block">
					<Sidebar />
				</div>

				{children}
			</div>
		</main>
	);
};

export default OrganizationLayout;
