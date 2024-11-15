import UserRegisterForm from './components/user-register-form';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export default function SignUpPage() {
  return (
    // <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-[70%_30%] lg:px-0">
      <Link
        to="/"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 hidden md:right-8 md:top-8'
        )}
      >
        Login
      </Link>
      <div
        className="relative hidden h-full flex-col bg-muted p-10 text-white  lg:flex"
        style={{ backgroundColor: '#F8F7FA' }}
      >
        <div className="relative z-20 flex items-center text-lg font-medium">
          <img src="/images/iStock_sign_up_img.png" />

          <div className="flex items-center">
            <div
              className="flex items-center"
              style={{
                position: 'absolute',
                top: '-26px',
                left: '-26px',
                margin: '10px 15px',
                display: 'flex',
                textAlign: 'center',
                color: 'black'
              }}
            >
              <img
                src="/images/sticky_notes_icon.png"
                alt="Sticky Notes Icon"
                // className="h-6 w-8"
                // style={{
                //   height: '30px',
                //   margin: 'auto'
                // }}
              />
              <div>
                <span
                  style={{
                    fontSize: '1.00rem', // Font size for STICKY NOTES
                    fontWeight: 600,
                    fontFamily: 'sans-serif',
                    color: '#423F50'
                  }}
                >
                  STICKY NOTES
                </span>
                <div
                  style={{
                    marginTop: '0.25rem' // Space between the lines
                  }}
                >
                  <span
                    style={{
                      fontSize: '1rem', // Font size for WALL
                      fontWeight: 'bold', // Bold text
                      color: '#FAC23D',
                      marginTop: '5px',
                      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
                      borderBottom: '2px solid #FAC23D',
                      paddingBottom: '2px',
                      letterSpacing: '0.5px',
                      display: 'block'
                      // Yellow color for WALL
                    }}
                  >
                    WALL
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex h-full items-center p-4 lg:p-8"
        style={{ backgroundColor: 'white', color: '#071437' }}
      >
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1
              className="text-2xl font-semibold tracking-tight"
              style={{
                color: '#7367F0',
                fontFamily: 'sans-serif',
                fontWeight: 500,
                fontSize: '1.5rem',
                margin: 0,
                lineHeight: 1.58334
              }}
            >
              Welcome to STICKY NOTES WALL! 👋🏻
            </h1>
            <p
              className="text-muted-foreground text-sm"
              style={{
                color: 'rgb(120, 144, 156)',
                margin: 0,
                // fontFamily:
                //   '__Public_Sans_7e4a8c, __Public_Sans_Fallback_7e4a8c',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: 1.46667
              }}
            >
              Please sign in to your account and start the adventure
            </p>
          </div>
          <UserRegisterForm />
          <p
            className="text-muted-foreground text-md px-6"
            style={{ color: 'grey' }}
          >
            Already have an account?
            <span
              style={{
                color: '#675cd8',
                fontWeight: '400',
                fontSize: '14px',
                lineHeight: 1.46667,
                paddingLeft: '2px'
              }}
            >
              <Link to="/login">Login here</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
