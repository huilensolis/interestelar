import { SignInForm } from './components/form'

export default function SignInPage(): React.JSX.Element {
  return (
    <article className="w-full h-full flex flex-col gap-4 justify-center items-center px-5">
      <h1 className="text-3xl font-bold text-balance text-center text-neutral-700">
        Sign In
      </h1>
      <SignInForm />
    </article>
  )
}
