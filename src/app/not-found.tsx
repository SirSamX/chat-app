import Link from "next/link"
 
export default function NotFound() {
  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <h2 className="text-5xl">404 Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}