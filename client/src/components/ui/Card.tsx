import type { ReactNode } from "react";

interface CardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
}

function Card({
  title,
  value,
  icon,
}: CardProps) {
  return (
    <div className="flex justify-between items-center rounded-xl border border-border bg-surface shadow-sm p-4">

      <div>
        <p className="text-sm text-text-secondary">
          {title}
        </p>

        <h3 className="mt-2 text-xl font-bold text-primary capitalize">
          {value}
        </h3>
      </div>

      <div className="rounded-lg bg-success-light p-3 text-success">
        {icon}
      </div>

    </div>
  );
}

export default Card;