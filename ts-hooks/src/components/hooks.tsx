import { useState, useEffect, useCallback} from "react"
import MemoizedFibonacci from "./Fib"

interface User {
  id: number,
  username: string,
}

const Hooks = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [user, setUser] = useState<string>("")
    const [num, setNum] = useState<number>(0);
    const [fib, setFib] = useState<number | null>(null)
// useCallback is pretty much useless here as the function is rebuilt evertime regardless, so whenever
// an event is dependent on state, do not use useCallback
    const formUserSubmitHandler = useCallback( (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      setUsers([...users, { id: Math.random(), username: user }])
      setUser("")
    }, [user, users])

    const formNumberSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      if(num > 0) setFib(num)
      else setFib(null)
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
      <form onSubmit={formUserSubmitHandler}>
        <input type="text" placeholder="Please enter user" value={user} onChange={(e) => setUser(e.target.value)}/>
        <button>Submit</button>
      </form>
      <div>
        {users?.map((user: User) => {return <h1 key={user.id}>{user.username}</h1>})}
      </div>
      <form onSubmit={formNumberSubmitHandler}>
        <input type="number" value={num} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNum(Number(e.target.value))}/>
        <button>Submit</button>
      </form>
      <div>
        {fib !== null && <MemoizedFibonacci n={fib}/>}
      </div>
    </div>
  )
}

export default Hooks