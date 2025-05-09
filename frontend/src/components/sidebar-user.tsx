import { SidebarMenu, SidebarMenuItem } from "./ui/sidebar";
import { UserButton, useUser } from "@clerk/clerk-react";

export const SidebarUser = () => {
  const { user } = useUser();

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center cursor-pointer space-x-2.5 hover:bg-slate-100 rounded-md px-2 py-0.5">
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: {
                height: "2rem",
                width: "2rem",
                borderRadius: "8px",
              },
              userButtonAvatarImage: {
                borderRadius: "8px",
                padding: "0px",
              },
              userButtonTrigger: {
                borderRadius: "8px",
              },
              userButtonTrigger__open: {
                borderRadius: "8px",
              },
              avatarImage: {
                borderRadius: "8px",
              },
              avatarBox: {
                borderRadius: "8px",
              },
            },
          }}
        />
        <div className="my-3 -space-y-1">
          <div className="text-sm font-medium">{user?.fullName}</div>
          <div className="text-xs">
            {user?.primaryEmailAddress?.emailAddress?.length > 30
              ? user?.primaryEmailAddress?.emailAddress
                  .substring(0, 30)
                  .concat("...")
              : user?.primaryEmailAddress?.emailAddress}
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
