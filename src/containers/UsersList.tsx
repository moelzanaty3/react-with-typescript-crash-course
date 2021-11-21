import User from '../components/User'
import IUser from '../interfaces/IUser'

// you can adopt a simple strategy: use interfaces to describe objects, use types for everything else.
type IProps = {
  users: IUser[]
}

// const UsersList = ({ users }: IProps): JSX.Element => {
const UsersList: React.FC<IProps> = ({ users }): JSX.Element => {
  return (
    <div className="list-users">
      <div className="row users-container">
        {users &&
          users.map(
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
