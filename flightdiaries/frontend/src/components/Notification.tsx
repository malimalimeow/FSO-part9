import type { Message } from "../type";
import { useEffect } from "react";
import "../general.css";

interface NotiProps {
  message: Message;
  setMessage: React.Dispatch<React.SetStateAction<Message>>;
}

const initialMessage = {
  message: "",
  isError: true,
};

export const Notification = ({ message, setMessage }: NotiProps) => {
  useEffect(() => {
    if (message === initialMessage) {
      return;
    }

    const timer = setTimeout(() => {
      setMessage(initialMessage as Message);
    }, 5000);

    return () => clearTimeout(timer);
  }, [message, setMessage]);

  if (message === initialMessage) {
    return;
  }

  return (
    <div>
      <p
        style={{ marginTop: 10, marginBottom: 10 }}
        className={message.isError === true ? "error" : "success"}
      >
        {message.message}
      </p>
    </div>
  );
};
