import { AreaChart } from "@tremor/react";
import { useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
const dataFormatter = (number) =>
  `$${Intl.NumberFormat("tr").format(number).toString()}`;

const Charts = () => {
  const { sales, purchases } = useSelector((state) => state.stock);

  const salesData = sales.map((sale) => ({
    salesAmount: sale.amount,
    date: new Date(sale.createdAt).toLocaleDateString("tr-TR"),
  }));

  const purchasesData = purchases.map((pur) => ({
    purAmount: pur.amount,
    date: new Date(pur.createdAt).toLocaleDateString("tr-TR"),
  }));

  return (
    <div className="flex justify-center items-center flex-wrap gap-4 pt-12">
      <div className="w-full max-w-[600px]">
        <AreaChart
          className="h-[400px] bg-dark-tremor-brand-inverted rounded-xl p-6"
          data={salesData}
          index="date"
          categories={["salesAmount"]}
          colors={["green"]}
          valueFormatter={dataFormatter}
          yAxisWidth={80}
        />
      </div>
      <div className="w-full max-w-[600px]">
        <AreaChart
          className="h-[400px] bg-dark-tremor-brand-inverted rounded-xl p-6"
          data={purchasesData}
          index="date"
          categories={["purAmount"]}
          colors={["blue"]}
          valueFormatter={dataFormatter}
          yAxisWidth={80}
        />
      </div>
    </div>
  );
};
export default Charts;
