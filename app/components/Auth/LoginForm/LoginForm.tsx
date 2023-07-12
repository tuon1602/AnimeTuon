"use client";
import { signIn, signOut } from "next-auth/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Github } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Required"),
});

const LoginForm = () => {
  const searchParams = useSearchParams();
  const errorSearch = searchParams.get("error");

  const session = useSession();
  const router = useRouter();
  if (session.status === "authenticated") {
    router?.push("/");
  }
  useEffect(() => {
    if (errorSearch) {
      toast.error(errorSearch);
    }
  }, [errorSearch]);
  // if(session.status==="loading"){
  // }
  return (
    <div className="mt-5">
      <ToastContainer />
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          // same shape as initial values
          const email = values.email;
          const password = values.password;
          try {
            signIn("credentials", { email, password });
          } catch (error: any) {
            router?.push("/login");
            toast.error(error.message);
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col px-20 gap-4">
            <Field
              name="email"
              type="email"
              placeholder="Email"
              className="border py-2 rounded px-2"
            />
            {errors.email && touched.email ? (
              <div className="text-warning text-sm">{errors.email}</div>
            ) : null}
            <Field
              name="password"
              type="password"
              placeholder="Pasword"
              className="border py-2 rounded px-2"
            />
            {errors.password && touched.password ? (
              <div className="text-warning text-sm">{errors.password}</div>
            ) : null}
            <button
              type="submit"
              className="bg-pinkpastel border-none py-2 rounded hover:opacity-75"
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
      <div className="text-center mt-3 text-xl px-20 flex flex-col gap-4">
        Or sign in with
        <div
          className="cursor-pointer bg-pinkpastel text-white py-1 border flex items-center justify-center gap-2 hover:opacity-75 rounded"
          onClick={() => signIn("github")}
        >
          <Github className="w-8 h-8 text-gray" />
          <p className="text-gray text-lg">Sign in with Github</p>
        </div>
        <div
          className="cursor-pointer bg-pinkpastel text-white py-1 border flex items-center justify-center gap-2 hover:opacity-75 rounded"
          onClick={() => signIn("google")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            viewBox="0 0 488 512"
          >
            <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
          </svg>
          <p className="text-gray text-lg">Sign in with Google</p>
        </div>
      </div>
      <div className="flex justify-center mt-2 gap-1 mb-5">
        <p className="opacity-50">Dont have account?</p>
        <Link href="/register" className="hover:opacity-75">
          Register now
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
