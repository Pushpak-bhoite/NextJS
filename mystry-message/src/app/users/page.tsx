import { Suspense } from 'react';
import UserList from './UserList';
import { Skeleton } from "@/components/ui/skeleton";

export const metadata = {
  title: 'Mystery Users | True Feedback',
  description: 'Discover the mysterious users of our community',
};

export default function UsersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Mysterious Community Members</h1>
      <p className="text-center mb-8 text-gray-600">Uncover the secrets behind each user. Who will you message?</p>
      <Suspense fallback={<UserListSkeleton />}>
        <UserList />
      </Suspense>
    </div>
  );
}

function UserListSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="border rounded-lg p-4 space-y-4">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
    </div>
  );
}

