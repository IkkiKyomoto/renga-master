export default function TsukekuLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div>
            <h1>付句する</h1>
            {children}
        </div>
    );
  }