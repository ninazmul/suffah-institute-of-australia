import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { getAllIslamicResources } from "@/lib/actions/islamicResource.actions";
import IslamicResourceForm from "../components/IslamicResourceForm";
import IslamicResourceTable from "../components/IslamicResourceTable";
import CommunityServiceResourceForm from "../components/CommunityServiceResourceForm";
import CommunityServiceResourceTable from "../components/CommunityServiceResourceTable";
import { getAllCommunityServiceResources } from "@/lib/actions/communityServiceResource";

const Page = async () => {
  const resources = await getAllIslamicResources();
  const communityServiceResources = await getAllCommunityServiceResources();

  return (
    <>
      <section className=" py-2 md:py-5">
        <Sheet>
          <div className="wrapper flex flex-wrap justify-between items-center">
            <h3 className="h3-bold text-center sm:text-left">
              Islamic Resources
            </h3>
            <SheetTrigger>
              <Button size="lg" className="rounded-full">
                Create Islamic Resource
              </Button>
            </SheetTrigger>
          </div>

          <SheetContent className="bg-white">
            <SheetHeader>
              <SheetTitle>Create New Resource</SheetTitle>
              <SheetDescription>
                Use this form to create a new islamic resource within the
                system. Fill out all required fields accurately to ensure proper
                setup and access permissions for the new resource.
              </SheetDescription>
            </SheetHeader>
            <div className="py-5">
              <IslamicResourceForm type="Create" />
            </div>
          </SheetContent>
        </Sheet>
      </section>

      <div className="wrapper my-8">
        <IslamicResourceTable resources={resources} />
      </div>

      <section className=" py-2 md:py-5">
        <Sheet>
          <div className="wrapper flex flex-wrap justify-between items-center">
            <h3 className="h3-bold text-center sm:text-left">
              Community Service Resources
            </h3>
            <SheetTrigger>
              <Button size="lg" className="rounded-full">
                Create Community Service Resource
              </Button>
            </SheetTrigger>
          </div>

          <SheetContent className="bg-white">
            <SheetHeader>
              <SheetTitle>Create New Resource</SheetTitle>
              <SheetDescription>
                Use this form to create a new community service resource within
                the system. Fill out all required fields accurately to ensure
                proper setup and access permissions for the new resource.
              </SheetDescription>
            </SheetHeader>
            <div className="py-5">
              <CommunityServiceResourceForm type="Create" />
            </div>
          </SheetContent>
        </Sheet>
      </section>

      <div className="wrapper my-8">
        <CommunityServiceResourceTable resources={communityServiceResources} />
      </div>
    </>
  );
};

export default Page;
