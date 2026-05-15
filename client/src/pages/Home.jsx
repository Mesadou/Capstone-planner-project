import { Show, SignInButton, SignIn, UserButton } from '@clerk/react'
import './Home.css'

function Home() {
  return (
    <main className="home-main">
      <div className="home-left">
        <h1>Welcome to Game Night</h1>
        <p>Plan your next game night with friends</p>
      </div>

      <section className="wallpaper">
        <Show when="signed-out">
          {/* Creates Sign-in form rather than button */}
          <SignIn />
        </Show>
        <Show when="signed-in">
          <div className="home-signed-in">
            <p>You are signed in! <a href="/events/1">Go to your event</a></p>
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