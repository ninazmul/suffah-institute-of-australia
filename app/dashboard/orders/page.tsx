/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllOrders } from "@/lib/actions/order.actions";
import OrderTable from "../components/OrderTable";
import FreeOrderTable from "../components/FreeOrderTable";
import { getAllFreeOrders } from "@/lib/actions/freeorder.actions";
import JsonToExcel from "../components/JsonToExcel";
import { Gift } from "lucide-react";
import { Card } from "@/components/ui/card";

const Page = async () => {
  const paidOrders = await getAllOrders();

  const freeOrders = await getAllFreeOrders();

  const groupedOrders = paidOrders.reduce((acc: any, order: any) => {
    const eventTitle = order?.eventTitle;
    if (!acc[eventTitle]) {
      acc[eventTitle] = [];
    }
    acc[eventTitle].push(order);
    return acc;
  }, {});

  const groupedFreeOrders = freeOrders.reduce((acc: any, order: any) => {
    const eventTitle = order?.event?.title;
    if (!acc[eventTitle]) {
      acc[eventTitle] = [];
    }
    acc[eventTitle].push(order);
    return acc;
  }, {});

  return (
    <>
      <section className=" py-2 md:py-5">
        <div className="wrapper ">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="h3-bold text-center sm:text-left py-2 md:py-5">
                Total Paid Orders{" "}
              </h3>
              <p className="text-3xl font-bold text-primary-900">
                {paidOrders.length}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(groupedOrders).map(([eventTitle, orders]) => (
              <div key={eventTitle}>
                <Card className="flex items-center border border-gray-300 shadow-lg p-6 rounded-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="text-7xl w-1/5 text-center">
                    <Gift className="text-5xl text-orange-500" />
                  </div>
                  <div className="flex-1 ml-4 space-y-2">
                    <p className="text-lg font-semibold text-gray-600 flex items-center gap-2">
                      {eventTitle}
                      <JsonToExcel
                        data={orders as any[]}
                        fileName={`${eventTitle}.xlsx`}
                      />
                    </p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="wrapper my-8">
        <OrderTable orders={paidOrders} />
      </div>

      <section className=" py-2 md:py-5">
        <div className="wrapper ">
          <div className="flex items-center gap-2">
            <h3 className="h3-bold text-center sm:text-left py-2 md:py-5">
              Total Free Orders{" "}
            </h3>
            <p className="text-3xl font-bold text-primary-900">
              {freeOrders.length}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(groupedFreeOrders).map(([eventTitle, orders]) => (
              <div key={eventTitle}>
                <Card className="flex items-center border border-gray-300 shadow-lg p-6 rounded-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="text-7xl w-1/5 text-center">
                    <Gift className="text-5xl text-orange-500" />
                  </div>
                  <div className="flex-1 ml-4 space-y-2">
                    <p className="text-lg font-semibold text-gray-600 flex items-center gap-2">
                      {eventTitle}
                      <JsonToExcel
                        data={orders as any[]}
                        fileName={`${eventTitle}.xlsx`}
                      />
                    </p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="wrapper my-8">
        <FreeOrderTable freeOrders={freeOrders} />
      </div>
    </>
  );
};

export default Page;
