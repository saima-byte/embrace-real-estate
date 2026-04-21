import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp } from "lucide-react";
import { toast } from "sonner";

/* -------------------------------------------------------------------------- */
/*  Schema                                                                     */
/* -------------------------------------------------------------------------- */
const schema = z.object({
  salePrice: z
    .number({ invalid_type_error: "Sale price is required" })
    .positive("Sale price must be greater than 0")
    .max(1_000_000_000, "Sale price seems too large"),
  commissionPct: z
    .number({ invalid_type_error: "Commission is required" })
    .min(0.1, "Commission must be at least 0.1%")
    .max(20, "Commission cannot exceed 20%"),
  closingDate: z
    .string()
    .min(1, "Closing date is required")
    .refine((v) => !isNaN(Date.parse(v)), "Invalid date"),
});

export type CaptureRevenueValues = z.infer<typeof schema>;

export interface CaptureRevenueDeal {
  leadId: string;
  leadName: string;       // e.g. "Skyline Penthouse"
  fromStage?: string;     // e.g. "Contacted"
  toStage?: string;       // e.g. "Closed"
  defaults?: Partial<CaptureRevenueValues>;
}

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  deal: CaptureRevenueDeal | null;
  /** Called after a successful close. Parent should update local state. */
  onClosed?: (payload: CaptureRevenueValues & { leadId: string; estimatedCommission: number }) => void;
}

/* -------------------------------------------------------------------------- */
/*  Mock API — POST /api/closed-deals                                          */
/* -------------------------------------------------------------------------- */
async function postClosedDeal(body: {
  leadId: string;
  salePrice: number;
  commissionPct: number;
  closingDate: string;
  estimatedCommission: number;
}) {
  // Replace with real fetch when backend is wired:
  // return fetch("/api/closed-deals", { method: "POST", body: JSON.stringify(body) }).then(r => r.json());
  await new Promise((r) => setTimeout(r, 600));
  return { ok: true, id: `deal_${Date.now()}`, ...body };
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */
const formatMoney = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });

const parseMoneyInput = (raw: string) => {
  const cleaned = raw.replace(/[^0-9.]/g, "");
  return cleaned ? Number(cleaned) : NaN;
};

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */
export function CaptureRevenueModal({ open, onOpenChange, deal, onClosed }: Props) {
  const today = new Date().toISOString().slice(0, 10);

  const form = useForm<CaptureRevenueValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      salePrice: deal?.defaults?.salePrice ?? 0,
      commissionPct: deal?.defaults?.commissionPct ?? 2.5,
      closingDate: deal?.defaults?.closingDate ?? today,
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = form;

  // Re-seed when a new deal opens
  useEffect(() => {
    if (open && deal) {
      reset({
        salePrice: deal.defaults?.salePrice ?? 0,
        commissionPct: deal.defaults?.commissionPct ?? 2.5,
        closingDate: deal.defaults?.closingDate ?? today,
      });
    }
  }, [open, deal, reset, today]);

  const salePrice = watch("salePrice") || 0;
  const commissionPct = watch("commissionPct") || 0;

  const estimatedCommission = useMemo(
    () => Math.max(0, (Number(salePrice) || 0) * (Number(commissionPct) || 0)) / 100,
    [salePrice, commissionPct]
  );

  const onSubmit = async (values: CaptureRevenueValues) => {
    if (!deal) return;
    try {
      await postClosedDeal({
        leadId: deal.leadId,
        salePrice: values.salePrice,
        commissionPct: values.commissionPct,
        closingDate: values.closingDate,
        estimatedCommission,
      });
      toast.success("Deal closed", {
        description: `${deal.leadName} · ${formatMoney(estimatedCommission)} commission`,
      });
      onClosed?.({ ...values, leadId: deal.leadId, estimatedCommission });
      onOpenChange(false);
    } catch (e) {
      toast.error("Could not close deal", {
        description: e instanceof Error ? e.message : "Try again in a moment.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Capture Revenue Data</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Moving{" "}
            <span className="font-semibold text-foreground">{deal?.leadName ?? "this lead"}</span>{" "}
            to <span className="font-semibold text-foreground">{deal?.toStage ?? "Closed"}</span>.
            Please finalize the financial details to update your sales pipeline reports.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          {/* Sale Price */}
          <div>
            <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Actual Sale Price
            </Label>
            <div className="relative mt-1.5">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base font-semibold text-foreground">
                $
              </span>
              <Input
                inputMode="decimal"
                aria-invalid={!!errors.salePrice}
                value={salePrice ? Number(salePrice).toLocaleString("en-US") : ""}
                onChange={(e) => {
                  const n = parseMoneyInput(e.target.value);
                  setValue("salePrice", isNaN(n) ? 0 : n, { shouldValidate: true });
                }}
                className="h-11 rounded-lg pl-7 text-base font-semibold"
                placeholder="0"
              />
            </div>
            {errors.salePrice && (
              <p className="mt-1 text-xs text-destructive">{errors.salePrice.message}</p>
            )}
          </div>

          {/* Commission + Closing Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Commission (%)
              </Label>
              <Input
                type="number"
                step="0.1"
                min="0"
                max="20"
                aria-invalid={!!errors.commissionPct}
                {...register("commissionPct", { valueAsNumber: true })}
                className="mt-1.5 h-11 rounded-lg"
              />
              {errors.commissionPct && (
                <p className="mt-1 text-xs text-destructive">{errors.commissionPct.message}</p>
              )}
            </div>
            <div>
              <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Closing Date
              </Label>
              <Input
                type="date"
                aria-invalid={!!errors.closingDate}
                {...register("closingDate")}
                className="mt-1.5 h-11 rounded-lg"
              />
              {errors.closingDate && (
                <p className="mt-1 text-xs text-destructive">{errors.closingDate.message}</p>
              )}
            </div>
          </div>

          {/* Estimated Commission */}
          <div className="rounded-lg border border-accent/20 bg-accent/5 p-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent/15 text-accent">
                <TrendingUp className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Estimated Commission
                </p>
                <p className="text-base font-bold text-foreground">
                  {formatMoney(estimatedCommission)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Discard
            </Button>
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="bg-gradient-primary text-primary-foreground hover:opacity-95"
            >
              {isSubmitting ? "Closing…" : "Confirm & Close Deal"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
