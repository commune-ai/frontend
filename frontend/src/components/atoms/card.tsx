'use client';

export default function Card({ className, children, colorfrom, colorto }: { className?: string; children: React.ReactNode; colorfrom?:string; colorto?:string}) {
   return (
      <div className={`${className} drop-shadow-[2px_2px_5px_rgba(0,0,0,0.16)] bg-white rounded-[7px] font-medium`}  style={{backgroundImage: `linear-gradient(to bottom right, ${colorfrom}, ${colorto})`}}>
         {children}
      </div>
   );
}
