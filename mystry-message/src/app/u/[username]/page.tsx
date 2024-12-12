'use client'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { messageSchema } from '@/schemas/messageSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/ApiResponse'
import { Loader2 } from 'lucide-react'
const page = () => {
    const param = useParams()
    const form = useForm<z.infer<typeof messageSchema>>({
        resolver: zodResolver(messageSchema),
        defaultValues: {
            content: "",
        },
    })
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(data: z.infer<typeof messageSchema>) {
        const payload = { username: param.username, content: data.content }
        setIsLoading(true);
        console.log('payload', payload);
        try {
            const response = await axios.post<ApiResponse>('/api/send-message', payload);

            console.log('response', response)
            toast({
                title: 'Success Ok',
                description: response.data.message,
            });
            form.reset({ ...form.getValues(), content: '' });
        } catch (error) {
            console.error('Error during sign-up:', error);

            const axiosError = error as AxiosError<ApiResponse>;

            // Default error message
            let errorMessage = axiosError.response?.data.message;
            ('There was a problem with your sign-up. Please try again.');

            toast({
                title: 'Error',
                description: errorMessage,
                variant: 'destructive',
            });
        }finally{
            setIsLoading(false);
        }
        console.log('data', data)
    }
    return (
        <div className='container mx-auto my-8 p-6 bg-white rounded max-w-4xl'>
            <h1 className="text-4xl font-bold mb-6 text-center">
                Public Profile Link
            </h1>
            <div className='min-h-screen'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Send Anonymous message to {param.username}</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter yor anonymous message " {...field} />
                                    </FormControl>
                                   
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-center">
                            {isLoading ? (
                                <Button disabled>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </Button>
                            ) : (
                                <Button type="submit" disabled={isLoading}>
                                    Send It
                                </Button>
                            )}
                        </div>
                    </form>
                </Form>
            </div>
        </div>

    )
}

export default page