import { useState, useEffect } from 'react'
import axios from 'axios'

import UsersList from './containers/UsersList'
import Form from './components/Form'
import IUser from './interfaces/IUser'
import Loading from './components/Loading'

function App() {
  const [users, setUsers] = useState<IUser[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = async (numberOfUsers: number = 1) => {
    try {
      setLoading(true)
      const response = await axios.get(
        `https://randomuser.me/api/?results=${numberOfUsers}&nat=us,ca&noinfo`
      )
      const users = response.data.results
      setUsers(users)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError((error as Error).message)
    }
  }

  useEffect(() => {
    const fetchData: () => Promise<void> = async () => {
      await fetchUsers()
    }
    fetchData()
  }, [])

  return (
    <div className="App">
      <header className="App-header">Users List</header>
      <main>
        <Form onSubmit={fetchUsers} />
        {loading && <Loading />}
        {!loading && users && <UsersList users={users} />}
        {!loading && error && <h4 className="error">{error}</h4>}
      </main>
    </div>
  )
}

export default App
