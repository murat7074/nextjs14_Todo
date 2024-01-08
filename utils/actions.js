"use server"

import { revalidatePath } from "next/cache";
import prisma from "./db";
import { redirect } from "next/navigation";
import {z} from "zod"

export const getAllTasks = async ()=>{

  return await prisma.task.findMany({
    orderBy:{
      createdAt:"desc"
    },
  });

}

export const createTask = async (formData)=>{

const content = formData.get("content")  //  "get("content")" form daki "name" ile uyuşmalı
// console.log(content);
await prisma.task.create({
  data:{
    content,
  }
})

revalidatePath("/task")  // prisma yı güncelledikten sonra sayfamızın yeniden yüklenmesi lazım. yoksa son güncellemeri göremeyiz


}


//TaskFormCustom ve createTaskCustom ile error leride control edebiliyoruz
export const createTaskCustom = async (prevState, formData) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));  // pending durumunu görmek için 2 sn geciktiriyoruz.

  const content = formData.get('content');
  const Task = z.object({
    content: z.string().min(5),  // "content" en az 5 karakter den oluşacak yaksa hata veriyor.
  });
  try {
    Task.parse({ content });
    await prisma.task.create({
      data: {
        content,
      },
    });
    revalidatePath('/tasks');
    return { message: 'success' };
  } catch (error) {
    console.log(error);
    return { message: 'error' };
  }
};


export const deleteTask = async (formData)=>{

const id = formData.get("id") 
// console.log(id);
await prisma.task.delete({
  where:{
    id,
  }
})

revalidatePath("/task")  // prisma yı güncelledikten sonra sayfamızın yeniden yüklenmesi lazım. yoksa son güncellemeri göremeyiz


}

export const getTask = async (id) => {
  return prisma.task.findUnique({
    where: {
      id,
    },
  });
};
export const editTask = async (formData) => {
  const id = formData.get('id');
  const content = formData.get('content');
  const completed = formData.get('completed');

  await prisma.task.update({
    where: {
      id,
    },
    data: {
      content,
      completed: completed === 'on' ? true : false,
    },
  });
  redirect('/tasks');
};
