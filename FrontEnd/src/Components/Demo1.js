import { useNavigate } from 'react-router-dom';

export const Demo1 = () => {

  const navigate = useNavigate();

const handleSubmit=() => {
  navigate('/memberloginpage')
}

const handleSubmit1=() => {
  navigate('/adminloginpage')
}

    return (
      <div>
      <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.3.0/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
      </head>
        <div>
          <header class="header">
            <nav class="nav-items">
              
              <a onClick = {handleSubmit1}  class="bton"> ADMIN LOGIN </a>
            </nav>
          </header>
      
          <main>
            <div class="intro">
              <h1>SOCIETYRUN</h1>
              <p>Provide True Convenience in Community Living..</p>
              <button  className="btn btn-primary" type = "button" onClick = {handleSubmit} class = "btn btn-primary"> LOGIN </button>
            </div>
            <div class="achievements">
              <div class="work">
                <i class="fas fa-atom"></i>
                <p class="work-heading">Event Calendar</p>
                <p class="work-text">Keep track of upcoming events, gatherings, and meetings in one place. Our app's event calendar enables residents to RSVP, view event details, and set reminders, enhancing community participation and fostering a sense of belonging..</p>
              </div>
              <div class="work">
                <i class="fas fa-skiing"></i>
                <p class="work-heading">Secure Payments</p>
                <p class="work-text">Our app facilitates secure online payments for maintenance fees, utilities, and other society-related expenses. No more hassle of writing cheques or standing in long queues. Residents can now conveniently pay their dues from the comfort of their homes, keeping track of payment histories and receipts with ease..</p>
              </div>
              <div class="work">
                <i class="fas fa-ethernet"></i>
                <p class="work-heading">Seamless Communication</p>
                <p class="work-text">Stay connected with your neighbors and management committee effortlessly through our app's intuitive messaging system. Share important announcements, event invitations, maintenance updates, and more with just a few taps, ensuring that every resident is well-informed and engaged..</p>
              </div>
            </div>
            <div class="about-me">
              <div class="about-me-text">
                <h2>About Us</h2>
                <p>At Our Society Management App, we understand that a thriving society is built on active participation, 
                  transparent communication, and collective effort. Our mission is to empower residents and management committees alike by providing a modern, efficient, and user-friendly platform to streamline processes and bridge the gap between community members.
We are committed to continually improving our app's functionality and features based on your valuable feedback and evolving needs. Together, we can create a vibrant and inclusive community where everyone's voice is heard, and every individual's contribution is valued.</p>
              </div>
              <img src="https://www.zricks.com/ImagesPostProject/200000000000228369/gallery_1_big.jpg" alt="me" />
            </div>
      
            <footer class="footer">
              <div class="copy"> Copyrights &copy; 2023 societyrun.com. </div>
              <div class="bottom-links">
                <div class="links">
                  <span>More Info</span>
                  <a href="#">Home</a>
                  <a href="#">About</a>
                  <a href="#">Contact</a>
                </div>
                <div class="links">
                  <span>Social Links</span>
                  <a href="#" target="_blank"><i class="fab fa-facebook"></i></a>
                  <a href="#"><i class="fab fa-twitter"></i></a>
                  <a href="#"><i class="fab fa-instagram"></i></a>
                </div>
              </div>
            </footer>
          </main>
        </div>
        </div>
      );
    };
