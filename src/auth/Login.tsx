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
import loginBg from "../assets/loginBg.png"
import logo from "../assets/logo.png"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useUser } from "../UserContext"; // Import the context hook

const formSchema = z.object({
    username: z.string().min(5,"Username is required"),
    password: z.string().min(1, "Password is required")
})

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export default function Login() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    })

    // hook responsible for setting user data
    const { setUser } = useUser();

    const navigate = useNavigate();

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Initialize useNavigate
        try {
            const response = await axios.post(`${baseUrl}/auth/login`, {
                username: values.username,
                password: values.password,
            });

            const userData = response.data; // Assuming the backend returns the userID
            console.log("User logged in successfully:", userData);

            // Store user data in localStorage
            localStorage.setItem("user", JSON.stringify(userData));
            // Update context with user data
            setUser(userData);

            // Navigate to /user
            navigate("/user/dashboard");
        } catch (error) {
            console.error("Error creating user:", error);
        }
    }

    return (
        <div className="flex">
            <div className="grow-[0.5] max-w-[450px] h-[100dvh] xs:hidden lg:block">
                <img src={loginBg} className="w-full h-full" />
            </div>
            <div className="space-y-8 grow shrink flex flex-col items-center justify-center h-[100dvh]" >
                <div>
                    <img src={logo} className="w-28" />
                </div>
                <p>Simplifying Loans, Strengthening Growth</p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 shrink flex flex-col items-center p-8 bg-[#DEF5F9] rounded-lg w-[min(400px,90%)]">
                        <p className="font-bold">Login to your account</p>
                        <div className="w-full space-y-8 ">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="johndoe@gmail.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="password" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" className="w-full">Login</Button>
                    </form>
                </Form>
            </div>

        </div>
    )
}
