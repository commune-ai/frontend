"use client";
import { FiGithub } from "react-icons/fi";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";

const SignIn = () => {

    return (
        <div className="h-screen relative">
            <img src="/img/frontpage/signin-background.jpg" alt="Image" className="h-full object-cover" />
            <div className=" absolute inset-0 flex flex-col items-center justify-center ">
                <div className="w-1/3 bg-slate-200 h-2/6  p-[20px]">
                    <img src="/gif/logo/commune.gif" width={35} height={35}></img>
                    <div className="flex items-center flex-col ">
                        <h1>Welcome to Commune</h1>
                        <div className="bg-black p-[10px] items-center flex justify-center gap-x-[5px] mt-[20px] cursor-pointer" onClick={ () => signIn('github')}>
                            <FiGithub className="text-white w-[25px] h-[25px]"></FiGithub>
                            <span className="text-white text-[15px]">Sign in with GitHub</span>
                        </div>

                        <span className="text-center mt-[20px]">
                            By signing in, you agree to our&nbsp;
                            <a href="/" className="underline">terms of service</a>
                            &nbsp;and&nbsp;
                            <a href="/" className="underline">privacy policy</a>.
                        </span>

                    </div>
                </div>

                <div className="w-1/3 bg-slate-300 h-2/6 p-[20px] flex justify-center items-center">
                        <div className="bg-white p-[20px] flex gap-x-[10px]">
                              <div className="rounded-full w-[30px] h-[30px]">
                                    <img src="/gif/logo/danny.jpeg" className="rounded-full"></img>
                              </div>
                              <div className="flex flex-col">
                                 <span className="font-bold">@dannypostmaa</span>
                                 <span>"Commune is the reason AI apps exist"</span>
                              </div>
                        </div>
                </div>
            </div>
        </div>

    )
}

export default SignIn