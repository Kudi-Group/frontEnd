"use client"

import { Header } from "../../components/header";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Starfire from '@/assets/starfire.jpg'
import { useUser } from "@/UserContext";
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
import axios from "axios"
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Mail } from 'lucide-react'
import { useState } from 'react'
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    gender: z.enum(["Female", "Male", ""], {
        required_error: 'You need to select a value',
    }),
    occupation: z.string().min(1, "Occupation is required")
})

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export function Profile() {
    const { user } = useUser();
    const [formEditable, setFormEditable] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        //fetch from server or user token
        defaultValues: {
            firstName: "",
            lastName: "",
            gender: "",
            occupation: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await axios.post(`${baseUrl}/profile/`, {
                firstName: values.firstName,
                lastName: values.lastName,
            });
            
            setTimeout(() => {
                setFormEditable(false);
            }, 1000);
            console.log("User created successfully:", response.data);
        } catch (error) {
            console.error("Error creating user:", error);
        }
    }

    return (
        <div className="p-6 flex flex-col space-y-8">

            <Header />

            <div className="space-y-11 " >

                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                        <div className="flex flex-wrap-reverse gap-4 items-center justify-between">
                            <div className="flex flex-wrap gap-4 items-center">
                                <Avatar className=' w-14 h-14 bg-blue-200 justify-center items-center'>
                                    <AvatarImage src={Starfire} />
                                </Avatar>
                                <div className="flex flex-col justify-center">
                                    <p className="font-bold">
                                        Evana Rawles
                                        {user?.username}
                                    </p>
                                    <p className="text-gray-500 text-sm">
                                        evanarawles@gmail.com
                                    </p>

                                </div>
                            </div>
                            <Button onClick={() => setTimeout(() => {
                                setFormEditable(true);
                            }, 1000)} className={formEditable ? "hidden" : "block"}>Edit</Button>
                            <Button type="submit" className={formEditable ? "block" : "hidden"}>Save</Button>

                        </div>


                        <div className="flex flex-wrap gap-4">
                            <FormField
                                disabled={!formEditable}
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem className="grow">
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                disabled={!formEditable}
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem className="grow">
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex flex-wrap gap-4">

                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem className="grow basis-48">
                                        <FormLabel>Gender</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!formEditable}>
                                            <FormControl className="w-full">
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select your gender" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="w-full">
                                                <SelectItem value="Female">Female</SelectItem>
                                                <SelectItem value="Male">Male</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                disabled={!formEditable}
                                control={form.control}
                                name="occupation"
                                render={({ field }) => (
                                    <FormItem className="grow basis-48">
                                        <FormLabel>Occupation</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>

                    </form>
                </Form>

                <div>
                    <p className="font-bold">My email address</p>
                    <div className="flex gap-2 items-center">
                        <Mail />
                        <div>
                            <p className="text-sm">evanarawles@gmail.com</p>
                            <p className="text-gray-500 text-sm">1 month ago</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

