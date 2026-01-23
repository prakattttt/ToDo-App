import { FaUser } from "react-icons/fa"

const User = ({ user }) => {
  return (
    <div className="absolute top-0 left-0 m-8 py-3 px-5 bg-black text-white center cursor-pointer rounded-3xl" >
          <FaUser className="mr-2" />
          {user}
        </div>
  )
}

export default User;