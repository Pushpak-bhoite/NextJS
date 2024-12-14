'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, UserCircle2 } from 'lucide-react';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  joinDate: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const res: any = await axios.get('/api/get-users') 
        console.log('res', res)
        // setUsers(res);
      } catch (error) {
        console.log('error', error)
      }
      fetch('/api/get-users')
        .then(res => res.json())
        .then(data => setUsers(data));
    }
    getUsers()
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {users.map((user) => (
        <Card key={user.id} className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserCircle2 className="mr-2 h-6 w-6" />
              {user.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">Joined: {new Date(user.joinDate).toLocaleDateString()}</p>
            <Link href={`/messages/${user.id}`} passHref>
              <Button variant="outline" className="w-full group">
                <MessageSquare className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
                Send Mystery Message
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

