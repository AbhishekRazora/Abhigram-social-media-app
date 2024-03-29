import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
 
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


import { SignupValidationSchema } from "@/lib/validation"
import Loader from "@/components/shared/Loader"
import { Link,useNavigate } from "react-router-dom"
// import { createUserAccount } from "@/lib/appwrite/api"

import { useToast } from "@/components/ui/use-toast"
import { useCreateUserAccountMutation, useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"


// const formSchema = z.object({
//   username: z.string().min(2).max(50),
// })

const SignUp = () => {

  const {toast}=useToast()
// const isLoading=false;

const {checkAuthUser}=useUserContext()

const navigate=useNavigate()
const {mutateAsync:createUserAccount,isPending:isCreatingUser}=useCreateUserAccountMutation()

const {mutateAsync:signInAccount}=useSignInAccount()

  const form = useForm<z.infer<typeof SignupValidationSchema>>({
    resolver: zodResolver(SignupValidationSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })

   async function onSubmit(values: z.infer<typeof SignupValidationSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values)
    const newUser=await createUserAccount(values);
    // console.log(newUser)

    if(!newUser){
      return  toast({
        title: "Sign up failed.Please try again."
        
      });
    }

    const session=await signInAccount({
      email:values.email,
      password:values.password,
    })

    if(!session){
      return toast({title:"Sign in failes.Please try again."})
    }

    const isLoggedIn=await checkAuthUser();

    if(isLoggedIn){
      form.reset()

      navigate('/')
    }else{
      return toast({title:'Sign up failed.Please try again.'})
    }
  }

  return (
    <Form {...form}>
      {/* <div className="sm:w-420 flex-center flex-col h-1/2"> */}
      <div className="sm:w-420 flex-center flex-col ">
        <img src="/assets/images/logo.svg" alt="" />
        <h2 className="h3-bold md:h2-bold pt-3 sm:pt-12 ">Create a new account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">To use Abhigram,please enter your details</p>


        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
          {isCreatingUser?(
            <div className="flex-center gap-2">
              <Loader/>Loading...
              </div>
          ):"Sign Up"}
          </Button>
        </form>

        <p className="text-small-regular text-light-2 text-center mt-2">Already have an account?
        <Link to='/sign-in' className="text-primary-500 text-small-semibold ml-1">Log in</Link>
        </p>
      </div>
    </Form>
  )
}

export default SignUp
