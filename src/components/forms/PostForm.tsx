
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
 import { useNavigate } from "react-router-dom"
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
import FileUploader from '../shared/FileUploader'
import { PostValidationSchema } from '@/lib/validation'
import { Models } from 'appwrite'
import { useCreatePost } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"
import { useToast } from "../ui/use-toast"



// const formSchema = z.object({
//   username: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
// })

type PostFormProps={
  post?:Models.Document;
}

const PostForm = ({post}:PostFormProps) => {

const {mutateAsync:createPost,isPending:isLoadingCreate}=useCreatePost()

const {user}=useUserContext();

const {toast}=useToast();

const navigate=useNavigate()

 // 1. Define your form.
 const form = useForm<z.infer<typeof PostValidationSchema>>({
    resolver: zodResolver(PostValidationSchema),
    defaultValues: {
      
      caption:post?post?.caption:"",
      file:[],
      location:post?post?.location:"",
      tags:post?post.tags.join(','):""
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PostValidationSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)

    const newPost=await createPost({
      ...values,
      userId:user.id,
    })

    if(!newPost){
      toast({
        title:"Please try again"
      })
    }
navigate('/')

  }


  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
      <FormField
        control={form.control}
        name="caption"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='shad-form_label'>Caption</FormLabel>
            <FormControl>
              <Textarea className='shad-textarea custom-scrollbar' {...field} />
            </FormControl>
            
            <FormMessage className='shad-form_message' />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="file"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='shad-form_label'>Add Photos</FormLabel>
            <FormControl>
              <FileUploader fieldChange={field.onChange} mediaUrl={post?.imageUrl}/>
            </FormControl>
            
            <FormMessage className='shad-form_message' />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='shad-form_label'>Add Location</FormLabel>
            <FormControl>
              <Input type='text' className='shad-input' {...field}/>
            </FormControl>
            
            <FormMessage className='shad-form_message' />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="tags"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='shad-form_label'>Add Tags (Seperated by comma " , ")</FormLabel>
            <FormControl>
              <Input type='text' className='shad-input' placeholder='Art,Expression,Learn' {...field}/>
            </FormControl>
            
            <FormMessage className='shad-form_message' />
          </FormItem>
        )}
      />

      <div className='flex gap-4 items-center justify-end'>
      <Button type="button" className='shad-button_dark_4'>Cancel</Button>
      <Button type="submit" className='shad-button_primary whitespace-nowrap'>Submit</Button>

      </div>
    </form>
  </Form>
  )
        }

export default PostForm
