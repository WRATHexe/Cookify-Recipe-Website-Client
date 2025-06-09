import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../provider/authContext";

const Login = () => {
  const { login, setUser, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const [email, setEmail] = useState("");
  const from = location.state?.from || "/";

  const [showPassword, setShowPassword] = useState(false);

  const loginHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const emailValue = form.email.value;
    const password = form.password.value;

    login(emailValue, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        navigate(from, { replace: true }); // Redirect to intended page
        toast.success("Login successful");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error Code:", errorCode);
        console.error("Error Message:", errorMessage);
        toast.error("Login failed. Please check your credentials.");
      });
  };

  const googleLoginHandler = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        toast.success("Login successful");
        setUser(user);
        console.log(user);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error Code:", errorCode);
        console.error("Error Message:", errorMessage);
        toast.error(`Login failed: ${errorMessage}`);
      });
  };

  return (
    <div className=" p-10">
      <Helmet>
        <title>Login | COOKIFY</title>
      </Helmet>
      <div className="flex-col justify-center items-center ">
        <div className="text-center my-5">
          <h1 className="text-2xl font-bold">Login</h1>
        </div>
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={loginHandler}>
              <div>
                {/* email */}
                <fieldset className="fieldset">
                  <label className="label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="input"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {/* password */}
                  <div className="relative">
                    <label className="label">Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
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
                  <div>
                    <div
                      className="link text-left link-hover cursor-pointer"
                      onClick={() =>
                        navigate("/forgot-password", { state: { email } })
                      }
                    >
                      Forgot password?
                    </div>
                  </div>
                  <button type="submit" className="btn btn-neutral mt-4">
                    Login
                  </button>
                </fieldset>
              </div>
            </form>

            <span className="text-center">OR</span>

            <button onClick={googleLoginHandler} className="btn">
              <FaGoogle /> Sign in with Google
            </button>

            <div className="text-center">
              Not registered?{" "}
              <Link className="underline" to={"/register"}>
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
