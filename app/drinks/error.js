"use client"

/* error.js client olmalı "use client" kullan */
const error = (error) => {

 /*  page.js deki bu hatayı yakalıyoruz
  if(!response.ok){
    throw new Error("Failed to fetch drinks")
  } */
 console.log(error);
  return (
    <div>
     {error.error.message}
    </div>
  )
}

export default error
