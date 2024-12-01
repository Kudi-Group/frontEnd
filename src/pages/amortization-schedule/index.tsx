import { useEffect, useState } from "react"
import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"
import { Header } from "@/components/header";

async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    const loanData = [
        {
            id: "1",
            dueDate: new Date("2024-01-01"),
            amount: 500,
            interest: 25,
            principal: 475,
            remainingBalance: 4525,
        },
        {
            id: "2",
            dueDate: new Date("2024-02-01"),
            amount: 500,
            interest: 23,
            principal: 477,
            remainingBalance: 4048,
        },
        {
            id: "3",
            dueDate: new Date("2024-02-02"),
            amount: 500,
            interest: 23,
            principal: 477,
            remainingBalance: 4048,
        },
    ];

    // Format dates and numbers dynamically
    const formattedLoanData = loanData.map((item) => ({
        id: item.id,
        dueDate: item.dueDate.toLocaleDateString("en-GB"), // Format as dd-MM-yyyy
        amount: item.amount.toFixed(2), // 2 decimal places
        interest: item.interest.toFixed(2),
        principal: item.principal.toFixed(2),
        remainingBalance: item.remainingBalance.toFixed(2),
    }));

    return formattedLoanData;

}

export function SchedulePage() {
    const [data, setData] = useState<Payment[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await getData();
            setData(result);
        };

        fetchData(); // Call the async function inside useEffect
    }, []);


    return (
        <div className="xs:px-6 py-10 overflow-auto space-y-4">
            <Header />
            <div className="lg:px-8">
            <DataTable columns={columns} data={data} />
            </div>
        </div>
    )
}
