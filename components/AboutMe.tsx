export default function AboutMe() {
  return (
    <section id="about" className="w-full px-4 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto flex min-h-[42vh] max-w-5xl items-center justify-center text-center">
        <p
          className="max-w-4xl text-[clamp(1.6rem,3.4vw,2.35rem)] font-normal leading-[1.3] text-white normal-case"
          style={{ fontFamily: 'var(--font-fredoka), sans-serif' }}
        >
          I&rsquo;ve always been drawn to clean, thoughtful design and the little details that make
          something feel right. I love exploring new technologies, trying ideas I haven&rsquo;t worked
          with before, and collaborating with people who enjoy building things with the same curiosity.
        </p>
      </div>
    </section>
  );
}
