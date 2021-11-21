import { useState } from 'react'
import { sortBy } from 'sort-by-typescript'
import User from '../components/User'
import IUser from '../interfaces/IUser'

// you can adopt a simple strategy: use interfaces to describe objects, use types for everything else.
type IProps = {
  users: IUser[]
}

// const UsersList = ({ users }: IProps): JSX.Element => {
const UsersList: React.FC<IProps> = ({ users }): JSX.Element => {
  const [query, setQuery] = useState<string>('')
  const showingUsers: IUser[] =
    query === ''
      ? users
      : users.filter((u: IUser): boolean => {
          const name: string = u.name.first + ' ' + u.name.last
          return name.toLowerCase().includes(query.trim().toLowerCase())
        })
  return (
    <div className="list-users">
      <div className="list-users-top">
        <input
          className="search-users"
          type="text"
          placeholder="Search Users"
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
            const value: string = e.target.value
            setQuery(value)
          }}
        />
      </div>
      {showingUsers.length !== users.length && (
        <div className="showing-users">
          <span>
            Now showing {showingUsers.length} of {users.length}
          </span>
          <button
            onClick={() => {
              setQuery('')
            }}
          >
            Show all
          </button>
        </div>
      )}
      <div className="row users-container">
        {showingUsers &&
          showingUsers.sort(sortBy('name.first')).map(
            (user: IUser): JSX.Element => (
              <div className="col-12 col-md-6" key={user.login.uuid}>
                <User user={user} />
              </div>
            )
          )}
      </div>
    </div>
  )
}

export default UsersList
