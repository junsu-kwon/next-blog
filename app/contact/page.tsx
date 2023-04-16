import EmailForm from '@/components/EmailForm';
import { AiFillGithub, AiFillYoutube } from 'react-icons/ai';
import { FaBloggerB } from 'react-icons/fa';

export default function ContactPage() {
  return (
    <>
      <section className="text-center">
        <h1 className="text-3xl">Contact Me</h1>
        <h3 className="text-xs text-gray-300">kjs940322@gmail.com</h3>
        <h1 className="mt-3">Contact Me</h1>
        <AiFillGithub className="inline text-4xl mr-3" />
        <FaBloggerB className="inline text-4xl text-green-700 mr-3" />
        <AiFillYoutube className="inline text-4xl text-red-600" />
      </section>
      <section>
        <h1 className="my-10 text-3xl text-center">Or Send me an Email</h1>
        <EmailForm />
      </section>
    </>
  );
}
