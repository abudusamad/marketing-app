import { defaultImage } from "@/constant/image";
import { unsplash } from "@/lib/unsplash";
import { cn } from "@/lib/utils";
import { Check, Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import FormError from "./form-error";

interface FormPickerProps {
	id: string;
	errors?: Record<string, string[] | undefined>;
}

export const FormPicker = ({ id, errors }: FormPickerProps) => {
	const { pending } = useFormStatus();

	const [isLoading, setIsLoading] = useState(true);
	const [images, setImages] =
		useState<Array<Record<string, any>>>(defaultImage);
	const [selectedImage, setSelectedImage] = useState(null);

	useEffect(() => {
		const fetchImages = async () => {
			try {
				const result = await unsplash.photos.getRandom({
					collectionIds: ["317099"],
					count: 9 || 12,
				});
				if (result && result.response) {
					const newImages = result.response as Array<Record<string, any>>;
					setImages(newImages);
				} else {
					console.log("Failed to fetch images from unsplash");
				}
			} catch (error) {
				console.log(error);
				setImages(defaultImage);
			} finally {
				setIsLoading(false);
			}
		};
		fetchImages();
	}, []);
	if (isLoading) {
		return (
			<div className="p-6 flex items-center justify-center">
				<Loader2 className="w-6 h-6 text-sky-900 animate-spin" />
			</div>
		);
	}

	return (
		<div className="relative">
			<div className="grid grid-cols-3 gap-2 mb-2">
				{images.map((image) => (
					<div
						key={image.id}
						className={cn(
							"cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted ",
							pending && "opacity-50 hover: cursor-auto"
						)}
						onClick={() => {
							if (pending) return;
							setSelectedImage(image.id);
						}}
					>
						<input
							type="radio"
							id={id}
							name={id}
							className="hidden"
							checked={selectedImage === image.id}
							disabled={pending}
							value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
						/>
						<Image
							src={image.urls.thumb}
							fill
							className="object-cover rounded-sm"
							alt="unsplash image"
						/>
						{selectedImage === image.id && (
							<div className="absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center">
								<Check className="h-4 w-4 text-white" />
							</div>
						)}
						<div
							className="opcacity-0 group-hover:opacity-100 absolute
                            bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg_black/50 transition"
						>
							{image.user.name}
						</div>
					</div>
				))}
			</div>
			<FormError id="image" errors={errors} />
		</div>
	);
};
