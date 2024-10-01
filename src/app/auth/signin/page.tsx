'use client';
import { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [timer, setTimer] = useState(0);
  const router = useRouter();

  useEffect(() => {
    let countdown: NodeJS.Timeout | undefined;
    if (timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(countdown);
      setIsButtonDisabled(false);
    }
    return () => clearInterval(countdown);
  }, [timer]);

  const signIn = async () => {
    window.localStorage.setItem('emailForSignIn', email);
    setIsButtonDisabled(true);
    setIsLoading(true);
    setError('');
    setSuccess('');
    try {
      const response = await fetch('/api/checkAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      setSuccess('Un mail de connexion vous a été envoyé par email.');
      setIsLoading(false);
      setTimer(59); // 59 seconds timer
    } catch (error: any) {
      setIsLoading(false);
      setIsButtonDisabled(false);
      setError(error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="w-full max-w-md px-6 py-12 bg-white text-black shadow-lg rounded-lg">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="mx-auto h-20 w-auto mb-8"
              src="/oxelta_logo.png"
              alt="Logo de l'application BisouRivage"
            />
            <h2 className="mt-4 text-center text-3xl font-bold tracking-tight text-black">
              Connexion à votre compte
            </h2>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Adresse email
                </label>
                <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 bg-gray-50 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                </div>
              </div>
          <div>
            <button
              disabled={!email || isButtonDisabled}
              onClick={signIn}
              className={`disabled:opacity-40 flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : timer > 0 ? (
                `${timer} secondes...`
              ) : (
                'Sign In'
              )}
            </button>
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          {success && <p className="mt-2 text-sm text-green-600">{success}</p>}
        </div>
      </div>
    </div>
  </div>
  );
}
