"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Rate } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

interface CommentProps {
  animeId?: string;
  animeChapterId?: string;
}
interface CommentItem {
  user: {
    username: string;
    avatar: string;
  };
  date: string;
  content: string;
  starValue: number;
}

const CommentSchema = Yup.object().shape({
  content: Yup.string()
    .min(10, "Content must be at least 10 characters")
    .required("Required"),
});

const Comment: React.FC<CommentProps> = ({ animeId, animeChapterId }) => {
  const [commentData, setCommentData] = useState<CommentItem[]>([]);
  const [commentDataByChapterId, setCommentDataByChapterId] = useState<
    CommentItem[]
  >([]);
  const session = useSession();
  const [starValue, setStarValue] = useState(0);
  const handleRatingChange = (value: any) => {
    setStarValue(value);
  };

  const getCommentData = async () => {
    try {
      if (animeChapterId && animeId) {
        const res = await fetch(`/api/comment?chapterId=${animeChapterId}`);
        const data = await res.json();
        setCommentDataByChapterId(data.commentData);
      } else if (!animeChapterId && animeId) {
        const res = await fetch(`/api/comment?animeId=${animeId}`);
        const data = await res.json();
        setCommentData(
          data.commentDataByAnimeId.filter(
            (comment: any) => comment.animeChapterId === null
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const sendData = async (values: any, { resetForm }: any) => {
    try {
      const data = {
        content: values.content,
        starValue: starValue,
        animeId,
        animeChapterId: animeChapterId || null,
        userEmail: session?.data?.user?.email,
      };
      const res = await fetch("/api/comment", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const returnData = await res.json();
      if (returnData.status === 200) {
        toast.success("Nice comment!");
        resetForm();
        getCommentData();
      } else {
        toast.error("Comment failed!");
        resetForm();
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getCommentData();
  }, [animeId, animeChapterId]);
  return (
    <div className="shadow-lg w-full min-h-[10vh] mt-10">
      <ToastContainer />
      <div className="p-5">
        <h1 className="tracking-wider text-2xl dark:text-darkwhite">
          Anime Discussion
        </h1>
        <div className="mt-2">
          <p className="dark:text-darkwhite">
            Rate this anime and give it comment
          </p>
          {session?.status === "authenticated" ? (
            <Formik
              initialValues={{
                content: "",
              }}
              validationSchema={CommentSchema}
              onSubmit={async (values, actions) => {
                // try{
                //     const res= await fetch("/api/comment",{
                //         method: "POST",
                //         headers: {
                //             "content-type": "application/json"
                //         },
                //         body:JSON.stringify(values.content, )
                //     })
                // }
                sendData(values, actions);
              }}
            >
              {({ errors, touched }) => (
                <Form className="flex w-1/2 flex-col gap-2 mt-3">
                  <Rate
                    allowClear
                    onChange={handleRatingChange}
                    defaultValue={starValue}
                    className="dark:bg-lightgreen dark:bg-opacity-60 w-fit"
                  />
                  <Field
                    name="content"
                    as="textarea"
                    rows={4}
                    placeholder="Your content here"
                    className="border py-2 rounded px-2 bg-transparent dark:bg-lightgreen"
                  />
                  {errors.content && touched.content ? (
                    <div className="text-warning text-sm">{errors.content}</div>
                  ) : null}
                  <button
                    type="submit"
                    className="bg-pinkpastel border-none py-2 rounded hover:opacity-75"
                  >
                    Comment
                  </button>
                </Form>
              )}
            </Formik>
          ) : (
            <Formik
              initialValues={{
                content: "",
              }}
              validationSchema={CommentSchema}
              onSubmit={async (values, actions) => {
                // try{
                //     const res= await fetch("/api/comment",{
                //         method: "POST",
                //         headers: {
                //             "content-type": "application/json"
                //         },
                //         body:JSON.stringify(values.content, )
                //     })
                // }
                sendData(values, actions);
              }}
            >
              {({ errors, touched }) => (
                <Form className="flex w-1/2 flex-col gap-2 mt-3">
                  <Rate
                    allowClear
                    onChange={handleRatingChange}
                    defaultValue={starValue}
                    disabled
                    className="dark:bg-lightgreen dark:bg-opacity-60 w-fit"
                  />
                  <Field
                    name="content"
                    as="textarea"
                    rows={4}
                    placeholder="You must login to comment"
                    className="border py-2 rounded px-2 bg-transparent dark:bg-lightgreen"
                    disabled
                  />
                  {errors.content && touched.content ? (
                    <div className="text-warning text-sm">{errors.content}</div>
                  ) : null}
                  <button
                    type="submit"
                    className="bg-pinkpastel border-none py-2 rounded opacity-50"
                    disabled
                  >
                    Comment
                  </button>
                </Form>
              )}
            </Formik>
          )}
        </div>
        <div className="mt-5">
          {animeChapterId ? (
            <h1 className="text-2xl tracking-wider dark:text-darkwhite">
              All Comments ({commentDataByChapterId.length})
            </h1>
          ) : (
            <h1 className="text-2xl tracking-wider dark:text-darkwhite">
              All Comments ({commentData.length})
            </h1>
          )}

          {commentData &&
            commentData?.map((item, index) => (
              <div className="w-1/2 mt-2" key={index}>
                <div className="flex flex-col mb-2">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={item.user.avatar}
                        className="w-10 h-10 rounded-full"
                      />
                      <p className="font-bold text-xl mb-2 dark:text-darkwhite">
                        {item.user.username}
                      </p>
                    </div>

                    <p className="dark:text-darkwhite">
                      {moment(item.date).format("MMMM Do, YYYY")}
                    </p>
                  </div>
                  <div>
                    {item.starValue ? (
                      <Rate defaultValue={item.starValue} disabled />
                    ) : null}
                  </div>
                </div>

                <textarea
                  rows={4}
                  className="w-full border bg-lightgreen rounded p-2"
                  disabled
                  value={item.content}
                ></textarea>
              </div>
            ))}
          {commentDataByChapterId &&
            commentDataByChapterId.map((item, index) => (
              <div className="w-1/2 mt-2 " key={index}>
                <div className="flex justify-between">
                <div className="flex items-center gap-2">
                      <img
                        src={item.user.avatar}
                        className="w-10 h-10 rounded-full"
                      />
                      <p className="font-bold text-xl mb-2 dark:text-darkwhite">
                        {item.user.username}
                      </p>
                    </div>
                  <p className="dark:text-darkwhite">
                    {moment(item.date).format("MMMM Do, YYYY")}
                  </p>
                </div>

                <textarea
                  rows={4}
                  className="w-full border rounded p-2 bg-lightgreen"
                  disabled
                  value={item.content}
                ></textarea>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Comment;
