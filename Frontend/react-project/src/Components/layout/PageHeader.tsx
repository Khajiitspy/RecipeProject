interface Props {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: Props) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold dark:text-white text-slate-900">{title}</h1>
      {subtitle && (
        <p className="text-slate-500 mt-2">{subtitle}</p>
      )}
    </div>
  );
}
