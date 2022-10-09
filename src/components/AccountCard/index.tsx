import { useRouter } from "next/router";
import React from "react";

interface AccountCardProps {
  title?: string;
  src?: string;
  description: string;
  href: string;
  className?: string;
}

const AccountCard: React.FC<AccountCardProps> = ({
  title,
  src,
  description,
  href,
  className,
}) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(href)}
      className={`${className} border-[0.5px] border-gray-300 flex items-center gap-1 py-[14px] px-[14px] rounded-lg max-w-[320px] cursor-pointer bg-slate-50 hover:bg-gray-100 `}
    >
      <img src={src} alt={title} className='h-[100px]' />
      <div className='flex flex-col gap-1'>
        <h5 className='font-semibold text-xl'>{title}</h5>
        <p className='font-xs text-xs line-clamp-3'>{description}</p>
      </div>
    </div>
  );
};

export default AccountCard;
