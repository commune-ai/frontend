import {useState} from 'react';
import Image from "next/image";
import { Bounce } from 'react-awesome-reveal';
import { InView } from "react-intersection-observer";

export default function WelcomeSection() {

    const [show, setShow] = useState(false);

    return (
      <InView onChange={(inView) => setShow(inView)} id="welcome" className="h-full pt-20 dark:bg-gray-900 overflow-hidden">
        <div className="flex flex-col items-center justify-center">
          <div className="pt-6 w-full">
            {
              show && (
                <Bounce duration={1000} delay={300}>
                <h1 className="text-6xl pb-3 dark:text-[#32CD32] text-center">
                  Welcome to the{" "}
                  <span className="text-[#ffb4ed] dark:text-[#FFD6F5] hover:animate-pulse duration-500">
                    commune
                  </span>
                  ! 
                </h1>
              </Bounce>
              )
          }
            
            <p className="hero__subtitle text-4xl text-center dark:text-[#32CD32]">
              A place for{" "}
              <span className="text-[#ffb4ed] dark:text-[#FFD6F5]">everyone</span>{" "}
              to{" "}
              <span className="text-[#6db1ff] dark:text-[#6db1ff]">develop</span>,{" "}
              <span className="text-[#FF8F8F]  dark:text-[#FF8F8F]">design</span>,
              and{" "}
              <span className="text-[#ffef40] dark:text-[#FFF7A1]">create</span>.
            </p>
          </div>
          <div className="flex sm:h-[300px] lg:h-[500px] items-center justify-evenly px-3 gap-0 w-full">
            <div className="flex flex-col items-center justify-evenly text-transparent hover:dark:text-[#32CD32] hover:text-black duration-300 font-sans font-semibold text-lg">
              <Image
                  src="/img/products/discord-bot.jpg"
                  className="rounded-lg"
                  alt='Image'
                  width={250}
                  height={220}
                />
              <p className="mt-1">Commune Discord Bot</p>
            </div>
            <div className="flex flex-col items-center justify-center text-transparent hover:dark:text-[#32CD32] hover:text-black duration-300 font-sans font-semibold text-lg">
              <Image
                  src="/img/products/telegram.jpg"
                  className="rounded-lg h-[250px]"
                  alt='Image'
                  width={250}
                  height={250}
                />
              <p className="mt-1">Commune Telegram Bot</p>
            </div>
            <div className="flex flex-col items-center justify-center text-transparent hover:dark:text-[#32CD32] hover:text-black duration-300 font-sans font-semibold text-lg">
              <Image
                  src="/img/products/trading.jpg"
                  className="rounded-lg h-[250px]"
                  alt='Image'
                  width={250}
                  height={200}
                />
              <p className="mt-1">Commune Trading Bot</p>
            </div>
            <div className="flex flex-col items-center justify-center text-transparent hover:dark:text-[#32CD32] hover:text-black duration-300 font-sans font-semibold text-lg">
              <Image
                  src="/img/products/scrapping.jpg"
                  className="rounded-lg h-[250px]"
                  alt='Image'
                  width={250}
                  height={200}
                />
              <p className="mt-1">Commune Scrapping Bot</p>
            </div>
            <div className="flex flex-col items-center justify-center text-transparent hover:dark:text-[#32CD32] hover:text-black duration-300 font-sans font-semibold text-lg">
              <Image
                  src="/img/products/rust.jpeg"
                  className="rounded-lg h-[250px]"
                  alt='Image'
                  width={250}
                  height={200}
                />
              <p className="mt-1">Commune Rust</p>
            </div>
            <div className="flex flex-col items-center justify-center text-transparent hover:dark:text-[#32CD32] hover:text-black duration-300 font-sans font-semibold text-lg">
              <Image
                  src="/img/products/wasm.png"
                  className="rounded-lg h-[250px]"
                  alt='Image'
                  width={250}
                  height={200}
                />
              <p className="mt-1">Commune Wasm</p>
            </div>
          </div>
        </div>
      </InView>
    );
  }