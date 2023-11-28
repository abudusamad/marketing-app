import { OrgControl } from "./_components/org-control";


const OrganizationIdPage = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (<>

        <OrgControl/>
        {children}
        

    </> );
}
 
export default OrganizationIdPage;