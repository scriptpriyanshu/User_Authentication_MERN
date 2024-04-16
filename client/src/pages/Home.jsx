import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState("");

  const token = localStorage.getItem("token");

  //-------------------
  // fetching user data
  //-------------------

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:9090/user", {
          method: "GET",
          headers: {
            Authorization: token,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUserData(data.userData.username);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (token) {
      fetchUserData();
    } else {
      navigate('/login')
    }
  }, [token]);
  return (
    <div className=" bg-yellow-400 h-[89.2vh] flex-col flex items-center justify-center gap-4 w-full">
      <div className="flex flex-col h-80 w-2/3 gap-10 rounded-xl justify-center bg-orange-950 items-center">
        <h1 className="text-5xl font-medium text-yellow-400">
          Easy Frontend with{" "}
          <span className="font-extrabold uppercase">{userData}</span>
        </h1>
        <p className="text-center font-medium text-yellow-400 text-xl w-3/4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
          sunt laudantium quisquam expedita voluptatibus exercitationem
          inventore libero aliquam, vel minus excepturi odio cupiditate illum
          voluptatum blanditiis culpa, ducimus deleniti nam? Architecto,
          inventore.
        </p>
      </div>
    </div>
  );
};

export default Home;
