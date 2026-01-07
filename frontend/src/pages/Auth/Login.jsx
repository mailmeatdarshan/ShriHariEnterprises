import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/";

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <div>
            <section className="h-screen flex overflow-hidden">
                <div className="mr-[4rem] mt-[5rem] pl-[10rem]">
                    <h1 className="text-2xl font-semibold mb-4">Sign In</h1>

                    <form onSubmit={submitHandler} className="container w-[40rem]">
                        <div className="my-[2rem]">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-black"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="mt-1 p-2 border rounded w-full"
                                // placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-black"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="mt-1 p-2 border rounded w-full"
                                // placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            disabled={isLoading}
                            type="submit"
                            className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
                        >
                            {isLoading ? "Signing In..." : "Sign In"}
                        </button>

                        {isLoading && <Loader />}
                    </form>

                    <div className="mt-4">
                        <p className="text-black">
                            New Customer?{" "}
                            <Link
                                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                                className="text-pink-500 hover:underline"
                            >
                                Register
                            </Link>
                        </p>
                    </div>
                </div>

                <img
                    src="https://i.pinimg.com/1200x/5c/55/44/5c55440dcfdd2fb19ffa61fe3d445b0b.jpg"
                    alt=""
                    className="h-[90%] w-[45%] mt-[2rem] xl:block md:hidden sm:hidden rounded-lg object-cover"
                />
            </section>
        </div>
    );
};

export default Login;
