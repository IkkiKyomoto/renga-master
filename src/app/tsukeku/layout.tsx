export default function TsukekuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <h1 className="text-center text-3xl font-bold mb-6 mt-6">付句する</h1>
      {children}
    </div>
  );
}
