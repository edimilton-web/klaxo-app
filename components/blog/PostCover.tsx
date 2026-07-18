import Image from "next/image"
import { CoverArt } from "./CoverArt"

type Props = {
  slug: string
  title: string
  coverImage?: string
  className?: string
  logoSize?: number
  sizes?: string
  priority?: boolean
}

export function PostCover({ slug, title, coverImage, className, logoSize, sizes, priority }: Props) {
  if (!coverImage) {
    return <CoverArt slug={slug} className={className} logoSize={logoSize} />
  }

  return (
    <>
      <Image
        src={coverImage}
        alt={title}
        fill
        priority={priority}
        sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
        className={className ? `${className} object-cover` : "object-cover"}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
    </>
  )
}
