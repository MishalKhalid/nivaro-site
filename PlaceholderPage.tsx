import { Logo } from "./ui/Logo";

export function PlaceholderPage({ title, body }: { title: string; body: string }) {
  return (
    <main id="main" className="container-site flex min-h-screen flex-col justify-center py-24">
      <a href="/" className="mb-16 w-fit rounded-lg" aria-label="NIVARO home">
        <Logo />
      </a>
      <h1 className="text-4xl font-semibold text-ink md:text-6xl">{title}</h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{body}</p>
      <a href="/" className="mt-10 inline-flex min-h-[44px] w-fit items-center text-teal underline underline-offset-4">
        Back to the homepage
      </a>
    </main>
  );
}
