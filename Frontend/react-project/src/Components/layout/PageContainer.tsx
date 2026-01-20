export default function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white px-6 py-10 flex justify-center">
      <div className="w-full max-w-6xl">{children}</div>
    </div>
  );
}
