"use client";
import { uploadImage } from "@/hooks/uploadImage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { ImSpinner9 } from "react-icons/im";
import { AuthContext } from "../../provider/AuthProvider";

const SignUp = () => {
  const { createUser, googleSigning, updateUserProfile } = useContext(AuthContext);
  const router = useRouter();
  const handleSignUp = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const image = e.target.image.files[0];
    console.log({ image, email });
    uploadImage(image)
      .then((data) => {
        const photo = data.data.display_url;
        console.log(photo);
        createUser(email, password)
          .then((result) => {
            updateUserProfile(name, photo)
              .then(() => {
                toast.success("sign in successful");
                router.push("/");
                // replace(from);
              })
              .catch((error) => {
                toast.error(error.message);
                console.log(error.message);
              });
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <>
      <div className="flex justify-center items-center min-h-screen py-10">
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
            <p className="text-sm text-gray-400">Welcome to AirCNC</p>
          </div>
          <form onSubmit={handleSignUp} noValidate="" action="" className="space-y-6 ng-untouched ng-pristine ng-valid">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter Your Name Here"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                />
              </div>
              <div>
                <label htmlFor="image" className="block mb-2 text-sm">
                  Select Image:
                </label>
                <input required type="file" id="image" name="image" accept="image/*" />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="Enter Your Email Here"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                />
              </div>
              <div>
                <div className="flex justify-between">
                  <label htmlFor="password" className="text-sm mb-2">
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  placeholder="*****"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                />
              </div>
            </div>

            <div>
              <button type="submit" className="bg-teal-600 w-full rounded-md py-3 text-white">
                Sign Up
              </button>
            </div>
          </form>
          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
            <p className="px-3 text-sm dark:text-gray-400">Signup with social accounts</p>
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          </div>
          <div onClick={googleSigning} className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer">
            <FcGoogle size={32} />

            <p>Continue with Google</p>
          </div>
          <p className="px-6 text-sm text-center text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="hover:underline hover:text-rose-500 text-gray-600">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
