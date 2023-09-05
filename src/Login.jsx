import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
  } from "@material-tailwind/react";
  import { useContext } from "react";
  import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { FaGoogle } from "react-icons/fa";
  
  const Login = () => {
    const { signIn, googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();
  
    const handleLogin = (e) => {
      e.preventDefault();
      const form = e.target;
      const email = form.email.value;
      const password = form.password.value;
      console.log(email, password);
      signIn(email, password)
        .then((result) => {
          const user = result.user;
          console.log(user);
          navigate('/');
        })
        .catch((err) => console.log(err));
    };
    const handleGoogleLogin = () => {
        googleLogin()
        .then(result => {
            console.log(result);
            navigate('/');
        })
    }
    return (
      <Card className="w-96 mx-auto mt-40">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign In
          </Typography>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardBody className="flex flex-col gap-4">
            <Input name="email" label="Email" size="lg" />
            <Input
              name="password"
              type="password"
              label="Password"
              size="lg"
            />
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button type="submit" variant="gradient" fullWidth>
              Sign In
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don&apos;t have an account?
              <Typography
                as="a"
                href="/register"
                variant="small"
                color="blue"
                className="ml-1 font-bold"
              >
                Signup
              </Typography>
            </Typography>
          </CardFooter>
        </form>
        <div className="text-center">
      <div className="divider"></div>
      <button
        onClick={handleGoogleLogin}
        className="btn btn-circle btn-outline text-blue-500 text-2xl my-4"
      >
        <FaGoogle></FaGoogle>
      </button>
    </div>
      </Card>
    );
  };
  
  export default Login;
  