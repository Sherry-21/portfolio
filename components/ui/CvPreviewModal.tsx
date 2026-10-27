"use client";

import { useEffect, useRef } from "react";
import { PROFILE_DATA } from "@/data/portfolioData";

interface CvPreviewModalProps {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
}

export function CvPreviewModal({ dialogRef }: CvPreviewModalProps) {
  const initializedRef = useRef(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || initializedRef.current) return;
    initializedRef.current = true;

    // Fallback for browsers without <dialog closedby> support (Modern Web Guidance: light-dismiss-a-dialog)
    if (!("closedBy" in HTMLDialogElement.prototype)) {
      const handleBackdropClick = (event: MouseEvent) => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        const isDialogContent =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;

        if (isDialogContent) return;
        dialog.close();
      };

      dialog.addEventListener("click", handleBackdropClick);
      return () => dialog.removeEventListener("click", handleBackdropClick);
    }
  }, [dialogRef]);

  return (
    <dialog
      ref={dialogRef}
      className="cv-modal"
      aria-labelledby="cv-modal-title"
      {...({ closedby: "any" } as Record<string, string>)}
    >
      <div className="cv-modal-inner">
        <div className="cv-modal-header">
          <div>
            <h2 id="cv-modal-title" className="cv-modal-title">
              {PROFILE_DATA.name} — Curriculum Vitae
            </h2>
            <p className="cv-modal-subtitle">
              Fullstack Engineer • Indomobil Group &amp; Blibli.com
            </p>
          </div>
          <div className="cv-modal-actions">
            <a
              href={PROFILE_DATA.cvUrl}
              download="Antonio_Ryanlie_CV.pdf"
              className="btn-gold-sm"
            >
              Download PDF
            </a>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="btn-outline-sm"
            >
              Close
            </button>
          </div>
        </div>
        <iframe
          src={PROFILE_DATA.cvUrl}
          title="Antonio Ryanlie Curriculum Vitae PDF"
          className="cv-modal-iframe"
        />
      </div>
    </dialog>
  );
}
