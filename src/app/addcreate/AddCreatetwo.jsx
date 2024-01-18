"use client"
import { useFormContext } from '@/context/Userinitial';
import useCreatePost from '@/hook/CreatePost';
import { Button, FormControl, FormGroup, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

const AddCreatetwo = () => {
  const { state, formdataupdate } = useFormContext();
  const { isLoading, handleCreatePost } = useCreatePost();
  const {
    register,
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: state,
  });

  const onsubmitform = async (data) => {
    console.log(data);
    await handleCreatePost(data);
    formdataupdate(data);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    formdataupdate({
      [name]: value,
    });
    setValue(name, value);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex flex-col w-full mt-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black">Find your perfect developer</h1>
          <span className="text-gray-400 font-light">Get your job posting seen by thousand of job seekers.</span>
        </div>
        <div className="border border-gray-300 w-full p-2 rounded-md">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-black">Job Details</span>
            <span className="text-gray-400 font-light">Provide a job description and details</span>
          </div>
          <form onSubmit={handleSubmit(onsubmitform)} className="mt-8 w-full">
            <FormGroup>
              <FormControl className="mb-4">
                <TextField
                  id="standard-multiline-static"
                  placeholder="Javascript react nextjs vb."
                  multiline
                  type="text"
                  {...register("responsibilities")}
                  name="responsibilities"
                  rows={4}
                  onChange={handleChange}
                  defaultValue="Default Value"
                  variant="standard"
                />
              </FormControl>
              <Button type="submit" color="secondary" variant="outlined">
                Create Post
              </Button>
            </FormGroup>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCreatetwo;
