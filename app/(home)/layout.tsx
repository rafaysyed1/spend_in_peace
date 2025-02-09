import MouseMoveEffect from "@/components/mouse-move-effect"

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <MouseMoveEffect />
      {children}
    </>
  )
}