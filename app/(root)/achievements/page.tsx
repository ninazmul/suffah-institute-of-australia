import { getAllAchievement } from "@/lib/actions/achievement.actions";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IAchievement } from "@/lib/database/models/achievement.model";

const Page = async () => {
  const achievements = await getAllAchievement();

  if (!achievements || achievements.length === 0) {
    return (
      <section className="wrapper my-8 text-center">
        <h2 className="h2-bold">No Achievements Found</h2>
        <p className="p-regular-20">Please check back later.</p>
      </section>
    );
  }

  // Extract unique categories
  const categories: string[] = [
    "All",
    ...Array.from<string>(
      new Set(achievements.map((a: IAchievement) => a.category as string))
    ),
  ];

  return (
    <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
      <h2 className="h2-bold text-center">Explore All Achievements</h2>
      <p className="p-regular-20 md:p-regular-24 text-center">
        Explore events that bring the Muslim community together—
        <br />
        prayers, gatherings, celebrations, and more.
      </p>

      <Tabs defaultValue="All" className="w-full">
        <TabsList className="flex flex-wrap justify-center gap-2">
          {categories.map((cat: string) => (
            <TabsTrigger key={cat} value={cat}>
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((cat) => (
          <TabsContent key={cat} value={cat}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {achievements
                .filter((a: IAchievement) =>
                  cat === "All" ? true : a.category === cat
                )
                .map((a: IAchievement) => (
                  <div
                    key={a._id}
                    className="rounded-2xl shadow-md hover:shadow-lg transition flex flex-col sm:flex-row lg:flex-col overflow-hidden"
                  >
                    {a.image && (
                      <div className="relative w-full sm:w-1/3 lg:w-full min-h-[180px] lg:min-h-[220px]">
                        <Image
                          src={a.image}
                          alt={a.title}
                          fill
                          className="object-cover bg-gray-100 w-full h-full"
                        />
                      </div>
                    )}
                    <div className="p-4 flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="text-lg font-semibold">{a.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {a.category}
                        </p>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm">{a.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default Page;
