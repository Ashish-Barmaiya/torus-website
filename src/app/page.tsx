import { ActivitySection } from "@/components/landing/ActivitySection";
import { ArchitectureSection } from "@/components/landing/ArchitectureSection";
import { BenchmarksSection } from "@/components/landing/BenchmarksSection";
import { CapabilitiesSection } from "@/components/landing/CapabilitiesSection";
import { DocumentationSection } from "@/components/landing/DocumentationSection";
import { EngineeringPrinciplesSection } from "@/components/landing/EngineeringPrinciplesSection";
import { HeroSection } from "@/components/landing/HeroSection";

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-[var(--paper)]">
      <HeroSection />
      <EngineeringPrinciplesSection />
      <CapabilitiesSection />
      <ArchitectureSection />
      <BenchmarksSection />
      <DocumentationSection />
      <ActivitySection />
    </div>
  );
}
