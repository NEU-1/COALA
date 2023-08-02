import { useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';

const NoSsrEditor = dynamic(() => import('components/TuiEditor'), {
  ssr: false,
});

const Page = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const ref = useRef<any>(null);


  return (
    <>
      <Layout noFooter noNav className="h-screen w-full overflow-hidden">
        <form
          onSubmit={handleSubmit(async (data) => {
            ...
          })}
          className="h-screen w-full"
        >
   		  ...
          <NoSsrEditor content="" editorRef={ref} />
          ...
        </form>
      </Layout>
    </>
  );
};

export default Page;