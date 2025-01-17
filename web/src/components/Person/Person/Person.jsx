import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import 'src/lib/formatters'

const DELETE_PERSON_MUTATION = gql`
  mutation DeletePersonMutation($id: Int!) {
    deletePerson(id: $id) {
      id
    }
  }
`

const Person = ({ person }) => {
  const [deletePerson] = useMutation(DELETE_PERSON_MUTATION, {
    onCompleted: () => {
      toast.success('Person deleted')
      navigate(routes.people())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete person ' + id + '?')) {
      deletePerson({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Person {person.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{person.id}</td>
            </tr>
            <tr>
              <th>Role</th>
              <td>{person.role}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{person.name}</td>
            </tr>
            <tr>
              <th>Time off</th>
              <td>{person.timeOff}</td>
            </tr>
            <tr>
              <th>Max hours per week</th>
              <td>{person.maxHoursPerWeek}</td>
            </tr>
            <tr>
              <th>Photo</th>
              <td>{person.photo}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editPerson({ id: person.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(person.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Person
