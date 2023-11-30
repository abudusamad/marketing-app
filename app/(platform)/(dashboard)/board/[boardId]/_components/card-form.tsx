"use client";

import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { forwardRef } from "react";

interface CardFormProps {
	listId: string;
	isEditing: boolean;
	enableEditing: () => void;
	disableEditing: () => void;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
    ({ listId, isEditing, enableEditing, disableEditing }, ref) => {
        

        if (isEditing) {
            return (
                <form
                    className="m-1 py-0.5 px-1 space-y-4"
                
                >
                    <input
                        type="hidden"
                        name="listId"
                        value={listId}
                    
                    />
                    <div className="flex items-center gap-x-1">
                        <FormSubmit>
                            Add card
                        </FormSubmit>
                        <Button
                            onClick={disableEditing}
                            size="sm"
                            variant="ghost"
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                </form>
            )
        }
		return (
			<div className="pt-2 px-2">
                <Button
                    onClick={enableEditing}
                    className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm "
                    size="sm"
                    variant="ghost"
                
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add a Card
                </Button>
			</div>
		);
	}
);


CardForm.displayName = "CardForm";