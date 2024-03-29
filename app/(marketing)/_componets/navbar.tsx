
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
	return (
		<div className="fixed w-full border-b px-4 h-14 bg-white top-0 flex items-center shadow-sm">
			<div className="md:max-w-screen-2xl mx-auto flex items-center justify-between w-full">
				<Logo />
				<div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
					<Button size="sm" variant="outline" asChild>
						<Link href="sign-in">Login</Link>
					</Button>
					<Button>
						<Link href="sign-up">Get Marketting App for free</Link>
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Navbar;