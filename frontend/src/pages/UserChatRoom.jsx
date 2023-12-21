import React, { useEffect, useState } from "react";
import c from "../c";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { APIrequest } from "../store/apiSlice";
import { setTargetPage } from "../store/curtainSlice";
import { useDispatch } from "react-redux";
import io from "socket.io-client";

export default function ChatRoom() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const socket = io.connect(c.BaseUrl);

  function handleGetChat(data, isOk) {
    if (isOk) {
      console.log(data);
      const filteredChats = data.obj.filter(
        (chat) => chat.user_chat_room_id === +id
      );
      setChats(filteredChats);
      socket.emit("send_message", { chats: filteredChats, room: +id });
    } else {
      console.log(data);
    }
  }

  function handlePostChat(data, error) {
    if (data) {
      console.log(data);
      dispatch(
        APIrequest({
          method: "GET",
          apiEndpoint: `${c.BaseUrl}/userChat`,
          options: {
            headers: {
              Authorization: `Bearer ${localStorage.token}`,
            },
          },
          callback: handleGetChat,
        })
      );
    } else {
      console.log(data);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      APIrequest({
        method: "POST",
        apiEndpoint: `${c.BaseUrl}/userChat`,
        options: {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
          data: {
            message: message,
            user_chat_room_id: +id,
          },
        },
        callback: handlePostChat,
      })
    );
    setMessage("");
  }

  useEffect(() => {
    console.log(+id);
    socket.emit("join_room", +id); // use params id of a page for this
  }, []);

  useEffect(() => {
    socket.on("receive_message", (newChats) => {
      setChats(newChats);
    });
  }, [socket]);

  useEffect(() => {
    dispatch(
      APIrequest({
        method: "GET",
        apiEndpoint: `${c.BaseUrl}/userChat`,
        options: {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        },
        callback: handleGetChat,
      })
    );
  }, [dispatch]);

  return (
    <main>
      <div className="panel mid">
        <h1>{id}</h1>
        {chats.length === 0 ? (
          <p>Loading or no data</p>
        ) : (
          <>
            <ul>
              {chats.map((chat) => (
                <li className="panel" key={chat.id}>
                  {chat.message}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      {/* <form onSubmit={handleSubmit}>
        <label htmlFor="message">New Message:</label>
        <input
          type="text"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form> */}

      <div className="v-flex panel mid">
        <h1 className="t">New Message Form</h1>
        <form className="v-flex mt" onSubmit={handleSubmit}>
          <label className="h-flex">
            Name:
            <input
              type="text"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </label>
          <button type="submit">Send</button>
        </form>
      </div>
    </main>
  );
}
