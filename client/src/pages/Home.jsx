import { Show, SignInButton, SignIn, UserButton } from '@clerk/react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useUser } from '@clerk/react'
import './Home.css'

function Home() {
  const { isSignedIn } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (isSignedIn) {
      navigate('/dashboard')
    }
  }, [isSignedIn])

  return (
    <main className="home-main">
      <div className="home-left">
        <h1>Welcome to PlannIt!</h1>
        <p>Plan your next game night with friends</p>
      </div>

      <section className="wallpaper">
        <Show when="signed-out">
          {/* Creates Sign-in form rather than button */}
          <SignIn afterSignInURL="/dasboard" />
        </Show>
        <Show when="signed-in">
          <div className="home-signed-in">
            <p>You are signed in! <a href="/dashboard">Go to your dashboard</a></p>
            {/* Used to logout of Clerk. Click on Icon */}
            <a href="/create" className="create-link"> + Create a Game Night</a>
            <a href="/events/1">Go to your event</a>
          </div>
          <UserButton />
        </Show>
      </section>
    </main>
  )
}

export default Home

{/* Vercel Install Coding Agent Plugin. npx plugins add vercel/vercel-plugin for later */}