"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { useToast } from '@/hooks/use-toast';
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from "axios";
import { useUser } from "@/UserContext";


const formSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  phone: z.string().min(1, "Phone No is required"),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  email: z.string().email("Invalid email address"),
  employmentStatus: z.enum(["employed", "unemployed", "self-employed"], {
    required_error: 'You need to select a value',
  }),
  monthlyIncome: z.enum(["200k-500k", "500k-1m", "1m-above"], {
    required_error: 'You need to select a value',
  }),
  monthlyExpenses: z.enum(["200k-500k", "500k-1m"], {
    required_error: 'You need to select a value',
  }),
  loanAmount: z.number().min(1, "Loan Amount is required"),
  interestRate: z.number().min(1, "Interest rate is required"),
  Years: z.number().min(1, "Year is required"),

})

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export function LoanForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      dob: undefined,
      email: "",
      employmentStatus: "employed",
      monthlyIncome: "200k-500k",
      monthlyExpenses: "200k-500k",
      // loanAmount: 0,
      // date: "2024-12-01T15:35:26.308Z",
      // interestRate: 0,
      // Years: 0,
      // userId: 0
    },
  })
  const currentDate = new Date(); // Get the current date
  const formattedDate = currentDate.toISOString(); // Optional: format as ISO string
  const { user} = useUser();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    console.log(values);
    try {
      const response = await axios.post(`${baseUrl}/loans`, {
        date: formattedDate,
        loanAmount: values.loanAmount,
        interestRate: values.interestRate,
        Years: values.Years,
        userId: user?.id

      });

      console.log(response.data);


      console.log("User loan successfully:", response.data);
      toast({
        title: 'Submitted: Loan Form Data',
        description: `The current submitted form state: ${JSON.stringify(values)}`,
        className: 'bg-slate-500',
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

  return (
    <div >
      <h1 className="text-xl font-semibold text-center mb-4">LOAN ENTRY FORM</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-8 rounded-lg">
          <div className="w-full space-y-8 ">

            {/* fullname */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* phone number */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number"{...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* date of birth */}
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-100% pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* financial information */}
            <h2 className="text-lg text-[#0064AC] font-semibold mt-6 mb-4">FINANCIAL INFORMATION</h2>
            {/* employment status */}
            <FormField
              control={form.control}
              name="employmentStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employment Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified employmentStatus to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="employed">Employed</SelectItem>
                      <SelectItem value="unemployed">Unemployed</SelectItem>
                      <SelectItem value="self-employed">Self-employed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* monthly income */}
            <FormField
              control={form.control}
              name="monthlyIncome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Income</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified monthlyIncome to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="200k-500k">200k-500k</SelectItem>
                      <SelectItem value="500k-1m">500k-1m</SelectItem>
                      <SelectItem value="1m-above">1m-above</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* monthly expenses */}
            <FormField
              control={form.control}
              name="monthlyExpenses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Expenses</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified monthlyExpenses to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="200k-500k">200k-500k</SelectItem>
                      <SelectItem value="500k-1m">500k-1m</SelectItem>
                      <SelectItem value="1m-above">1m-above</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* LOAN REQUEST DETAILS */}
            <h2 className="text-lg text-[#0064AC] font-semibold mt-6 mb-4">LOAN REQUEST DETAILS</h2>

            {/* desiredLoanamount */}

            <FormField
              control={form.control}
              name="loanAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Desired Loan Amount</FormLabel>
                  <FormControl>
                    <Input type="number"  placeholder="Enter your desired amount" {...field} 
                    onChange={(e) => field.onChange(Number(e.target.value))}/>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="interestRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Desired Interest Rate</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter interest rate" {...field} 
                    onChange={(e) => field.onChange(Number(e.target.value))}/>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Years"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter the amount of years" {...field} 
                     onChange={(e) => field.onChange(Number(e.target.value))} />
                  </FormControl>
                </FormItem>
              )}
            />

          </div>
          <div className="flex justify-end">
            <Button type="submit" className="w-[258px] bg-[#5932EA] hover:bg-[#7a5ef5]">Request Loan</Button>
          </div>

        </form>
      </Form>
    </div>
  )
}
