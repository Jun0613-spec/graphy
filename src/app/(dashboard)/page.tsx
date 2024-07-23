import Banner from "@/components/dashboard/banner";
import ProjectsSection from "@/components/dashboard/projects-section";
import TemplatesSection from "@/components/dashboard/templates-section";

import { protectServer } from "@/lib/utils";

export default async function Home() {
  await protectServer();

  return (
    <div className="flex flex-col space-y-6 max-w-screen-xl mx-auto pb-10">
      <Banner />
      <TemplatesSection />
      <ProjectsSection />
    </div>
  );
}
