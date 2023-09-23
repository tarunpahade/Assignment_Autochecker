'use client'
import * as React from 'react';
import { useEffect, useState } from 'react';
import { decode } from 'base64-url';
import { useRouter, } from 'next/navigation';
import { executeCode } from '@/utils/execute-code';

export default function Preview() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Specify the type as string | null
  const [preview, setPreview] = useState<React.ReactElement | null>(null); // Specify the type as React.ReactElement | null

  const router = useRouter();

  /** Decode "code" query parameter */
//   useEffect(() => {
//     if (router.query.code) {
//       setCode(decode(router.query.code as string));
//     }
//   }, [router.query.code]);

  /** Listen for incoming window events and set the code. */
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (window.location.origin === event.origin && event.data.type === 'preview') {
        setCode(decode(event.data.code));
      }
    }

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  /** Execute preview to render */
  useEffect(() => {
    if (code === null) return;

    setError(null);
    setLoading(true);

    executeCode(code, { react: React })
      .then((Preview: any) => {
        setPreview(<Preview />);
      })
      .catch((error) => {
        setError(error.toString());
      })
      .finally(() => {
        setLoading(false);
      });
  }, [code]);

  return (
    <>
      {loading ? 'Loading preview...' : preview}
      {error}
    </>
  );
}
