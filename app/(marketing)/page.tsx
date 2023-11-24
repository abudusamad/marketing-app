import { Button } from "@/components/ui/button";
import { Medal } from "lucide-react";
import Link from "next/link";

const MarketingPage = () => {
    return (
			<div className="flex items-center justify-center flex-col">
				<div className="flex items-center justify-center flex-col">
					<div className="mb-4 flex items-center justify-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full capitalize">
						<Medal className=" h-6 w-6 mr-2" />
						No 1 Marketing Webpage
					</div>
					<h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6 ">
						Martketing helps bussiness to grow
					</h1>
					<div className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit">
						Work forward
					</div>
				</div>
				<div className="text-sm md:text-xl text-neutral-500 mt-4 max-w-xs md:max-w-4xl text-center mx-auto">
					If you have more money than brains, you should focus on outbound
					marketing. If you have more brains than money, you should focus on
					inbound marketing. Social media requires that business leaders start
					thinking like small-town shop owners. This means taking the long view
					and avoiding short-term benchmarks to gauge progress. It means
					allowing the personality, heart, and soul of the people who run all
					levels of the business to show.
            </div>
            <Button className="mt-6" size="lg" asChild>
                <Link href="/sig-up">
                    Get Marketing App for free
                </Link>
            </Button>
            
			</div>
		);
}
 
export default MarketingPage;