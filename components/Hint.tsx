import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./ui/tooltip";

interface HintProps {
	children: React.ReactNode;
	side?: "top" | "bottom" | "left" | "right";
	description: string;
	sideOffset?: number;
}

const Hint = ({
	children,
	side = "bottom",
	description,
	sideOffset = 0,
}: HintProps) => {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={0}>
				<TooltipTrigger>{children}</TooltipTrigger>
				<TooltipContent
					side={side}
					sideOffset={sideOffset}
					className="text-sx max-w-[220px] break-words"
				>
					{description}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default Hint;
