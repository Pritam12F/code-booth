import { LandingPage } from "@/components/landing";
import SidebarWrapper from "@/components/sidebar-wrapper";
import { useAuth } from "@clerk/clerk-react";

export default function Home() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return (
      <div className="w-screen h-screen">
        <LandingPage />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen">
      <SidebarWrapper>Hi there</SidebarWrapper>
    </div>
  );
}
