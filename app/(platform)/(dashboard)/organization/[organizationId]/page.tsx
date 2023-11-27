import { create } from "@/actions/create-board";
import { Button } from "@/components/ui/button";

const OrganizationIdPage = () => {
	return (
		<>
			<form action={create}>
				<input
					type="text"
					id="title"
					name="title"
					required
					placeholder="Organization ID"
					className="border-black border p-2"
				/>
				<Button type="submit" size="sm" className="ml-2 pt-4">
					submit
				</Button>
			</form>
		</>
	);
};

export default OrganizationIdPage;
