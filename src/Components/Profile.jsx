import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import {
  doc,
  getFirestore,
  setDoc,
  Timestamp,
  collection,
  getDocs,
  getDoc,
  onSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
const db = getFirestore();

const Profile = () => {
  //profile

  const { logout } = useAuth();
  const { currentUser } = useAuth();
  const { upload, uploadDocument, getCurrentUserData } = useAuth();

  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const [photoURL, setPhotoURL] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxWOiCjX_WYII3f_hH7lCwAUDEMla9q5BCWQ&usqp=CAU"
  );

  const [profileData, setProfileData] = useState(null);
  //docs

  const [select, setSelect] = useState();
  const [document, setDocument] = useState(null);
  // const [docname,setdocName] = useState("");
  const id = currentUser?.id;

  const handleDocsChange = (e) => {
    let file = e.target.files[0];
    if (file) {
      let sizeOfFile = e.target.files[0].size;
      let v = sizeOfFile / 1048576;
      console.log("size of file " + v + "mb");
      if (v > 5) {
        alert("File size should be less then 5 Mb");
        e.target.value = null;
        return;
      } else setDocument(file);
    }
  };

  const handelDocumentSubmit = () => {
    let isInArray =
      profileData?.documents?.find(function (el) {
        return el.title === select;
      }) !== undefined;
    console.log(isInArray);
    if (!isInArray) {
      console.log("uploading.....");
      uploadDocument(document, select, currentUser);
    } else {
      alert("Document already exists please delete first one");
    }
  };

  const handleDelete = () => {};

  const handleChange = (e) => {
    let file = e.target.files[0];
    const fileExtension = file.name.split(".").at(-1);
    const allowedFileTypes = ["jpg", "png"];
    if (!allowedFileTypes.includes(fileExtension)) {
      window.alert(
        `File does not support ${fileExtension} Files type must be ${allowedFileTypes.join(
          ", "
        )}`
      );
      return false;
    }

    if (file) {
      setPhoto(file);
    }
  };
  const handleSubmit = () => {
    upload(photo, currentUser, setLoading);
  };

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
      getCurrentUserData(currentUser.uid, setProfileData);
    }
  }, [currentUser]);

  return (
    <div>
      <p>Email : {currentUser && currentUser.email} </p>
      <p>Id : {currentUser && currentUser.uid}</p>
      <div>
        {/* {console.log(profileData)} */}
        {profileData && (
          <div>
            {/* <p>{profileData.uid}</p>
            <p>{profileData.email}</p> */}
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>URL</th>
                  <th>Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {profileData.documents?.map((value, index) => {
                  return (
                    <tr key={index}>
                      <td>{value.title}</td>
                      <td>
                        {
                          <a href={value.url} target="_blank">
                            view
                          </a>
                        }
                      </td>
                      <td>{value.date}</td>
                      <td>
                        <button onClick={handleDelete}>Delete</button>
                      </td>
                    </tr>
                  );
                })}
                {/* <p>{JSON.stringify(profileData.documents)}</p> */}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <input type="file" onChange={handleChange} />
      <button type="submit" disabled={loading || !photo} onClick={handleSubmit}>
        Upload
      </button>
      <button onClick={logout}>Log Out</button>
      <img
        src={photoURL}
        alt="image"
        style={{ width: "80px", height: "auto", borderRadius: "50%" }}
      />

      <div>
        <p>{select}</p>
        <select value={select} onChange={(e) => setSelect(e.target.value)}>
          <option value="" default>
            select Docs type
          </option>
          <option>Resume</option>
          <option>Passport</option>
          <option>Adhaar</option>
          <option>Letter Of Recommandation</option>
        </select>

        <input type="file" onChange={handleDocsChange} />

        <button type="submit" onClick={handelDocumentSubmit}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default Profile;

// getDoc(docref).then((doc) => {
// console.log(doc.data(), doc.id);
// setProfileData(doc.data());
// console.log("THis is profile data");
// console.log(profileData);
// });
// console.log(profileData[0].arrayExample[1]);
// onSnapshot(docref, (doc) => {
//   console.log(doc.data(), doc.id);
//   setProfileData(doc.data());
// });

{
  /* <div>
  {users.map((user) => (
    <div key={user.uid}>
      <h2>{user.email}</h2>
      <p>Phone number: {user.phoneNumber || "N/A"}</p>
      <h3>Documents:</h3>
      <ul>
        {Object.values(user.documents).map((doc) => (
          <li key={doc.title}>
            <a href={doc.url} target="_blank" rel="noopener noreferrer">
              {doc.title}
            </a>
            <span> - {doc.date}</span>
          </li>
        ))}
      </ul>
    </div>
  ))}
</div>; */
}

// const docref = doc(db, "users", "nqjNBF6Q0rYrdt3JWlDZbB8pMh42");

// const getposts = [];

// onSnapshot(docref, (doc) => {
//   // console.log(doc.data());
//   if (doc.exists()) {
//     getposts.push({ ...doc.data() });
//   } else {
//     console.log("No such document");
//   }
// });
// console.log(getposts);
// setProfileData(getposts);
// console.log(profileData);
