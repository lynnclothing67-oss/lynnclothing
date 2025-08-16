
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { updateUserEmail, updateUserPassword } from '@/lib/auth-service';
import { Loader2 } from 'lucide-react';

export default function ProfilePage() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [emailLoading, setEmailLoading] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);

    const handleEmailChange = async () => {
        if (!user || !newEmail) return;
        setEmailLoading(true);
        try {
            await updateUserEmail(user, newEmail);
            toast({
                title: 'Email Updated',
                description: 'Your email has been successfully updated. Please re-login with your new email.',
            });
            setNewEmail('');
            // Note: Firebase session will update, but you might want to force a re-login
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Error updating email',
                description: error.message || 'Please re-authenticate and try again.',
            });
        } finally {
            setEmailLoading(false);
        }
    };

    const handlePasswordChange = async () => {
        if (!user || !newPassword) return;
        
        if(newPassword.length < 6) {
            toast({
                variant: 'destructive',
                title: 'Password too short',
                description: 'Password must be at least 6 characters long.',
            });
            return;
        }

        setPasswordLoading(true);
        try {
            await updateUserPassword(user, newPassword);
            toast({
                title: 'Password Updated',
                description: 'Your password has been successfully updated.',
            });
            setNewPassword('');
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Error updating password',
                description: error.message || 'Please re-authenticate and try again.',
            });
        } finally {
            setPasswordLoading(false);
        }
    };

    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Admin Profile</CardTitle>
                    <CardDescription>View and manage your account details.</CardDescription>
                </CardHeader>
                <CardContent>
                    {user ? (
                        <div>
                            <p className="mb-4"><strong>Email:</strong> {user.email}</p>
                            <p><strong>User ID:</strong> {user.uid}</p>
                        </div>
                    ) : (
                        <p>Loading user data...</p>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Change Email</CardTitle>
                    <CardDescription>Enter your new email address below.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="new-email">New Email</Label>
                        <Input 
                            id="new-email" 
                            type="email" 
                            placeholder="new-email@example.com" 
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleEmailChange} disabled={emailLoading || !newEmail}>
                        {emailLoading ? <Loader2 className="animate-spin" /> : 'Update Email'}
                    </Button>
                </CardFooter>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Enter your new password below. It must be at least 6 characters long.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input 
                            id="new-password" 
                            type="password" 
                            placeholder="••••••••" 
                             value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handlePasswordChange} disabled={passwordLoading || !newPassword}>
                         {passwordLoading ? <Loader2 className="animate-spin" /> : 'Update Password'}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
