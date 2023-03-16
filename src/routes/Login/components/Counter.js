import React from 'react'
import PropTypes from 'prop-types'
import axios from "axios"

class LoginLanding extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 'username',
      username: '',
      placeholder: 'Username',
      password: '',
      confirmpassword: '',
      isLoading: false,
      isSignUp: false,
    }
  }

  componentDidMount = () => {
    localStorage.clear()
  }

  actionHandler = (e) => {
    if (e.target.value !== '') {
      this.setState({
        [e.target.id]: e.target.value
      })
    } else {
      this.setState({
        [e.target.id]: ''
      })
    }
  }

  enableSingUp = (isSignUp) => {
    this.setState({
      isSignUp: !!isSignUp
    })
  }

  loginHandler = (e) => {
    e.preventDefault()
    let admin = {
      "user": {
        "userName": "admin123",
        "userFirstName": "admin",
        "userLastName": "admin",
        "userPassword": "$2a$10$MH9UBe9a.z6Mk5X7AC/6gOeDKkdLNM6tbjPiuPiuP.val2LD33oxu",
        "role": [{
          "roleName": "Admin",
          "roleDescription": "Admin role"
        }]
      },
      "jwtToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjEyMyIsImV4cCI6MTY3ODYzOTM3NiwiaWF0IjoxNjc4NjIxMzc2fQ.YvaeggX7n0sXso-5E4uxhXkO5Sflq1XSZM6yoZlVFCrFpqwXEZBqy20uYevLKOrjRB5w-FR1oppi3zuBCZ8bWQ"
    }

    let user = {
      "userName": "sanjeev",
      "userFirstName": "sanjeev",
      "userLastName": "kumar",
      "userPassword": "$2a$10$nDP3Nk4jOr37dZF3Jbqg5.0dFByW952OrSfJMfnWr4I9iP2TfKrFC",
      "role": [{
        "roleName": "User",
        "roleDescription": "Default role for newly created record"
      }]
    }

    window.scrollTo({ top: 0 })
    this.setState({
      isLoading: true
    }, () => {
      let { username, password } = this.state
      let object = {
        userName: username,
        userPassword: password
      }
      
      /*post request :If the role is 'User', the code redirects the user to the home page using window.location.href.
If the role is not 'User', the code assumes the user is an admin and sets the admin's JWT token in the local storage using localStorage.setItem().
 Then, it redirects the user to the admin page.*/

      axios.post(`http://localhost:9090/authenticate`, object).then((response) => {
        console.log('response', response)
        localStorage.setItem("role", response.data.user.role[0].roleName)
        if (response.data.user.role[0].roleName == 'User') {
          window.location.href = '/'
        } else {
          localStorage.setItem("token", admin.jwtToken)
          window.location.href = 'admin'
        }
      }).catch(() => {
        alert('Invalid Credentials')
      }).finally(() => {
        this.setState({
          isLoading: false
        })
      })

    })
  }

  singupHandler = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0 })
    this.setState({
      isLoading: true
    }, () => {
      let { username, password, firstName, lastName } = this.state
      let object = {
        "userName": username,
        "userPassword": password,
        "userFirstName": firstName,
        "userLastName": lastName
      }
      axios.post(`http://localhost:9090/registerNewUser`, object).then((response) => {
        alert('user registered..')
      }).finally(() => {
        this.setState({
          isLoading: false,
          username: '',
          password: '',
          firstName: '',
          lastName:'',
          isSignUp: false
        })
      })
    })
  }

  render() {
    let loginBtndisabled = false
    let signupBtndisabled = false
    let { username, password, isSignUp, isLoading, firstName, lastName } = this.state
    loginBtndisabled = !!username && !!password
    signupBtndisabled = !!firstName && !!lastName && loginBtndisabled
    return (
      <div style={{ margin: '0 auto' }} >
        {isLoading ? <div className="spinner"></div> :
          <section className="page-section" id="contact">
            <div className="container">
              <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">
                {isSignUp ? 'New User Registration' : 'Login'}
              </h2>
              <div className="divider-custom">
                <div className="divider-custom-line"></div>
                <div className="divider-custom-icon"><i className="fas fa-star"></i></div>
                <div className="divider-custom-line"></div>
              </div>
              <div className="row justify-content-center">
                <div className="col-lg-8 col-xl-7">
                  <form id="contactForm" >
                    {isSignUp ?
                      <div>
                        <div className="form-floating mb-3">
                          <input className="form-control"
                            id="firstName"
                            type="firstName"
                            value={firstName}
                            onChange={this.actionHandler}
                            placeholder="Enter your name..." />
                          <label for="name">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                          <input className="form-control"
                            id="lastName"
                            type="lastName"
                            value={lastName}
                            onChange={this.actionHandler}
                            placeholder="Enter your name..." />
                          <label for="name">Last Name</label>
                        </div>
                      </div> : ''}
                    <div className="form-floating mb-3">
                      <input className="form-control"
                        id="username"
                        type="username"
                        value={username}
                        onChange={this.actionHandler}
                        placeholder="Enter your name..." />
                      <label for="name">User Name</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input className="form-control"
                        id="password"
                        type="password"
                        value={password}
                        onChange={this.actionHandler}
                        placeholder="name@example.com" />
                      <label for="email">Password</label>
                      <div className="invalid-feedback" >An Password is required.</div>
                      <div className="invalid-feedback" >Email is not valid.</div>
                    </div>

                    {isSignUp ? <button className={`btn btn-primary btn-xl ` + (signupBtndisabled ? '' : 'disabled')}
                      id="submitButton"
                      onClick={this.singupHandler}>Singup</button> :
                      <button className={`btn btn-primary btn-xl ` + (loginBtndisabled ? '' : 'disabled')}
                        id="submitButton"
                        onClick={this.loginHandler}>Login</button>}
                    {!isSignUp ?
                      <div className="cursor-pointer text-left text-black-50 mb-3 mt-3" onClick={() => {
                        this.enableSingUp('isSignUp')
                      }}>New User? Click here</div> : <div className=" cursor-pointer text-left text-black-50 mb-3 mt-3" onClick={() => {
                        this.enableSingUp()
                      }}>Click Here For Login</div>}
                  </form>
                </div>
              </div>
            </div>
          </section>}
      </div>
    )
  }
}

LoginLanding.propTypes = {
  counter: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  doubleAsync: PropTypes.func.isRequired,
}

export default LoginLanding
