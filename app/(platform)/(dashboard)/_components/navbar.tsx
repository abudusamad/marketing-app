import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";

const Navbar = () => {
	return (
		<nav className="fixed top-0 z-50 h-14 px-4 border-b w-full bg-white flex items-center shadow-sm ">
			{/* Mobile Sidebar */}
			<div className="flex items-center gap-x-4">
				<div className="hidden md:flex">
					<Logo />
				</div>
				<Button
					size="sm"
					variant="primary"
					className="rounded-md hidden md:block h-auto py-1.5 px-2"
				>
					create
				</Button>
				<Button
					variant="primary"
					size="sm"
					className="rounded:md block md:hidden "
				>
					<Plus className="h-4 w-4" />
				</Button>
			</div>
			<div className="ml-auto flex items-center gap-x-2">
				<OrganizationSwitcher
					hidePersonal
					afterCreateOrganizationUrl="/organization/:id"
					afterLeaveOrganizationUrl="/select-org"
					afterSelectOrganizationUrl="/organization/:id"
					appearance={{
						elements: {
							rootBox: {
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							},
						},
					}}
				/>
				<UserButton
					afterSignOutUrl="/"
					appearance={{
						elements: {
							avatarBox: {
								height: "2rem",
								width: "2rem",
							},
						},
					}}
				/>
			</div>
		</nav>
	);
};

export default Navbar;
