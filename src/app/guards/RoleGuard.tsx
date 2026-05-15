import { Outlet } from "react-router-dom";
import type { UserRole } from "@/shared/constants/roles";

interface RoleGuardProps {
  allowed: UserRole[];
}
export function RoleGuard({ allowed: _allowed }: RoleGuardProps) {
  return <Outlet />;
}
