import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../provider/authContext";

const Register = () => {
  const { createUser, setUser, googleLogin, updateProfileInfo } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photo.value;

    // Password validation
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter.");
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        updateProfileInfo(name, photo);
        toast.success("Registration successful");
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error Code:", errorCode);
        console.error("Error Message:", errorMessage);
      });
  };

  const googleLoginHandler = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
        navigate("/");
        toast.success("Login successful");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error("Error Message:", errorMessage);
      });
  };

  return (
    <div className="bg-base-200 p-10">
      <Helmet>
        <title>Registration | COOKIFY</title>
      </Helmet>
      <div className="flex-col justify-center items-center ">
        <div className="text-center my-5">
          <h1 className="text-2xl font-bold">Register</h1>
        </div>
        <div className="card bg-base-100 w-full mx-auto px-4 max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={RegisterHandler}>
              <fieldset className="fieldset">
                {/* name */}
                <label className="label" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="input"
                  placeholder="Name"
                  required
                />
                {/* Photo */}
                <label className="label" htmlFor="photo">
                  Photo URL
                </label>
                <input
                  type="text"
                  name="photo"
                  id="photo"
                  className="input"
                  placeholder="Photo URL"
                />

                {/* email */}
                <label className="label" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="input"
                  placeholder="Email"
                  required
                />

                {/* password */}
                <div className="relative">
                  <label className="label" htmlFor="password">
                    Password
                  </label>
                  <input
                    name="password"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="input"
                    placeholder="Password"
                    required
                  />
                  <span
                    className="absolute ml-2 top-7 cursor-pointer text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </span>
                </div>

                <button type="submit" className="btn btn-neutral mt-4">
                  Register
                </button>
              </fieldset>
            </form>

            <span className="text-center">OR</span>

            <button onClick={googleLoginHandler} className="btn">
              <FaGoogle /> Sign in with Google
            </button>

            <div className="text-center ">
              Already Have An Account ?{" "}
              <Link className="text-amber-500" to={"/login"}>
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
