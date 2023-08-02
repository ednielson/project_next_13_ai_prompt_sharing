import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
    const [styles, setStyles] = useState([]);
    const [credits, setCredits] = useState(0);
    const { data: session } = useSession();

    useEffect(() => {
        const fetchStyles = async () => {
            try {
                const response = await fetch('/api/styles');
                const data = await response.json();
                setStyles(data);
            } catch (error) {
                console.error('Failed to fetch styles:', error);
            }
        };

        const fetchUserCredits = async () => {
            if (session?.user?.id) {
                try {
                    const response = await fetch(`/api/users/${session.user.id}/credits`);
                    const data = await response.json();
                    setCredits(data.credits);
                } catch (error) {
                    console.error('Failed to fetch user credits:', error);
                }
            }
        };

        fetchStyles();
        fetchUserCredits();
    }, [session]);

    const handleGenerate = async (e) => {
        e.preventDefault();

        if (credits <= 0) {
            alert('You do not have enough credits to generate a QR code.');
            return;
        }

        const success = await handleSubmit();

        if (success) {
            setCredits(prevCredits => prevCredits - 1);
        }
    };

    return (
        <div className="w-full max-w-full flex-start flex-col">
            <h1 className="head_text text-left">
                <span className="blue_gradient">{type} QR</span>
            </h1>
            <p className="desc text-left max-w-md">Create stunning images with our AI QR generator. Each code becomes a unique work of art while retaining its functional purpose.</p>
            
            {/* Display User's Credits */}
            <p className="text-left">Credits remaining: {credits}</p>
            
            <form
                onSubmit={handleGenerate}
                className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
            >
                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Enter your URL:
                        <span className="font-normal"> (this is the URL your QR-code will link to)</span>
                    </span>
                    <input
                        value={post.input_url}
                        onChange={(e) => setPost({ ...post, input_url: e.target.value })}
                        type='text'
                        placeholder='https://yoururl.com'
                        required
                        className='form_input'
                    />
                </label>

                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Select style:
                    </span>
                    <div className="styles flex-wrap">
                    {styles.map(style => (
                        <button 
                            type="button" 
                            key={style._id} 
                            onClick={() => setPost({ ...post, styleId: style._id })} 
                            className={`style-button text-xs font-satoshi-light w-2/12 border-double border-4 border-blue ${post.styleId === style._id ? 'selectedStyle' : ''}`}
                        >
                            <img src={style.imagePath} alt={style.name} />
                            <p>{style.name}</p>
                        </button>
                    ))}
                    </div>

                <div className="flex-end mx-3 mb-5 gap-4">
                    <button
                        type='submit'
                        disabled={submitting}
                        className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
                    >
                        {submitting ? 'Generating...' : 'Generate'}
                    </button>
                </div>
                
            </form>
            
        </div>
    );
};

export default Form;
