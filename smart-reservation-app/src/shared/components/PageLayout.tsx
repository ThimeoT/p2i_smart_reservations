export default function PageLayout({children} : {children : React.ReactNode}){
  return(
    <div className="mx-8 md:mx-auto md:max-w-5xl">
      {children}
    </div>
  )
}