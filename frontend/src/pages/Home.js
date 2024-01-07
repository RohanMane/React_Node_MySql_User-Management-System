import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {

    const [users, setUsers] = useState([])
    useEffect(() => {
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
        axios.get('http://localhost:8080/users')
        .then(res => setUsers(res.data))
        .catch(err => console.log(err));
    }, [])

    const handleDelete = async (id) => {
      try{
        await axios.delete('http://localhost:8080/user/'+id)
        window.location.reload()
      }
      catch(err){
        console.log(err);
      }
    }

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Username</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
                users.map((data, i) => (
                    <tr key={i}>
                            <td>{i+1}</td>
                            <td>{data.name}</td>
                            <td>{data.email}</td>
                            <td>{data.username}</td>
                            <td>
                              <Link to={`/viewuser/${data.id}`} className="btn btn-primary mx-2">View</Link>
                              <Link to={`/edituser/${data.id}`} className="btn btn-outline-primary mx-2">Edit</Link>
                              <button className="btn btn-danger mx-2" onClick={ e => handleDelete(data.id)}>Delete</button>
                            </td>
                        </tr>
                ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
