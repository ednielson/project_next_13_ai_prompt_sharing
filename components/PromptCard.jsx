"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { saveAs } from 'file-saver';

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const handleDownload = () => {
    saveAs(post.output_url, "QRartai.png");
};
  
  

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div
          className='flex-1 flex justify-start items-center gap-3'
        >
      

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {post.style}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {post.input_url}
            </p>
          </div>
        </div>

        <div className='download_btn cursor-pointer flex' onClick={handleDownload}>
          <alt className='font-inter text-sm orange_gradient cursor-pointer mr-1'>Download</alt>
          <Image
            src={"/assets/icons/download.svg"}
            alt={"download_icon"}
            width={16}
            height={16}
          />
        </div>
      </div>

      <div>
        <Image 
          src={post.output_url}
          alt='user_image'
            width={600}
            height={600}
            className='flex-1 mt-3'
        />
        </div>
{/* {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )} */}
      
    </div>
  );
};

export default PromptCard;