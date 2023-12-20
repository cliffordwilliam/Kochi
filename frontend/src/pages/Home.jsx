import React, { useEffect, useState } from "react";
import c from "../c";
import { useNavigate } from "react-router-dom";
import { APIrequest } from "../store/apiSlice";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [chatRooms, setChatRooms] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    dispatch(
      APIrequest({
        method: "GET",
        apiEndpoint: `${c.BaseUrl}/userChatRoom`,
        options: {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        },
        callback: handleGetChatRoom,
      })
    );
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(
      APIrequest({
        method: "POST",
        apiEndpoint: `${c.BaseUrl}/userChatRoom`,
        options: {
          data: {
            name: formData.name,
          },
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        },
        callback: handlePostUserChatRoom,
      })
    );
  };

  function handlePostUserChatRoom(data, isOk) {
    if (isOk) {
      console.log(data, "HOME POST USER ROOM");
      dispatch(
        APIrequest({
          method: "GET",
          apiEndpoint: `${c.BaseUrl}/userChatRoom`,
          options: {
            headers: {
              Authorization: `Bearer ${localStorage.token}`,
            },
          },
          callback: handleGetChatRoom,
        })
      );
    } else {
      console.log(data);
    }
  }

  function handleGetChatRoom(data, isOk) {
    if (isOk) {
      console.log(data, "HOME GET USER ROOM");
      setChatRooms(data.obj);
    } else {
      console.log(data);
    }
  }

  const handleHeadline = (data, isOk) => {
    if (isOk) {
      console.log(data.articles, "HOME HEADER");
      setHeaders(data.articles);
    } else {
    }
  };

  const handleRoom = (data, isOk) => {
    if (isOk) {
      console.log(data.obj, "HOME ROOM");
      setRooms(data.obj);
    } else {
    }
  };

  function handleRoomEnter(e, id) {
    e.preventDefault();
    navigate(`/chatRoom/${id}`);
  }

  function handleUserRoomEnter(e, id) {
    e.preventDefault();
    navigate(`/userChatRoom/${id}`);
  }

  useEffect(() => {
    dispatch(
      APIrequest({
        method: "GET",
        apiEndpoint: `https://newsapi.org/v2/everything?q=anime&pageSize=10&page=1&apiKey=7288b0143d664745b3c6c0a004fe780f`,
        callback: handleHeadline,
      })
    );

    dispatch(
      APIrequest({
        method: "GET",
        apiEndpoint: `${c.BaseUrl}/chatRoom`,
        options: {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        },
        callback: handleRoom,
      })
    );
  }, []);

  return (
    <>
      <main>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
        {headers && headers.length && rooms && rooms.length > 0 && (
          <div>
            {rooms.map((room) => (
              <div key={room.id}>
                <p>{headers[+room.name].title}</p>
                <button
                  onClick={(e) => {
                    handleRoomEnter(e, room.id);
                  }}
                >
                  Enter
                </button>
              </div>
            ))}
          </div>
        )}

        <h2>Add Room Form</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Submit</button>
        </form>

        {chatRooms && chatRooms.length > 0 && (
          <div>
            {chatRooms.map((userChatRoom) => (
              <div key={userChatRoom.id}>
                <p>{userChatRoom.name}</p>
                <button
                  onClick={(e) => {
                    handleUserRoomEnter(e, userChatRoom.id);
                  }}
                >
                  Enter
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
      <section class="chat-box">
        <div class="container">
          <div class="leftside">
            <div class="header">
              <div class="roomImg">
                <img src="assets/image/female1.png" alt="" class="cover" />
              </div>
              <ul class="nav-icons">
                <li>
                  <i class="fa-regular fa-circle-xmark"></i>
                </li>
                <li>
                  <i class="fa-regular fa-comment"></i>
                </li>
                <li>
                  <i class="fa-solid fa-bars"></i>
                </li>
              </ul>
            </div>
            <div class="search-chat">
              <div>
                <input type="text" placeholder="search" />
                <i class="fa-solid fa-magnifying-glass"></i>
              </div>
            </div>
            {chatRooms && chatRooms.length > 0 && (
              <div class="chatlist">
                {chatRooms.map((userChatRoom) => (
                  <div key={userChatRoom.id} class="block">
                    <div class="imgbx">
                      <img
                        src="https://media.discordapp.net/attachments/1154740258173370372/1186236859274240150/animegenius_73a2183ef143f2154fbe076510cc96fb.png?ex=6592842a&is=65800f2a&hm=e9325b7a6658b8bbdd70ac78fbdd290a89c9c7ebe8c4a3ca4520472814348dc3&=&format=webp&quality=lossless&width=1024&height=1024"
                        alt=""
                        class="cover"
                      />
                    </div>
                    <div class="details">
                      <div class="listhead">
                        <h4>{userChatRoom.name}</h4>
                      </div>
                      <div class="message-p">
                        <p>
                          Place where we chill and talk more about anime info
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div class="rightside">
            <div class="header">
              <div class="imgtext">
                <img
                  src="https://media.discordapp.net/attachments/1154740258173370372/1186236859274240150/animegenius_73a2183ef143f2154fbe076510cc96fb.png?ex=6592842a&is=65800f2a&hm=e9325b7a6658b8bbdd70ac78fbdd290a89c9c7ebe8c4a3ca4520472814348dc3&=&format=webp&quality=lossless&width=1024&height=1024"
                  alt=""
                  class="cover"
                />
              </div>
              <div class="category">
                <h1>Anime</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                  numquam distinctio quibusdam blanditiis nihil, labore ratione
                  fugiat dolores ad, commodi nobis officia delectus beatae rerum
                  molestias natus dolore alias cupiditate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
