import type { Redirect } from 'next'
import type { ReactNode } from 'react'

export default function AuthLayout({
  children,
}: {
  children: ReactNode
}): React.JSX.Element | Redirect {
  // const cookiesJwt = cookies().get('jwt')
  // if (cookiesJwt) {
  //   try {
  //     // const { isTokenValid } = await validateToken(cookiesJwt)
  //     // if (isTokenValid) {
  //     //   throw new Error('token valid')
  //     // }
  //   } catch (error) {
  //     return redirect(ClientRouting.app().home())
  //   }
  // }

  return (
    <article className="grid grid-cols-2 grid-rows-1 w-full h-full min-h-screen">
      {children}
      <Aside />
    </article>
  )
}

function Aside(): React.JSX.Element {
  return (
    <article className="h-full w-full">
      <img
        src={'/6.gradients.ray.st.png'}
        width={640}
        height={900}
        alt="dark gradient"
        className="w-full h-full object-cover object-center"
      />
    </article>
  )
}
