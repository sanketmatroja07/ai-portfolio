import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  id?: string;
  className?: string;
  dark?: boolean;
}

export function SectionWrapper({
  children,
  title,
  subtitle,
  id,
  className,
  dark,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 lg:py-24",
        dark && "bg-zinc-50 dark:bg-zinc-900/50",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="mb-12">
            {title && (
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
