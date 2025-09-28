import { getAllAchievement } from "@/lib/actions/achievement.actions";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      <h2 className="h2-bold">Explore All Achievements</h2>
      <p className="p-regular-20 md:p-regular-24">
        Explore events that bring the Muslim community together—
        <br />
        prayers, gatherings, celebrations, and more.
      </p>

      <Tabs defaultValue="All" className="w-full">
        <TabsList className="flex flex-wrap gap-2">
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
                  <Card
                    key={a._id}
                    className="rounded-2xl shadow-md hover:shadow-lg transition"
                  >
                    {a.image && (
                      <div className="relative w-full h-48">
                        <Image
                          src={a.image}
                          alt={a.title}
                          fill
                          className="object-cover rounded-t-2xl"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-lg">{a.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {a.category}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{a.description}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default Page;
