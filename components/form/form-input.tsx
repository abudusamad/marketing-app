"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import FormError from "./form-error";

interface FormInputProps {
	id: string;
	label?: string;
	type?: string;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	error?: Record<string, string[] | undefined>;
	className?: string;
	defaultValue?: string;
	onBlur?: () => void;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
	(
		{
			id,
			label,
			type,
			placeholder,
			required,
			disabled,
			error,
			className,
			defaultValue = "",
			onBlur,
		},
		ref
	) => {
		const { pending } = useFormStatus();
		return (
			<div className="space-y-2">
				<div className="space-y-1">
					{label ? (
						<Label
							htmlFor={id}
							className="text-sm font-semibold text-neutral-700"
						>
							{label}
						</Label>
					) : null}
					<Input
						onBlur={onBlur}
						defaultValue={defaultValue}
						id={id}
						ref={ref}
						type={type}
						placeholder={placeholder}
						required={required}
						disabled={pending || disabled}
						name={id}
						className={cn("text-sm px-2 py-1 h-7", className)}
						aria-describedby={`${id}-error`}
					/>
                </div>
                <FormError id={id} errors={error} />
			</div>
		);
	}
);

FormInput.displayName = "FormInput";
