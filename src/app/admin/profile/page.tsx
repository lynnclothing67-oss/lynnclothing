
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';

export default function ProfilePage() {
    const { user } = useAuth();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Admin Profile</CardTitle>
                <CardDescription>View your account details.</CardDescription>
            </CardHeader>
            <CardContent>
                {user ? (
                    <div>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>User ID:</strong> {user.uid}</p>
                    </div>
                ) : (
                    <p>Loading user data...</p>
                )}
            </CardContent>
        </Card>
    );
}
