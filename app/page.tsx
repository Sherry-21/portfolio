"use client";

import { useRef } from "react";
import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { HeroSection } from "@/components/sections/HeroSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ExperienceJourney } from "@/components/sections/ExperienceJourney";
import { CredentialsSection } from "@/components/sections/CredentialsSection";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { CvPreviewModal } from "@/components/ui/CvPreviewModal";

export default function HomePage() {
  const cvDialogRef = useRef<HTMLDialogElement>(null);

  const handleOpenCvModal = () => {
    cvDialogRef.current?.showModal();
  };

  return (
    <>
      <ScrollProgress />
      <AmbientBackground />

      <main className="portfolio-shell">
        <HeroSection onOpenCvModal={handleOpenCvModal} />
        <SkillsSection />
        <ExperienceJourney />
        <CredentialsSection />
        <ContactFooter />
      </main>

      <CvPreviewModal dialogRef={cvDialogRef} />
    </>
  );
}
