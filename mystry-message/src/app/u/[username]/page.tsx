'use client'

import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { messageSchema } from '@/schemas/messageSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponse';
import { Loader2 } from 'lucide-react';

const page = () => {
  const param = useParams();
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: '',
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [streaming, setStreaming] = useState(false);

  async function handleSuggestionMessages() {
    setSuggestions([]);
    setStreaming(true);

    try {
      const response = await fetch('/api/ai-messages', {
        method: 'GET',
      });
console.log('response',response)
      if (!response.body) {
        throw new Error('ReadableStream not supported in this browser.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let accumulatedText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedText += chunk;

        // Parse each event type from the stream
        chunk.split('\n\n').forEach((event) => {
          if (event.startsWith('event: chunk')) {
            const data = JSON.parse(event.split('data: ')[1]);
            setSuggestions((prev) => [...prev, data.chunk]);
          } else if (event.startsWith('event: end')) {
            const finalData = JSON.parse(event.split('data: ')[1]);
            setSuggestions(finalData.questions);
            setStreaming(false);
          }
        });
      }
    } catch (error) {
      console.error('Error during streaming:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate questions. Please try again.',
        variant: 'destructive',
      });
      setStreaming(false);
    }
  }

  async function onSubmit(data: z.infer<typeof messageSchema>) {
    const payload = { username: param.username, content: data.content };
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>('/api/send-message', payload);
      toast({
        title: 'Success',
        description: response.data.message,
      });
      form.reset({ ...form.getValues(), content: '' });
    } catch (error) {
      console.error('Error during submission:', error);
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message || 'There was a problem with your submission. Please try again.';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 text-center">Public Profile Link</h1>
      <div className="min-h-screen">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Send Anonymous message to {param.username}</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your anonymous message" {...field} />
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

        <div className="mt-8">
          <Button onClick={handleSuggestionMessages} disabled={false}>
            {streaming ? 'Generating...' : 'Generate Questions'}
          </Button>
          <div className="mt-4">
            {suggestions.length > 0 && (
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Generated Questions:</h2>
                <ul className="list-disc pl-5">
                  {suggestions.map((question, index) => (
                    <li key={index} className="text-gray-700">
                      {question}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
