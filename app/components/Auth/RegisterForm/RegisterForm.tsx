"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import React, { use } from "react";
import { Separator } from "@/components/ui/separator";
import { Github } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Required"),
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Required"),
});

const RegisterForm = () => {
  const session = useSession();
  const router = useRouter();
  if (session.status === "authenticated") {
    router?.push("/");
  }
  return (
    <div className="mt-5">
      <ToastContainer />
      <Formik
        initialValues={{
          email: "",
          password: "",
          username: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values,{setSubmitting}) => {
          // same shape as initial values
          setSubmitting(false)
          try {
            const res = await fetch("/api/user", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            });
            const data = await res.json();
            if (data.status === 200) {
              toast.success("Create Successfull, Redirecting to login page...");
              setTimeout(() => {
                router.push("/login");
              }, 3000);
            }
            if (data.status === 401) {
              toast.error("User already exists");
            }
          } catch (error) {
            toast.error("Something went wrong");
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col px-20 gap-4">
            <Field
              name="email"
              type="email"
              placeholder="Email"
              className="border py-2 rounded px-2 dark:text-darkwhite"
            />
            {errors.email && touched.email ? (
              <div className="text-warning text-sm">{errors.email}</div>
            ) : null}
            <Field
              name="username"
              type="text"
              placeholder="Username"
              className="border py-2 rounded px-2 dark:text-darkwhite"
            />
            {errors.username && touched.username ? (
              <div className="text-warning text-sm">{errors.username}</div>
            ) : null}
            <Field
              name="password"
              type="password"
              placeholder="Pasword"
              className="border py-2 rounded px-2 dark:text-darkwhite"
            />
            {errors.password && touched.password ? (
              <div className="text-warning text-sm">{errors.password}</div>
            ) : null}
            <button
              type="submit"
              className="bg-pinkpastel border-none py-2 rounded hover:opacity-75"
            >
              Register
            </button>
          </Form>
        )}
      </Formik>
      <div className="flex justify-center mt-2 gap-1 mb-5">
        <p className="opacity-50 dark:text-darkwhite dark:opacity-50">Already Register?</p>
        <Link href="/login" className="hover:opacity-75 dark:text-darkwhite ">
          Login now
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
