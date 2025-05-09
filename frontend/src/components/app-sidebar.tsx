import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { SidebarUser } from "./sidebar-user";
import { useQuery } from "@tanstack/react-query";
import { fetchAllBooths } from "@/api/booth";
import { useAuth } from "@clerk/clerk-react";

export function AppSidebar() {
  const { getToken } = useAuth();

  const { data: booths, isLoading } = useQuery({
    queryKey: ["booths"],
    queryFn: async () => {
      const res = await fetchAllBooths((await getToken())!);

      if (!res.success) {
        return null;
      }

      return res.data;
    },
  });

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarUser />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>My code booths</SidebarGroupLabel>
          <SidebarGroupContent>
            {booths?.map((x) => {
              return (
                <div>
                  <div>{x.title}</div>
                </div>
              );
            })}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
