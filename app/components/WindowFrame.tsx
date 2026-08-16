import type { ReactNode } from "react";

type WindowFrameProps = {
  title: string;
  meta?: string;
  className?: string;
  children: ReactNode;
};

export function WindowFrame({ title, meta, className = "", children }: WindowFrameProps) {
  return (
    <div className={`window-frame ${className}`.trim()}>
      <div className="window-frame__bar" aria-hidden="true">
        <span className="window-frame__controls"><i /><i /><i /></span>
        <span className="window-frame__stripes" />
        <b>{title}</b>
        <span className="window-frame__stripes" />
        {meta ? <span className="window-frame__meta">{meta}</span> : null}
      </div>
      {children}
    </div>
  );
}
