
import { revalidatePath } from 'next/cache'
import '../../globals.css'

type User = {
    avatar: String
    createdAt: String
    id: String
    name: String
}

export default async function UserServer() {
    const res = await (await fetch('https://6740236cd0b59228b7eeca93.mockapi.io/practice-1/users')).json()

    async function addUser(formData: FormData) {
        'use server'
        const name = formData.get('name');
        const res = await fetch('https://6740236cd0b59228b7eeca93.mockapi.io/practice-1/users', {
            method: 'post',
            body: JSON.stringify({ name }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        let result = await res.json()
        console.log('res', result)
        console.log('formData', formData.get('name'))
        revalidatePath('userServer')
    }

    console.log(res);
    return (
        <div>
            <div>
                <form action={addUser}>
                    <div>

                        <input type="text" className='border-2 ' placeholder='search' name='name' />
                    </div>
                    {/* <button type='submit' className='butt'>submit</button> */}
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div>
            <div className='grid grid-cols-4 gap-4 py-10'>
                {res.map((user: User) => {
                    return (
                        <div className="flex p-4 shadow-md rounded-lg text-gray-700">
                            <h2> {user.name} ({user.id}) </h2>
                        </div>)
                })}
            </div>
        </div>)
}