import { ArrowUpRight, Check, Flag, Hand, Search, Share2 } from "lucide-react";
import type { FeedAction } from "@/data/types";

const icons: Partial<Record<FeedAction, typeof Share2>> = {
  share: Share2,
  repost: ArrowUpRight,
  report: Flag,
  ask: Hand,
  verify: Search,
  authority: Check,
};

export function ExperimentalActionChoice({
  action,
  label,
  onChoose,
  disabled = false,
}: {
  action: FeedAction;
  label: string;
  onChoose: (action: FeedAction) => void;
  disabled?: boolean;
}) {
  const Icon = icons[action];
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onChoose(action)}
      className={`experimental-action experimental-action-${action}`}
      aria-label={`Escolher: ${label}`}
    >
      {Icon ? <Icon aria-hidden="true" size={17} strokeWidth={1.8} /> : null}
      <span>{label}</span>
      <span aria-hidden="true" className="experimental-action-arrow">
        ↗
      </span>
    </button>
  );
}
