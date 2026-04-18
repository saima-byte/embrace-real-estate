import { cn } from "@/lib/utils";

type Status = "new" | "assigned" | "in-progress" | "closed";

const styles: Record<Status, string> = {
  new: "bg-status-new-bg text-status-new",
  assigned: "bg-status-assigned-bg text-status-assigned",
  "in-progress": "bg-status-progress-bg text-status-progress",
  closed: "bg-status-closed-bg text-status-closed",
};

const labels: Record<Status, string> = {
  new: "NEW",
  assigned: "ASSIGNED",
  "in-progress": "IN PROGRESS",
  closed: "CLOSED",
};

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
        styles[status],
        className
      )}
    >
      {labels[status]}
    </span>
  );
}
