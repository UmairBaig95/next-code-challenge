interface Sale {
  category: string;
  amount: number;
}

export function processSalesData(sales: Sale[]) {
  let totalSales = 0;
  const categorySales: Record<string, number> = {};
  console.log("====================================");
  console.log("sales", sales);
  console.log("====================================");
  console.log(categorySales);
  console.log("====================================");
  console.log("====================================");
  // Loop through sales data
  for (const sale of sales) {
    totalSales += sale.amount; // Add to total sales

    // Add amount to the category
    if (!categorySales[sale.category]) {
      categorySales[sale.category] = 0;
    }
    categorySales[sale.category] += sale.amount;
  }

  // Find the best category (highest sales)
  let bestCategory = "";
  let highestSales = 0;
  for (const category in categorySales) {
    if (categorySales[category] > highestSales) {
      highestSales = categorySales[category];
      bestCategory = category;
    }
  }

  // Calculate average sales
  const averageSale = totalSales / sales.length;

  return {
    totalSales,
    averageSale,
    bestCategory,
    salesByCategory: categorySales,
  };
}
