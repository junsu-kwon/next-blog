import Image from 'next/image';
import profileImg from '../public/images/profile.png';
import MoveButton from '@/components/MoveButton';

export default function Profile() {
  return (
    <section className="flex justify-center items-center my-10">
      <div>
        <Image
          src={profileImg}
          alt="profile"
          className="rounded-full m-auto"
          width={150}
        />
        <div className="text-center">
          <p className="text-2xl">Hi, I&apos;m Junsu</p>
          <p className="text-sm mt-1">front-end engineer</p>
          <p className="text-xs mt-2">비드코칭연구소 제품완성 팀</p>
          <MoveButton
            href="/contact"
            className="text-xs bg-yellow-300 text-black py-0.5 px-2 hover:bg-yellow-400 rounded-full mt-2"
            text="Contact Me"
          />
        </div>
      </div>
    </section>
  );
}
