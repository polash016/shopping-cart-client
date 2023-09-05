import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
  } from "@material-tailwind/react";
  import { useContext } from "react";
  import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
  
  const Registration = () => {
    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleRegister = e => {
        e.preventDefault();
      const form = e.target;
      const email = form.email.value;
      const password = form.password.value;
      console.log(email, password);
      createUser(email, password)
      .then(user => {
        console.log(user);
        navigate('/')
      })
    }
  
    return (
      // < onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-96 mx-auto mt-40">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign Up
          </Typography>
        </CardHeader>
        <form onSubmit={handleRegister}>
          <CardBody className="flex flex-col gap-4">
            <Input
              name="name"
              label="Name"
              size="lg"
            />
            <Input
              name="email"
              label="Email"
              size="lg"
            />
            <Input
              type="password"
              name="password"
              label="Password"
              size="lg"
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button type="submit" variant="gradient" fullWidth>
              Sign Up
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Typography
                as="a"
                href="/login"
                variant="small"
                color="blue"
                className="ml-1 font-bold"
              >
                Sign in
              </Typography>
            </Typography>
          </CardFooter>
        </form>
      </Card>
    );
  };
  
  export default Registration;
  