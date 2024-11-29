"use client"

import { Badge } from '@/components/ui/badge';
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
        <div className="p-6 grid grid-cols-1 md:grid-cols-1 gap-6">

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader>
                        <h3 className="text-lg font-semibold">Total Loan Amount</h3>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₦5,400.00</div>
                        <Badge variant="success">+16% this month</Badge>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <h3 className="text-lg font-semibold">Remaining Balance</h3>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₦1,800.00</div>
                        <Badge variant="destructive">-1% this month</Badge>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <h3 className="text-lg font-semibold">Interest Rate and Term</h3>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5%</div>
                    </CardContent>
                </Card>
            </div>



            {/* Amortization Schedule */}
            <Card>
                <CardHeader>
                    <h3 className="text-lg font-semibold flex justify-center">Amortization Schedule</h3>
                </CardHeader>

                {/* pie chart */}
                <CardContent>
                    <div className='flex flex-row'>
                        <CardContent>
                            <ChartContainer
                                config={chartConfig}
                                className="mx-auto aspect-square max-h-[250px]"
                                style={{ width: '100%', height: '250px' }}
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
                        <div className="flex items-center space-x-20">
                            {/* other components */}
                            <div>
                                <div className='pb-10'>
                                    <div className="text-sm">Principal</div>
                                    <div className='flex items-center'>
                                        <Separator orientation="vertical" className="h-7 w-1 bg-[#3981F7]" />
                                        <div className="text-4xl font-bold ml-2">₦10,000.00</div>
                                    </div>
                                </div>

                                <div>
                                    <div className="text-sm">Interest</div>
                                    <div className='flex items-center'>
                                        <Separator orientation="vertical" className="h-7 w-1 bg-blue-200" />
                                        <div className="text-4xl font-bold ml-2">₦5 for every ₦1000</div>
                                    </div>
                                </div>

                            </div>

                            <div>
                                <div className='pb-10'>
                                    <div className="text-sm">Monthly Payment</div>
                                    <div className='flex items-center'>
                                        <Separator orientation="vertical" className="h-7 w-1 bg-purple-300" />
                                        <div className="text-4xl font-bold ml-2">₦5,000.00</div>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm">Remaining Balance</div>
                                    <div className='flex items-center'>
                                        <Separator orientation="vertical" className="h-7 w-1 bg-[#000000]" />
                                        <div className="text-4xl font-bold ml-2">₦2,000.00</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </CardContent>
            </Card>




            <div className="  grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Contribution Summary */}
                <Card>
                    <CardHeader>
                        <h3 className="text-lg font-semibold">Contribution Summary</h3>
                    </CardHeader>
                    <CardContent>
                        <div className='flex justify-between'>
                            <div className="text-4xl font-bold">₦15,000.00</div>
                            <div className='flex flex-row pt-3'>
                                <div className="text-sm text-[#008000]">+23% vs last month </div>
                                <TrendingUp className="text-[#008000] h-4 w-4 pl-1" />
                            </div>
                        </div>
                    </CardContent>


                    <Card>
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
                        <h3 className="text-lg font-semibold flex justify-center">Upcoming Payments</h3>
                        <h6 className="text-sm font-semibold text-destructive flex justify-center">From 1 - 31 March, 2022</h6>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <div>

                                <div className="text-sm">Total Loan</div>
                                <div className='flex items-center'>
                                    <Separator orientation="vertical" className="h-7 w-1 bg-blue-200" />
                                    <div className="text-lg font-bold ml-2">₦15,000.00</div>
                                </div>
                            </div>
                            <div>

                                <div className="text-sm">Amount Due</div>
                                <div className='flex items-center'>
                                    <Separator orientation="vertical" className="h-7 w-1 bg-purple-300" />
                                    <div className="text-lg font-bold ml-2">₦7,500.00</div>
                                </div>
                            </div>
                            <div>
                                <div className="text-sm">Paid</div>
                                <div className='flex items-center'>
                                    <Separator orientation="vertical" className="h-7 w-1 bg-[#3981F7]" />
                                    <div className="text-lg font-bold ml-2">₦7,500.00</div>
                                </div>
                            </div>
                        </div>
                    </CardContent>


                    <Card className="flex flex-col">
                        <CardContent className="flex flex-1 items-center pb-0">
                            <ChartContainer
                                config={semipiechartConfig}
                                className="mx-auto aspect-square w-full max-w-[250px]"
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
