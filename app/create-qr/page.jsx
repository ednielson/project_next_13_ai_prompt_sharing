"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react"; // Import this
import Form from "@components/Form";

const CreateQR = () => {
    const router = useRouter();
    const { data: session } = useSession(); // Get the session
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        input_url: '',
        output_url: '',
        styleId: ''
    });

    const createQR = async (e) => {
        setSubmitting(true);
        try {
            const response = await fetch('/api/qr/new', {
                method: 'POST',
                body: JSON.stringify({
                    userId: session?.user?.id, // Pass the userId
                    input_url: post.input_url,
                    styleId: post.styleId
                })
            });

            if (response.ok) {
                router.push('/profile');
                return true;
            } else {
                const data = await response.json();
                console.error(data);
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Form type="Create" post={post} setPost={setPost} submitting={submitting} handleSubmit={createQR} />
    );
};

export default CreateQR;
