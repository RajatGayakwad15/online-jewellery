// import { Link } from '@tanstack/react-router'
import {
  Card,
  CardContent,
//   CardDescription,
//   CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import AuthLayout from '../auth-layout'
import { SignUpForm } from './components/setpassword-forrm.tsx'

export default function Setpassword() {
  return (
    <AuthLayout>
      <Card className='gap-4'>
        <CardHeader>
          <CardTitle className='text-lg tracking-tight'>
            Set Password
          </CardTitle>
          {/* <CardDescription>
            Enter your email and password to create an account. <br />
            Already have an account?{' '}
            <Link
              to='/sign-in'
              className='hover:text-primary underline underline-offset-4'
            >
              Sign In
            </Link>
          </CardDescription> */}
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
        {/* <CardFooter>
          <p className='text-muted-foreground  text-center text-sm'>
             Already have an account?{' '}
            <a
              href='/login'
              className='hover:text-primary underline underline-offset-4'
            >
              Login
            </a>{' '}
            
          </p>
        </CardFooter> */}
      </Card>
    </AuthLayout>
  )
}
