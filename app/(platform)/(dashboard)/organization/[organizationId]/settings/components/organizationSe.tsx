
import { OrganizationProfile } from "@clerk/nextjs";

export const OrganizationSettings = () => {
    return (
        <div className="w-full">
            <OrganizationProfile
                appearance={{
                    elements: {
                        rootBox: {
                            boxShadow: "none",
                            width: "100%",
                        },
                        card: {
                            boarder: "1px solid #E5E7EB",
                            boxShadow: "none",
                            width: "100%",
                        }
                    },
                }}
            />
        </div>
    );
}

OrganizationSettings.Skeleton = function OrganizationSettingsSkeleton() {
    return (
        <div className="w-full">
            <OrganizationProfile
                appearance={{
                    elements: {
                        rootBox: {
                            boxShadow: "none",
                            width: "100%",
                        },
                        card: {
                            boarder: "1px solid #E5E7EB",
                            boxShadow: "none",
                            width: "100%",
                        }
                    },
                }}
            />
        </div>
    );
}