import { useOrganization } from "@clerk/nextjs";
import { useLocalStorage } from "usehooks-ts";

interface SidebarProps {
    storageKey?: string;
}

const Sidebar = ({ storageKey="t-sidebar-state" }: SidebarProps) => {
    const [exanded, setExpanded] = useLocalStorage<Record<string, any>>(
        storageKey,
        {}
    )
    const { organization: activeOrganization, isLoaded: isLoadedorg } = useOrganization();

    return (<div className="h-full">
        Sidebar Page
    </div> );
}
 
export default Sidebar;