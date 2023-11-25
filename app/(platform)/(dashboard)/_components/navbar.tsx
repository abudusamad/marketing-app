import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";

const Navbar = () => {
	return (
		<nav className="fixed z-50 w-full h-14 px-4 border-b bg-white flex items-center shadow-sm">
			{/* Mobile Sidebar */}
			<div className="flex items-center gap-x-4">
				<div className="hidden md:flex">
					<Logo />
				</div>
                <Button
                    variant="primay"
					size="sm"
					className="rounded-sm hidden md:block h-auto py-1.5 px-2"
				>
					create
				</Button>
                <Button
                    variant="primay"
                    size="sm" className="md:hidden block rounded-sm">
					<Plus className="h-6 w-6 " />
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
								height: 30,
								width: 30,
							},
						},
					}}
				/>
			</div>
		</nav>
	);
};

export default Navbar;
