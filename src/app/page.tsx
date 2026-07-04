import { ActivitySection } from "@/components/landing/ActivitySection";
import { ArchitectureSection } from "@/components/landing/ArchitectureSection";
import { CapabilitiesSection } from "@/components/landing/CapabilitiesSection";
import { DocumentationSection } from "@/components/landing/DocumentationSection";
import { EngineeringPrinciplesSection } from "@/components/landing/EngineeringPrinciplesSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { PerformanceSection } from "@/components/landing/PerformanceSection";

export default function Home() {
  return (
    <div className="flex flex-col space-y-space-9">
      <HeroSection />
      <EngineeringPrinciplesSection />
      <CapabilitiesSection />
      <ArchitectureSection />
      <PerformanceSection />
      <DocumentationSection />
      <ActivitySection />
    </div>
  );
}

