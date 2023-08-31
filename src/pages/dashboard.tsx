import Layout from "@theme/Layout";
import React, { useEffect, useState, useCallback } from "react"


export default function Dashboard(){
    
    const [loaded, setLoaded] = useState(false)

    const [copied, setCopied] = useState(false)
    const copy = useCallback(() => {
      setCopied((prev) => prev ? prev : true)
      const timeout2 = setTimeout(() => {
          setCopied(false)
        }, 2500);
        
        // Copy the text inside the text field
        navigator.clipboard.writeText("c dashboard")
        // Alert the copied text
        return () => clearTimeout(timeout2);
    }, [copied])

    const isStreamUp = (target : string, times : number, delay : number) =>{ 
        return new Promise((res, rej) => {
                (function rec(i) {
                  fetch(target, {mode : 'no-cors'}).then((r) => {
                    res(r)
                  }).catch(err => {
                      if (times === 0)
                        return rej(err)
    
                      setTimeout(() => rec(--times), delay)
                  })
                })(times);
              }) 
      }
    


    useEffect(() => {
        isStreamUp("http://localhost:8501/?embed=true", 3, 1000)
        .then( res => {
          setLoaded(true)
        }).catch( err => {
          setLoaded(false)
          console.error(err)
        })

        return () => {

        }
    }, [])

    return (
    <Layout>
        <div>
            {loaded ? <iframe className="w-full h-screen" src="http://localhost:8501/?embed=true"></iframe> 
                : 
            <div className=" mx-auto my-48 prose">
                 <div className=' relative mx-auto flex flex-col w-full '>

                <h1 className=" mt-5 dark:text-white ">Personal <span className=" text-pink-300">Dashboard</span> Not Streaming...</h1>
                <p className=" dark:text-white text-black font-normal">If you want to launch your <span className=" text-red-400 font-semibold">Streamlit</span> module <span className="text-pink-300 font-semibold">Dashboard</span> run</p>

                <div className='text-xs bg-zinc-800 p- rounded-t-md text-gray-300/90 font-semibold border-b-1 flex z-[10]'> 
   
                    <div className='pl-2 my-auto mr-auto font-medium '>Bash</div>
                        <div className=' p-0 rounded-md flex right-0 ' onClick={copy}>
                            <div className='m-1 font-medium'>{copied ? "Copied!" : "Copy Code"}</div>
                            <div className='p-[0.2rem] rounded-lg'>
                                {copied ? <Checked/> : <Copy/>}
                            </div>
                            </div>
                        </div>
                        <div  className={`text-left bg-zinc-900 rounded-b-lg text-xs shadow-md top-0`}  >
                        <pre className=" bg-zinc-900 shadow-lg dark:shadow rounded-md "><span className=" text-orange-400">>>></span> c dashboard 
                                            <span className=" text-green-300">
                                            <br/>Running /.../commune/modules/subspace/subspace.py
                                            <br/>You can now view your Streamlit app in your browser.
                                            <br/>Local URL: http://localhost:8501
                                            <br/>Network URL: http://0.0.0.0:8501
                                            <br/>...
                                            </span>
                                        </pre>
                        </div>
                </div>
            </div>}
        </div>
    </Layout>)
}

function Copy(){
    return (
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className=" h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>)
}

function Checked(){
    return(<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
  )
}