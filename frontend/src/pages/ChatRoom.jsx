import React, { useEffect, useState } from "react";
import c from "../c";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { APIrequest } from "../store/apiSlice";
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
      const filteredChats = data.obj.filter(
        (chat) => chat.chat_room_id === +id
      );
      setChats(filteredChats);
      socket.emit("send_message", { chats: filteredChats, room: -id });
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
          apiEndpoint: `${c.BaseUrl}/chat`,
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
        apiEndpoint: `${c.BaseUrl}/chat`,
        options: {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
          data: {
            message: message,
            chat_room_id: +id,
          },
        },
        callback: handlePostChat,
      })
    );
    setMessage("");
  }

  useEffect(() => {
    console.log(-id);
    socket.emit("join_room", -id); // use params id of a page for this
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
        apiEndpoint: `${c.BaseUrl}/chat`,
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
    <>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          Home
        </button>
        <h1>{id}</h1>
        {chats.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <>
            <ul>
              {chats.map((chat) => (
                <li key={chat.id}>{chat.message}</li>
              ))}
            </ul>
          </>
        )}
        <form onSubmit={handleSubmit}>
          <label htmlFor="message">New Message:</label>
          <input
            type="text"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </>
  );
}
