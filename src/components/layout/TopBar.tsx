import { Bell, Search, Settings, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface TopBarProps {
  searchPlaceholder?: string;
  rightTabs?: { label: string; active?: boolean }[];
  ctaLabel?: string;
  onCta?: () => void;
}

export function TopBar({ searchPlaceholder = "Search leads...", rightTabs, ctaLabel = "Import Lead", onCta }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-6 backdrop-blur">
      <SidebarTrigger className="md:hidden" />
      <div className="relative max-w-md flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={searchPlaceholder}
          className="h-10 rounded-full border-border bg-muted/50 pl-9 text-sm shadow-none focus-visible:ring-1"
        />
      </div>

      {rightTabs && (
        <div className="hidden items-center gap-5 lg:flex">
          {rightTabs.map((t) => (
            <button
              key={t.label}
              className={`text-sm font-medium transition-colors ${
                t.active ? "text-primary border-b-2 border-primary pb-1" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      <div className="ml-auto flex items-center gap-3">
        <Button onClick={onCta} className="h-10 gap-2 rounded-lg bg-gradient-primary px-4 text-primary-foreground shadow-soft hover:opacity-95">
          <Upload className="h-4 w-4" />
          {ctaLabel}
        </Button>
        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-muted-foreground">
          <Bell className="h-[18px] w-[18px]" />
        </Button>
        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-muted-foreground">
          <Settings className="h-[18px] w-[18px]" />
        </Button>
        <Avatar className="h-9 w-9 ring-2 ring-border">
          <AvatarFallback className="bg-gradient-primary text-xs font-semibold text-primary-foreground">SM</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
