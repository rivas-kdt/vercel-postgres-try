export default async function TagImage({params}) {
    const { id } = await params
    console.log(id)
    return (
        <div>
            {id}
        </div>
    )
}