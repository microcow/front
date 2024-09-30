export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
   <html>
     <body>
      {children}
        <h1>layout</h1>
      </body>
    </html>
  )
}
