import { ArchitectureHero } from "@/components/architecture/ArchitectureHero";
import { ComponentDeepDive } from "@/components/architecture/ComponentDeepDive";
import { ExecutionPipeline } from "@/components/architecture/ExecutionPipeline";
import { HeaderTransformation } from "@/components/architecture/HeaderTransformation";
import { HotReloadDemo } from "@/components/architecture/HotReloadDemo";
import { LoadBalancerDemo } from "@/components/architecture/LoadBalancerDemo";
import { RequestWalkthrough } from "@/components/architecture/RequestWalkthrough";
import { RoutingVisualization } from "@/components/architecture/RoutingVisualization";
import { SourceTree } from "@/components/architecture/SourceTree";

export default function ArchitecturePage() {
  return (
    <>
      <ArchitectureHero />
      <ExecutionPipeline />
      <RequestWalkthrough />
      <ComponentDeepDive />
      <RoutingVisualization />
      <LoadBalancerDemo />
      <HeaderTransformation />
      <HotReloadDemo />
      <SourceTree />
    </>
  );
}
