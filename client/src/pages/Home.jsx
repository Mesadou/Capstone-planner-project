import './Home.css'

function Home() {
  return (
    <main className="home-main">
      

      {/*Information Box */}
      <section className="wallpaper">
        <section className="infobox">
          <h1>Welcome to *Application Name*</h1>

          <div className="login">
            <div className="form-group">
              <h2>Username</h2>
              <input type="text" placeholder="Enter username" />
            </div>
            <div className="form-group">
              <h2>Password</h2>
              <input type="text" placeholder="Enter password" />
            </div>

            <div className="forms-buttons">
              <button id="sign-in">Sign-in</button>
              <div className="acc-link">
                <p id="register">Register</p>
                <p id="password">Forgot Password?</p>
              </div>
            </div>

          </div>



        </section>

      </section>
    </main>
  );
}

export default Home