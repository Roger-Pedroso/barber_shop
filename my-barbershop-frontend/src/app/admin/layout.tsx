import { Button } from "@/components/ui/button";
import {
  ScissorsIcon,
  PersonIcon,
  CalendarIcon,
  ResetIcon,
  ActivityLogIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

interface RootLayoutProps {
  children: React.ReactNode;
}
export default function AdminLayout({ children }: RootLayoutProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        width: "100%",
        backgroundColor: "darkgray",
      }}
    >
      <div
        className="flex flex-col justify-between items-center self-start"
        style={{ backgroundColor: "black", height: "100vh", width: "5%" }}
      >
        <div className="space-y-5">
          <div className="pt-5">
            <Link href="/admin/appointments">
              <Button variant="outline" size="icon">
                <CalendarIcon className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div>
            <Link href="/admin/barbers">
              <Button variant="outline" size="icon">
                <ScissorsIcon className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div>
            <Link href="/admin/clients">
              <Button variant="outline" size="icon">
                <PersonIcon className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div>
            <Link href="/admin/services">
              <Button variant="outline" size="icon">
                <ActivityLogIcon className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="p-3">
          <Link href="/">
            <Button variant="outline" size="icon">
              <ResetIcon className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
      <div className="w-full" style={{ height: "100vh" }}>
        {children}
      </div>
    </div>
  );
}
