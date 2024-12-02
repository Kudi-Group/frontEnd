// import { useEffect, useState } from "react"
// import { Payment, columns } from "./columns"
// import { DataTable } from "./data-table"
// import { Header } from "@/components/header";


// async function getData(): Promise<Payment[]> {
//     // Fetch data from your API here.
//     const loanData = [
//         {
//             id: "1",
//             dueDate: new Date("2024-01-01"),
//             amount: 500,
//             interest: 25,
//             principal: 475,
//             remainingBalance: 4525,
//         },
//         {
//             id: "2",
//             dueDate: new Date("2024-02-01"),
//             amount: 500,
//             interest: 23,
//             principal: 477,
//             remainingBalance: 4048,
//         },
//         {
//             id: "3",
//             dueDate: new Date("2024-02-02"),
//             amount: 500,
//             interest: 23,
//             principal: 477,
//             remainingBalance: 4048,
//         },
//     ];

//     // Format dates and numbers dynamically
//     const formattedLoanData = loanData.map((item) => ({
//         id: item.id,
//         dueDate: item.dueDate.toLocaleDateString("en-GB"), // Format as dd-MM-yyyy
//         amount: item.amount.toFixed(2), // 2 decimal places
//         interest: item.interest.toFixed(2),
//         principal: item.principal.toFixed(2),
//         remainingBalance: item.remainingBalance.toFixed(2),
//     }));

//     return formattedLoanData;

// }

// export function SchedulePage() {
//     const [data, setData] = useState<Payment[]>([])

//     useEffect(() => {
//         const fetchData = async () => {
//             const result = await getData();
//             setData(result);
//         };

//         fetchData(); // Call the async function inside useEffect
//     }, []);

//     const [loans, setLoans] = useState<Loan[]>([]);

//     useEffect(() => {
//         const getLoans = async () => {
//           try {
//             const res = await axios.get<UserLoansResponse>(`${baseUrl}/user/${user?.id}`);
//             setLoans(res.data.loans);
//           } catch (error) {
//             console.error("Error fetching loan details:", error);
//           }
//         };
    
//         if (user?.id) {
//           getLoans();
//         }
//       }, [user?.id]);

//     const firstLoan = loans[1]; // Access the first loan


//     return (
//         <div className="xs:px-6 py-10 overflow-auto space-y-4">
//             <Header />
//             <div className="lg:px-8">
//             <DataTable columns={columns} data={data} />
//             </div>
//         </div>
//     )
// }
import { useEffect, useState } from "react";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import { Header } from "@/components/header";
import axios from "axios";
import { useUser } from "@/UserContext";

interface Loan {
  id: number;
  date: string;
  loanAmount: number;
  Years: number;
  interestRate: number;
  userId: number;
}

interface UserLoansResponse {
  loans: Loan[];
}

interface AmortizationPayment {
  principal: number;
  monthlyPayment: number;
  startDate: string;
  endDate: string;
  totalAmountPaid: number;
  totalNumberOfPayments: number;
  paymentLog: PaymentLog[];
}

interface PaymentLog {
  previousLoanAmount: number;
  date: string;
  amountPaid: number;
  loanAmount: number;
  interestOwed: number;
  interest: number;
}

interface FilteredPayment {
  id: string;
  dueDate: string;
  amount: string;
  interest: string;
  principal: string;
  remainingBalance: string;
}

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export function SchedulePage() {
  const { user } = useUser(); // Use user from context
  const [loans, setLoans] = useState<Loan[]>([]);
  const [amortizationData, setAmortizationData] = useState<FilteredPayment[]>([]);

  // Fetch user loans
  useEffect(() => {
    const getLoans = async () => {
      try {
        const res = await axios.get<UserLoansResponse>(`${baseUrl}/user/${user?.id}`);
        setLoans(res.data.loans);
      } catch (error) {
        console.error("Error fetching loan details:", error);
      }
    };

    if (user?.id) {
      getLoans();
    }
  }, [user?.id]);

  // Fetch amortization data for the first loan and filter by current month
  useEffect(() => {
    const fetchAmortizationData = async (loanId: number) => {
      try {
        const res = await axios.post<AmortizationPayment>(
          `${baseUrl}/loans/amortizationPaymentPlan/${loanId}`
        );

        const { paymentLog } = res.data;
        console.log(paymentLog)

        // Get the current month and year
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        // // Filter the paymentLog for the current month
        // const filteredLog = paymentLog.filter((log) => {
        //   const logDate = new Date(log.date);
        //   return (
        //     logDate.getMonth() === currentMonth && logDate.getFullYear() === currentYear
        //   );
        // });

        // Format filtered log data for the table
        const formattedData = paymentLog.map((log, index) => ({
          id: index.toString(),
          dueDate: new Date(log.date).toLocaleDateString("en-GB"), // Format as dd-MM-yyyy
          amount: log.amountPaid.toFixed(2),
          interest: log.interest.toFixed(2),
          principal: (log.amountPaid - log.interest).toFixed(2),
          remainingBalance: log.loanAmount.toFixed(2),
        }));

        setAmortizationData(formattedData);
      } catch (error) {
        console.error("Error fetching amortization data:", error);
      }
    };

    const firstLoan = loans[0]; // Access the first loan
    if (firstLoan) {
      fetchAmortizationData(firstLoan.id);
    }
  }, [loans]);

  return (
    <div className="xs:px-6 py-10 overflow-auto space-y-4">
      <Header />
      <div className="lg:px-8">
        <DataTable columns={columns} data={amortizationData} />
      </div>
    </div>
  );
}
