"use client"

import BalanceIcon from '@/assets/icons/money-balance-icon.svg'
import LoanIcon from '@/assets/icons/loan-icon.svg'
import InterestIcon from '@/assets/icons/interest-rate-icon.svg'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"
import * as React from "react"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { Label, Pie, PieChart, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"
import { Separator } from '@/components/ui/separator';




const linechartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
]

const linechartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig


const chartData = [
    { browser: "safari", visitors: 200, fill: "#C3B5FD" },
    { browser: "chrome", visitors: 600, fill: "#3981F7" },
    { browser: "firefox", visitors: 200, fill: "#000000" },
]

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    chrome: {
        label: "Chrome",
        color: "hsl(var(--chart-1))",
    },
    safari: {
        label: "Safari",
        color: "hsl(var(--chart-2))",
    },
    firefox: {
        label: "Firefox",
        color: "hsl(var(--chart-3))",
    },
} satisfies ChartConfig

const semipiechartData = [{ month: "january", desktop: 1260, mobile: 570 }]

const semipiechartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

export function Cards() {
    const totalVisitorsPie = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
    }, [])

    const totalVisitorsSemiPie = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
    }, [])

    return (
        <div className="py-6 grid grid-cols-1 md:grid-cols-1 gap-6">

            {/* Overview Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card className='flex items-center px-6 py-2 flex-wrap gap-4'>
                    <Avatar className='w-14 h-14 bg-blue-200 justify-center items-center'>
                        <AvatarImage src={LoanIcon} className='w-7/12' />
                    </Avatar>

                    <div>
                        <CardHeader className='p-0'>
                            <h3 className="text-base text-gray-500">Total Loan Amount</h3>
                        </CardHeader>
                        <CardContent className='p-0'>
                            <div className="text-2xl font-bold">N5,400.00</div>
                            <p className='text-sm'><span className='text-green-600 font-bold'>+16%</span> this month</p>
                        </CardContent>
                    </div>
                </Card>

                <Card className='flex items-center px-6 py-2 flex-wrap gap-4'>
                    <Avatar className='w-14 h-14 bg-blue-200 justify-center items-center'>
                        <AvatarImage src={BalanceIcon} className='w-7/12' />
                    </Avatar>

                    <div>
                        <CardHeader className='p-0'>
                            <h3 className="text-base text-gray-500">Remaining Balance</h3>
                        </CardHeader>
                        <CardContent className='p-0'>
                            <div className="text-2xl font-bold">N5,400.00</div>
                            <p className='text-sm'><span className='text-red-600 font-bold'>+1%</span> this month</p>
                        </CardContent>
                    </div>
                </Card>

                <Card className='flex items-center px-6 py-2 flex-wrap gap-4'>
                    <Avatar className='w-14 h-14 bg-blue-200 justify-center items-center'>
                        <AvatarImage src={InterestIcon} className='w-6/12' />
                    </Avatar>

                    <div>
                        <CardHeader className='p-0'>
                            <h3 className="text-base text-gray-500">Interest Rate and Term</h3>
                        </CardHeader>
                        <CardContent className='p-0'>
                            <div className="text-2xl font-bold">5%</div>
                        </CardContent>
                    </div>
                </Card>
            </div>

            {/* Amortization Schedule */}
            <Card>
                <CardHeader className='py-2'>
                    <h3 className="text-lg text-blue-950 flex justify-center">Amortization Schedule</h3>
                </CardHeader>

                {/* pie chart */}
                <CardContent className='py-2'>
                    <div className='flex flex-row flex-wrap items-center justify-center'>
                        <CardContent className='grow-[0.2]'>
                            <ChartContainer
                                config={chartConfig}
                                className="mx-auto aspect-square max-h-[250px]"
                                style={{ width: '100%', height: '230px' }}
                            >
                                <PieChart width={250} height={250}>
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent hideLabel />}
                                    />
                                    <Pie
                                        data={chartData}
                                        dataKey="visitors"
                                        nameKey="browser"
                                        innerRadius={60}
                                        strokeWidth={5}
                                    >
                                        <Label
                                            content={({ viewBox }) => {
                                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                    return (
                                                        <text
                                                            x={viewBox.cx}
                                                            y={viewBox.cy}
                                                            textAnchor="middle"
                                                            dominantBaseline="middle"
                                                        >
                                                            <tspan
                                                                x={viewBox.cx}
                                                                y={viewBox.cy}
                                                                className="fill-foreground text-3xl font-bold"
                                                            >
                                                                {totalVisitorsPie.toLocaleString()}
                                                            </tspan>
                                                            <tspan
                                                                x={viewBox.cx}
                                                                y={(viewBox.cy || 0) + 24}
                                                                className="fill-muted-foreground"
                                                            >
                                                                %
                                                            </tspan>
                                                        </text>
                                                    )
                                                }
                                            }}
                                        />
                                    </Pie>
                                </PieChart>
                            </ChartContainer>
                        </CardContent>
                        <div className="flex flex-wrap gap-6 grow basis-72 justify-between">
                            {/* other components */}

                            <div className='basis-[250px] flex gap-2'>
                                <Separator orientation="vertical" className="h-full w-[6px] bg-blue-600 rounded-md" />
                                <div className='flex flex-col'>
                                    <div className="text-sm text-gray-500">Principal</div>
                                    <div className="text-2xl ">N5,000.00</div>
                                </div>
                            </div>

                            <div className='basis-[250px] flex gap-2'>
                                <Separator orientation="vertical" className="h-full w-[6px] bg-purple-300 rounded-md" />
                                <div className='flex flex-col'>
                                    <div className="text-sm text-gray-500">Monthly Payment</div>
                                    <div className="text-2xl">N5,000.00</div>
                                </div>
                            </div>

                            <div className='basis-[250px] flex gap-2'>
                                <Separator orientation="vertical" className="h-full w-[6px] bg-cyan-400 rounded-md" />
                                <div className='flex flex-col'>
                                    <div className="text-sm text-gray-500">Interest</div>
                                    <div className="text-2xl">N5 for every N1000</div>
                                </div>
                            </div>

                            <div className='basis-[250px] flex gap-2'>
                                <Separator orientation="vertical" className="h-full w-[6px] bg-blue-900 rounded-md" />
                                <div className='flex flex-col'>
                                    <div className="text-sm text-gray-500">Remaining Balance</div>
                                    <div className="text-2xl">N1000</div>
                                </div>
                            </div>


                        </div>
                    </div>

                </CardContent>
            </Card>




            <div className="  grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Contribution Summary */}
                <Card>
                    <CardHeader>
                        <h3 className="text-lg">Contribution Summary</h3>
                    </CardHeader>
                    <CardContent>
                        <div className='flex justify-between flex-wrap'>
                            <div className="text-4xl">N15,000.00</div>
                            <div className='flex flex-row pt-3'>
                                <div className="text-sm text-[#008000]">+23% vs last month </div>
                                <TrendingUp className="text-[#008000] h-4 w-4 pl-1" />
                            </div>
                        </div>
                    </CardContent>


                    <Card className='border-0'>
                        <CardContent>
                            <ChartContainer config={linechartConfig}>
                                <AreaChart
                                    accessibilityLayer
                                    data={linechartData}
                                // margin={{
                                //     left: 12,
                                //     right: 12,
                                // }}
                                >
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent indicator="line" />}
                                    />
                                    <defs>
                                        <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                                            <stop
                                                offset="5%"
                                                stopColor="var(--color-desktop)"
                                                stopOpacity={0.8}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="var(--color-desktop)"
                                                stopOpacity={0.1}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <Area
                                        dataKey="desktop"
                                        type="natural"
                                        // fill="url(#fillDesktop)"
                                        fillOpacity={0.4}
                                        stroke="#3981F7"
                                        stackId="a"
                                    />

                                </AreaChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                </Card>

                {/* Upcoming Payments */}
                <Card>
                    <CardHeader>
                        <h3 className="text-lg flex justify-center">Upcoming Payments</h3>
                        <h6 className="text-sm text-destructive flex justify-center">From 1 - 31 March, 2022</h6>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-center items-center flex-wrap gap-4">
                            <div>
                                <div className="text-sm text-gray-500">Total Loan</div>
                                <div className='flex items-center'>
                                    <Separator orientation="vertical" className="h-7 w-1 bg-blue-200" />
                                    <div className="text-lg font-bold ml-2">N15,000.00</div>
                                </div>
                            </div>
                            <div>

                                <div className="text-sm text-gray-500">Amount Due</div>
                                <div className='flex items-center'>
                                    <Separator orientation="vertical" className="h-7 w-1 bg-purple-300" />
                                    <div className="text-lg font-bold ml-2">N7,500.00</div>
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Paid</div>
                                <div className='flex items-center'>
                                    <Separator orientation="vertical" className="h-7 w-1 bg-[#3981F7]" />
                                    <div className="text-lg font-bold ml-2">N7,500.00</div>
                                </div>
                            </div>
                        </div>
                    </CardContent>


                    <Card className="flex flex-col border-0">
                        <CardContent className="flex flex-1 items-center pb-0 border-0">
                            <ChartContainer
                                config={semipiechartConfig}
                                className="mx-auto aspect-square w-full max-w-[200px]"
                            >
                                <RadialBarChart
                                    data={semipiechartData}
                                    endAngle={180}
                                    innerRadius={80}
                                    outerRadius={130}
                                >
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent hideLabel />}
                                    />
                                    <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                                        <Label
                                            content={({ viewBox }) => {
                                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                    return (
                                                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                                                            <tspan
                                                                x={viewBox.cx}
                                                                y={(viewBox.cy || 0) - 16}
                                                                className="fill-foreground text-2xl font-bold"
                                                            >
                                                                {totalVisitorsSemiPie.toLocaleString()}
                                                            </tspan>
                                                            <tspan
                                                                x={viewBox.cx}
                                                                y={(viewBox.cy || 0) + 4}
                                                                className="fill-muted-foreground"
                                                            >
                                                                Visitors
                                                            </tspan>
                                                        </text>
                                                    )
                                                }
                                            }}
                                        />
                                    </PolarRadiusAxis>
                                    <RadialBar
                                        dataKey="desktop"
                                        stackId="a"
                                        cornerRadius={5}
                                        fill="#3981F7"
                                        className="stroke-transparent stroke-2"
                                    />
                                    <RadialBar
                                        dataKey="mobile"
                                        fill="#000000"
                                        stackId="a"
                                        cornerRadius={5}
                                        className="stroke-transparent stroke-2"
                                    />
                                </RadialBarChart>
                            </ChartContainer>
                        </CardContent>

                    </Card>
                </Card>
            </div>
        </div >
    );
};
