import { useState, useEffect} from "react"

interface User {
  id: number,
  username: string,
}

const Hooks = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [user, setUser] = useState<string>("")

    const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      const newUser: User = {
        id: Math.random(),
        username: user
      }
      setUsers([...users, newUser])
      setUser("")
    }

    useEffect(() => {
      console.log('mounting')
      console.log("Users: ", users)
      return (): void => {
        console.log('unmounting')
      }
    }, [users])
    
  return (

    <div>
      <form onSubmit={formSubmitHandler}>
        <input type="text" placeholder="Please enter user" value={user} onChange={(e) => setUser(e.target.value)}/>
        <button>Submit</button>
      </form>
      {users?.map((user: User) => {return <h1>{user.username}</h1>})}
    </div>
  )
}

export default Hooks