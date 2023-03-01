/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import NextError from "next/error";
import { useState, useEffect } from "react";

export const ErrorDisplay: React.FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result: any;
}> = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) return null;

  return (
    <div className="absolute top-0 left-0 z-50 h-screen w-screen">
      <NextError
        title={props.result.error.message}
        statusCode={props.result.error.data?.httpStatus ?? 500}
      />
    </div>
  );
};
