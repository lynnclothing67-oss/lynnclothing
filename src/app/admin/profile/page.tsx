
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { updateUserEmail, updateUserPassword, reauthenticate } from '@/lib/auth-service';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

export default function ProfilePage() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [emailLoading, setEmailLoading] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);

    // State for re-authentication
    const [reauthPassword, setReauthPassword] = useState('');
    const [reauthAction, setReauthAction] = useState<(() => Promise<void>) | null>(null);
    const [isReauthOpen, setIsReauthOpen] = useState(false);

    // State for password visibility
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showReauthPassword, setShowReauthPassword] = useState(false);


    const handleReauthAndExecute = async () => {
        if (!user || !reauthAction) return;

        try {
            await reauthenticate(reauthPassword);
            await reauthAction();
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Authentication Failed',
                description: 'The password you entered was incorrect. Please try again.',
            });
        } finally {
            setIsReauthOpen(false);
            setReauthPassword('');
            setReauthAction(null);
        }
    };
    
    const triggerReauth = (action: () => Promise<void>) => {
        setReauthAction(() => action);
        setIsReauthOpen(true);
    };


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
        } catch (error: any) {
            if (error.code === 'auth/requires-recent-login') {
                triggerReauth(handleEmailChange);
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Error updating email',
                    description: error.message || 'An unexpected error occurred.',
                });
            }
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
             if (error.code === 'auth/requires-recent-login') {
                triggerReauth(handlePasswordChange);
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Error updating password',
                    description: error.message || 'An unexpected error occurred.',
                });
            }
        } finally {
            setPasswordLoading(false);
        }
    };

    return (
        <>
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
                    <Button onClick={() => triggerReauth(handleEmailChange)} disabled={emailLoading || !newEmail}>
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
                        <div className="relative">
                            <Input 
                                id="new-password" 
                                type={showNewPassword ? "text" : "password"}
                                placeholder="••••••••" 
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <Button 
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute inset-y-0 right-0 h-full px-3"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                                {showNewPassword ? <EyeOff /> : <Eye />}
                            </Button>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={() => triggerReauth(handlePasswordChange)} disabled={passwordLoading || !newPassword}>
                         {passwordLoading ? <Loader2 className="animate-spin" /> : 'Update Password'}
                    </Button>
                </CardFooter>
            </Card>
        </div>
        <AlertDialog open={isReauthOpen} onOpenChange={setIsReauthOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Please Re-authenticate</AlertDialogTitle>
                <AlertDialogDescription>
                  For your security, please enter your current password to continue.
                </AlertDialogDescription>
              </AlertDialogHeader>
               <div className="relative">
                <Input
                    type={showReauthPassword ? "text" : "password"}
                    placeholder="Your current password"
                    value={reauthPassword}
                    onChange={(e) => setReauthPassword(e.target.value)}
                />
                 <Button 
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute inset-y-0 right-0 h-full px-3"
                    onClick={() => setShowReauthPassword(!showReauthPassword)}
                >
                    {showReauthPassword ? <EyeOff /> : <Eye />}
                </Button>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setReauthAction(null)}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleReauthAndExecute}>Confirm</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
      </>
    );
}
