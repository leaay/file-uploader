import React, { Dispatch, SetStateAction } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form,FormControl,FormField,FormItem} from "@/components/ui/form"
import { Input } from "./ui/input";
import { Search } from "lucide-react";

const formSchema = z.object({
    query: z.string().min(0).max(50),
  })

interface prop {
    setQuery: Dispatch<SetStateAction<string | undefined>>
}


const SearchBar: React.FC<prop> = ({setQuery}) => {


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          query:"",
        },
      })

      function onSubmit(values: z.infer<typeof formSchema>) {

        values.query === '' ? 
        setQuery(undefined) :
        setQuery(values.query)

      }

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className="pr-10" placeholder="Search for file" {...field} />
              </FormControl>
              
            </FormItem>
          )}
        />
        <Button className="transform -translate-x-full" size={"icon"} variant={"ghost"} type="submit"><Search width={'20px'} height={'20px'} /></Button>
      </form>
    </Form>
  );
};

export default SearchBar;