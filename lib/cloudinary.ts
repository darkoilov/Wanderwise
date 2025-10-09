export async function uploadToCloudinary(file: File): Promise<string> {
    const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET
    if (!cloud || !preset) throw new Error("Cloudinary env vars missing")

    const fd = new FormData()
    fd.append("file", file)
    fd.append("upload_preset", preset)

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, {
        method: "POST",
        body: fd,
    })
    if (!res.ok) throw new Error("Upload failed")

    const json = await res.json()
    return json.secure_url as string
}
