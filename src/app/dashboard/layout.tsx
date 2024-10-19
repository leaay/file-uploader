export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <main className="flex">
        <div className="p-8">clas</div>
        {children}
        </main>
    );
  }
  