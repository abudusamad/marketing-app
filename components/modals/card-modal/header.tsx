"use client";

import { FormInput } from "@/components/form/form-input";
import { CardWithList } from "@/types";
import { Layout } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
	data: CardWithList;
}

export const Header = ({ data }: HeaderProps) => {
    const [title, setTitle] = useState(data.title);
    return (
        <div className="flex items-start gap-x-3 mb-6 w-full">
            <Layout  className="w-5 h-5 mt-1 text-neutral-700"/>
            <div>
                
                <form  className="space-y-2">
                    <FormInput
                        id="title"
                        className="font-semibold text-xl px-1 text-neutral-700 bg-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mg-0.5 truncate"
                    
                    />
                </form>
                {title}
                
                in list <span className="underline"> dafdasdsdffsd</span>
           </div>
    </div>
    )
};
