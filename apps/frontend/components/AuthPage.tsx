"use client"
export function AuthPage({isSignin}:{
    isSignin: boolean
}){
    
    


    return (
    <div className="w-screen h-screen flex justify-center items-center">
        <div className="p-2 m-2 bg-white rounded-md text-black">
            
            { !isSignin ? 
                <div className="p-2">
                    <input type="text" placeholder="Name"></input>
                </div> : ""
            }
            <div className="p-2">
                <input type="text" placeholder="Email"></input>
            </div>
            <div className="p-2">
                <input type="password" placeholder="Password"></input>
            </div>
            <div className="p-2 flex justify-center items-center">    
                <button onClick={()=>{        
                }}>{isSignin ? "Signin" : "Signup "}</button>
            </div>
        </div>
    </div>
    )
}