"use client"
import { ChangeEventHandler } from 'react'
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import { useSubmit } from '@/hooks/use';
import { useRouter } from 'next/navigation';
import GameImage from '@/components/auth/GameImage'
import Form from '@/components/auth/Form'

interface Credentials{
    username: string,
    password: string
}

export default function SignIn(){
    const credentials = useFormik<Credentials>({
        initialValues: {
            username: "",
            password: ""
        },
        onSubmit: () => {
            const { username, password } = credentials.values;
            submitForm({
                uri: "auth/signin",
                method: "POST",
                body: { username, password }
            })
        }
    });
    const router = useRouter();

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        credentials.setFieldValue(e.target.name, e.target.value);
    }

    const { mutate: submitForm } = useSubmit({
        onSuccess: (res: any) => {
            Swal.fire({
                title: "Success!",
                text: "Sign in successfully",
                icon: "success",
                showCancelButton: false,
                showConfirmButton: true
            }).then((result: any) => {
                if(result.isConfirmed){
                    localStorage["portalToken"] = res.data.token;
                    localStorage["username"] = res.data.username;
                    router.push('/discover');
                    router.refresh();
                }
            });
        },
        onError: (error: any) => {
            console.log(error);
        }
    });

    return (
        <>
            <section id="signin" className="min-w-full h-screen">
                <div className="container min-w-full border border-slate-900 h-full flex justify-center items-center">
                    <div className="modal-card bg-white w-[700px] shadow-md rounded-md h-fit grid grid-cols-2 overflow-hidden">
                        <Form handleSubmit={credentials.handleSubmit} onHandleChange={handleChange} isFlipped={true} isSignInPage={true} />
                        <GameImage isFlipped={false} />
                    </div>
                </div>
            </section>
        </>
    )
}