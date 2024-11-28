"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import axios, { AxiosError } from 'axios'
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@react-email/components"
import { signUpSchema } from "@/schemas/signUpSchema"
import { useDebounceCallback } from 'usehooks-ts'
import { useEffect, useState } from "react"
import { ApiResponse } from "@/types/ApiResponse"
import { Loader2 } from "lucide-react"
export default function SignUp() {
    const [usernameMessage, setUsernameMessage] = useState('');
    const [username, setUsername] = useState('')
    const debounced = useDebounceCallback(setUsername, 500)
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);


    async function onSubmit(values: z.infer<typeof signUpSchema>) {
        // const res = await axios.get(`http://localhost:3000/app/sign-up=${username}`)
        // console.log('res', res)
        console.log('values-->', values)
    }

    const form = useForm<z.infer<typeof signUpSchema>>({  // signInSchema -> belongs to zod validation 
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
        mode: 'onSubmit'
    })

    useEffect(() => {
        async function checkUsernameUnique() {
            if (username) {
                setIsCheckingUsername(true)
                try {
                    const response = await axios.get<ApiResponse>(`/api/check-username-unique?username=${username}`)
                    console.log('response', response)
                    setUsernameMessage(response?.data?.message);
                } catch (error) {
                    const axiosError = error as AxiosError<ApiResponse>
                    console.log('axiousError', axiosError);
                    console.log('error', error)
                    setUsernameMessage(
                        axiosError.response?.data.message ?? 'Error checking username'
                    );
                } finally {
                    setIsCheckingUsername(false)
                }
            }
        }
        checkUsernameUnique();
    }, [username])

    const hello = () => {
        console.log('first---------------------')
    }
    console.log('--->usernameMessage', usernameMessage);
    return (
        <div className="flex justify-center items-center min-h-screen ">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                    Join True Feedback
                </h1>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <Input placeholder="shadcn" {...field}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            debounced(e.target.value)
                                        }}
                                    />

                                    {isCheckingUsername && <Loader2 className="animate-spin" />}
                                    {!isCheckingUsername && usernameMessage && (
                                        <p
                                            className={`text-sm ${usernameMessage === 'Username is unique'
                                                ? 'text-green-500'
                                                : 'text-red-500'
                                                }`}
                                        >
                                            {usernameMessage}
                                        </p>
                                    )}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <Input placeholder="shadcn" {...field}
                                        onChange={(e) => {
                                            field.onChange(e);
                                        }}
                                    />
                                    <p className='text-muted text-gray-400 text-sm'>We will send you a verification code</p>

                                    <FormMessage />
                                </FormItem>
                            )} />

                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <Input type="password" {...field} name="password" />
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <Button onClick={onSubmit} type="submit" className="w-full cursor-pointer" >Submit</Button>
                    </form>
                </Form>
            </div>
        </div>

    )
}