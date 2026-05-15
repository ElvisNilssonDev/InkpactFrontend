import { Outlet } from "react-router-dom";

export function ErrorLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <Outlet />
    </div>
  );
}