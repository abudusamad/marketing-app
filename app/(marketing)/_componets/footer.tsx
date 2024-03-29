import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";

export const Footer = () => {
    return (
			<div className="fixed w-full bottom-0 p-4 bg-white border-t shadow-sm">
				<div className="md:max-w-screen-2xl mx-auto flex items-center justify-between">
					<Logo />
					<div className="space-x-4 md:block md:w-auto w-full flex items-center justify-between">
                    <Button variant="ghost" size="sm">
                        Privacy Police
                        </Button>
                    <Button size="sm">
                        terms of service
                        </Button>
					</div>
				</div>
			</div>
		);
};