import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";

const OrganizationIdPage = () => {
	async function create(formData: FormData) {
		"use server";
		const title = formData.get("title") as string;
		await db.board.create({
			data: {
				title,
			},
		});
	}

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
