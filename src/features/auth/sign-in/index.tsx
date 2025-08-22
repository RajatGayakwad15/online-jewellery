import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import AuthLayout from '../auth-layout'
import { UserAuthForm } from './components/user-auth-form'
import { Link } from '@tanstack/react-router'

export default function SignIn() {
  return (
    <AuthLayout>
      <Card className='gap-4'>
        <CardHeader>
          <CardTitle className='text-lg tracking-tight'>Login</CardTitle>
          {/* <CardDescription>
            Enter your username and password below to <br />
            log into your account
          </CardDescription> */}
        </CardHeader>
        <CardContent>
          <UserAuthForm />
        </CardContent>
        <CardFooter>
          <div className='flex justify-between items-center w-full'>
         
           <Link
                to='/forgot-password'
                className='text-muted-foreground  text-sm font-medium hover:text-primary'
              >
                Forgot password?
              </Link>
               <p className='text-muted-foreground  text-sm'>
            Don’t have an account? {' '}
            <a
              href='/register'
              className='hover:text-primary underline underline-offset-4'
            >
            Register
            
            </a>{' '}
            {/* and{' '}
            <a
              href='/privacy'
              className='hover:text-primary underline underline-offset-4'
            >
              Privacy Policy
            </a>
            . */}
            
          </p>
               </div>
        </CardFooter>
      </Card>
    </AuthLayout>
  )
}
