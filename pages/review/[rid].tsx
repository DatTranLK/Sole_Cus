import { useState, useEffect } from "react";

import Post from "../../components/post/Post";
// import BLOCKQUOTE from "../components/block-quotes/Blockquote";
import PostHeader from "../../components/post-header/PostHeader";
import Image from "next/image";
// import { posts as data } from "../utils/data/post";
// import dayjs from "dayjs";
import { useRouter } from "next/router";
// import { GetServerSideProps } from "next";

export default function ReadingPage() {
  const [data, setData] = useState<ReadingPageProps>();
  const [datas, setDatas] = useState<ReadingPageProps[]>();

  const [isRender, setIsRender] = useState<boolean>(false);
  const router = useRouter();
  const { rid } = router.query;

  useEffect(() => {
    if (router.asPath !== router.route) {
      const fetchData = async () => {
        try {
          const res = await fetch(
            `https://soleauthenticity.azurewebsites.net/api/reviews/review/${rid}`
          );
          const data = await res.json();
          console.log(data.data);
  
          setData(data.data);
  
          const resFull = await fetch(
            "https://soleauthenticity.azurewebsites.net/api/reviews?page=1&pageSize=10"
          );
          const dataFull = await resFull.json();
  
          setDatas(dataFull.data);
          setIsRender(true);
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }
    

  }, [router.asPath, router.route]);

  return (
    <>
      {isRender ? (
        <>
          <PostHeader
            title={data?.title}
            tag="REVIEW"
            authorName={data?.authorName}
          />

          {data ? (
            <div className="my-10 mx-auto" style={{ textAlign: "center" }}>
              <Image
                height="350"
                width="700"
                src={`${data?.avatar}`}
                alt={data?.title}
                className="mx-auto h-[72%] w-[1424px]"
              />
            </div>
          ) : (
            <></>
          )}

          <div className="my-12 prose prose-stone lg:prose-lg mx-auto">
            <p className="mb-3 font-light text-gray-500 dark:text-gray-400 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:mr-3 first-letter:float-left">
              {data?.elements}
            </p>
            <p className="font-light text-gray-500 dark:text-gray-400">
              {data?.description.substring(0, 150)}
            </p>

            <div className="py-3.5 text-left font-normal rounded-bl-[10px] rounded-br-[10px] bg-[rgba(235,242,254,1)] text-[rgba(35,46,82,1)]">
              <img
                height="324px"
                width="1424px"
                className="cover"
                alt="Alt for images"
                src="https://source.unsplash.com/random/100x100"
              />
              <p className="text-xs leading-normal text-center uppercase">
                Image caption or credit
              </p>
            </div>

            <p className="font-light text-gray-500 dark:text-gray-400">
              {data?.description.substring(151)}
            </p>
          </div>
          <div className="container my-20 flex flex-col justify-center mx-auto">
            <h2 className="text-3xl font-light  text-gray-500 dark:text-dark-400">
              Other interesting reviews
            </h2>

            {datas
              ?.filter((id) => data?.productId !== id.productId)
              .map((item) => {
                // let GetDate = dayjs(item.date).format("DD-MMM , YYYY");

                return (
                  <Post
                    key={item.productId}
                    category={item.category}
                    // date={GetDate}
                    tag="REVIEW"
                    productId={item.productId}
                    elements={item.elements}
                    title={item.title}
                    description={item.description}
                    avatar={item.avatar}
                  />
                );
              })}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

ReadingPage.defaultProps = {};

interface ReadingPageProps {
  elements: string;
  tag: string;
  title: string;
  description: string;
  avatar: string;
  authorName: string;
  category: "Review";
  productId: number;
}
