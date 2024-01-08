/* dinamik routes oluşturma istediğin route altında ==>  [falan] oluştur.
 içinde page.js olsun ve "params.falan" olarak çalıştır
  */
import Link from 'next/link'
import Image from 'next/image'
import drinkImg from './drink.jpg' //static image de ==> "img" ve next "Image" i kıyaslamak için kullanacağız

const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

console.log(drinkImg)
const getSingleDrink = async (id) => {
  const res = await fetch(`${url}${id}`)
  // throw error
  if (!res.ok) {
    throw new Error('Failed to fetch a drink...')
  }

  return res.json()
}

const SingleDrinkPage = async ({ params }) => {
  // http://localhost:3000/drinks/12335  ==> 12335 i alıcaz

  // console.log(params.id)

  const data = await getSingleDrink(params.id)
  const title = data?.drinks[0]?.strDrink
  const imgSrc = data?.drinks[0]?.strDrinkThumb

  return (
    <div>
      <Link href='/drinks' className='btn btn-primary mt-8 mb-12'>
        back to drinks
      </Link>
      {/* remote image de next.js "Image" de width property sini kullanmalısın 
      tabi bu yeterli olmayacak "next.config.js "de bazı değişiklikler yapılmalı
      */}
      <Image
        src={imgSrc}
        width={300}
        height={300}
        priority
        className='w-48 h-48 rounded-lg shadow-lg mb-4'
        alt={title}
      />
      {/* <Image src={drinkImg} alt='drink' className='w-48 h-48 rounded-lg'  /> "static image"*/}
      {/* <img src={drinkImg.src} alt="" />  yavaş yüklüyor ve ".src" yi unutma */}
      <h1 className='text-4xl mb-8'>{title}</h1>
    </div>
  )
}

export default SingleDrinkPage



//   NOT


// // next.config.js   de aşağıdaki gibi güncelle ve server ı yeniden başlat.


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'www.thecocktaildb.com',
//         port: '',
//         pathname: '/images/**',
//       },
//     ],
//   },
// }

// module.exports = nextConfig







