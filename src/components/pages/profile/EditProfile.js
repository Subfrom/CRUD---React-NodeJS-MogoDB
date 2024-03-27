import React, { useEffect,useState } from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Updateprofile } from '../../../functions/user';

const EditProfile = () => {
    const { user } = useSelector((state) => ({ ...state }));

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        username: "",
        id: "",
    });

    useEffect(() => {
        setForm({
            email: user.user.email,
            username: user.user.username,
            id: user.user.id,
        });
    }, [user]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log(form);

        Updateprofile(user.user.token, form).then((res) => {
            // console.log(res);
            navigate("/profile");
        })
        .catch((error) => {
            console.log(error);
        }
        );
    };

    return (
      <div className="container">
        <div className="row">
          <div className="card mt-5">
            <div className="card-body">
              <h4 className="card-title">Profile</h4>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3 row">
                  <label htmlFor="email" className="col-sm-2 col-form-label">
                    Email
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      readOnly
                      className="form-control-plaintext"
                      name="email"
                      value={form.email}
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label htmlFor="username" className="col-sm-2 col-form-label">
                    Username
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control-plaintext"
                      name="username"
                      onChange={handleChange}
                      value={form.username}
                    />
                  </div>
                </div>
                <p className="card-text">Role: {user.user.role}</p>
                <input type="hidden" name="id" value={user.user.id} />
                <button type="submit" className="btn btn-success">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
}

export default EditProfile