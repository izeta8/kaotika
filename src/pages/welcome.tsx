import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';

const Welcome = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleNext = () => {
    router.push('/player');
  };

  const handleCancel = () => {
    handleSignOut();
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-medievalSepia">
      <h1 className="text-4xl mb-8">Welcome to Kaotika, {session?.user?.name}</h1>
      <h2 className="text-4xl mb-8">Let's set up your acolyte</h2>
      <button
        onClick={handleNext}
        className="bg-medievalSepia w-1/4 text-black text-4xl py-2 px-4 mt-10 rounded  hover:bg-darkSepia transition"
        >
        Next
      </button>
      <button
        onClick={handleCancel}
        className="bg-darkSepia w-1/4 text-white text-4xl py-2 px-4 mt-10 rounded  hover:bg-black transition"
        >
        Cancel
      </button>
    </div>
  );
};

export default Welcome;