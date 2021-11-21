import { useState } from 'react'

type IProps = {
  onSubmit: (numberOfUsers: number) => void
}

const Form: React.FC<IProps> = ({ onSubmit }) => {
  const [count, setCount] = useState(1)

  return (
    <form
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        onSubmit(count)
      }}
      className="number-of-users-form"
    >
      <div className="form-group">
        <label htmlFor="number-of-users">Number of users</label>
        <input
          type="number"
          value={count}
          min="1"
          max="200"
          onChange={(event) => setCount(+event.target.value)}
          id="number-of-users"
          className="form-control"
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Fetch Users
        </button>
      </div>
    </form>
  )
}

export default Form
