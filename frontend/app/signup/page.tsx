'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import Link from 'next/link';
import LoadingBar from '../component/loading';


export default function SignupPage() {
      const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    fullname:"",
    email:"",
    password:""
  })
  const [error, setError] = useState('')
  const [isEmailUsed, setIsEmailUsed]= useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function handleUpload(e: any){
    e.preventDefault()
    setIsLoading(true)
    try{
         const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/signup`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(form)
    })
        const data = await res.json()
        if(!res.ok){
            setError(data.message || 'An error occurred')
            return;
        }
        localStorage.setItem('user', JSON.stringify(data))
        router.push('/dashboard')
    }
    catch(err){
        console.log(err)
        setError('Server error')
    }finally{
        setIsLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-3xl shadow-xl border border-zinc-800">
        
        {/* Logo */}
        <div className="flex flex-col items-center mb-10 text-white">
          <div className="w-14 h-14 bg-linear-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center text-3xl">
            🚀
          </div>
          <h1 className="text-3xl font-bold mt-4">Broka</h1>
          <p className="text-zinc-500 text-sm">Create your trading account</p>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-6 text-center text-white">Sign Up</h2>

        {/* Form */}
        <form className="space-y-5">

          {/* Name */}
          <div>
            <label className="text-sm text-zinc-400">Full Name</label>
            <input
              onChange={(e)=>setForm({...form, fullname:e.target.value})}
              type="text"
              placeholder="John Doe"
              className="w-full mt-2 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-2xl focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-zinc-400">Email</label>
            <input
              type="email"
              onChange={(e)=>setForm({...form, email:e.target.value})}
              required
              placeholder="you@example.com"
              className="w-full mt-2 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-2xl focus:outline-none focus:border-orange-500"
            />
            {isEmailUsed && error}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-zinc-400">Password</label>
            <div className="relative mt-2">
              <input
                type={showPassword ? 'text' : 'password'}
                onChange={(e)=>setForm({...form, password:e.target.value})}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-2xl focus:outline-none focus:border-orange-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-zinc-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={isLoading}
            onClick={handleUpload}
            className="w-full bg-orange-600 hover:bg-orange-700 transition py-3 rounded-2xl font-semibold flex items-center justify-center gap-2"
          >
            <UserPlus size={20} />
            {isLoading ? <LoadingBar/> : "Create Account"}
          </button>
        </form>
        {/* Footer */}
        <p className="text-center text-zinc-500 text-sm mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-orange-500 hover:underline cursor-pointer">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
