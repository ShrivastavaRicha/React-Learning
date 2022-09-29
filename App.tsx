import * as React from 'react';
import './style.css';

export default function App() {
  const intialValues = { username: '', email: '', password: '' };
  const [formValues, setFormValues] = React.useState(intialValues);
  const [formErrors, setFormErrors] = React.useState({});
  const [isSubmit, setisSubmit] = React.useState(false);

  React.useEffect(() => {
    console.log(Object.keys(formErrors).length === 0 && isSubmit);
  }, [formErrors]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setisSubmit(true);
  };

  const validate = (values) => {
    const errorsObj = {};
    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!values.username) {
      errorsObj.username = 'userName is Required';
    }
    if (!values.email) {
      errorsObj.email = 'Email is Required';
    } else if (!email_regex.test(values.email)) {
      console.log('in regex');
      errorsObj.email = 'This is not a valid email';
    }
    if (!values.password) {
      errorsObj.password = 'Password is Required';
    }

    return errorsObj;
  };

  return (
    <div>
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div>Signed in succesfully</div>
      ) : (
        <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      )}
      <form action="" onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <div className="login-wrapper">
          <div>
            <label>UserName</label>
            <input
              type="text"
              name="username"
              placeholder="UserName"
              onChange={handleChange}
            />
            <p>{formErrors.username}</p>
          </div>
          <div>
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
            <p>{formErrors?.email}</p>
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <p>{formErrors?.password}</p>
          </div>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}
