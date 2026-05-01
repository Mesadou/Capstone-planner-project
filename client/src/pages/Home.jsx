import { Show, SignInButton } from '@clerk/react'
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
          <SignInButton />
        </Show>
        <Show when="signed-in">
          <p>You are signed in! <a href="/events/1">Go to your event</a></p>
        </Show>
      </section>
    </main>
  )
}

export default Home