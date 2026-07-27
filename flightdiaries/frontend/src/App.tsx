import { useState, useEffect } from "react";
import diariesServices from "./services/diariesServices";
import type { Diary, DiaryFormValues, Message } from "./type";
import { AllDiaries } from "./components/AllDiaries";
import { AddDiary } from "./components/AddDiary";
import { Notification } from "./components/Notification";
import axios from "axios";
import "./general.css";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [message, setMessage] = useState<Message>({
    message: "",
    isError: true,
  });

  useEffect(() => {
    const getAllDiaries = async () => {
      try {
        const allDiaries = await diariesServices.getAll();
        setDiaries(allDiaries);
        setMessage({ message: "All dairies loaded", isError: false });
      } catch (error) {
        let errorMsg = "something is going wrong.";
        if (axios.isAxiosError(error)) {
          const errorResponse = error.response?.data?.error?.[0]?.message;
          if (errorResponse) {
            errorMsg = errorResponse;
          }
        }
        setMessage({
          message: `Error: ${errorMsg} `,
          isError: true,
        });
      }
    };
    getAllDiaries();
  }, []);

  const addDiary = async (newDiary: DiaryFormValues) => {
    try {
      const addedDiary = await diariesServices.create(newDiary);
      setDiaries((prev: Diary[]) => prev.concat(addedDiary));
      setMessage({ message: "Added a new diary", isError: false });
    } catch (error) {
      let errorMsg = "something is going wrong.";
      if (axios.isAxiosError(error)) {
        const errorResponse = error.response?.data?.error?.[0]?.message;
        if (errorResponse) {
          errorMsg = errorResponse;
        }
      }
      setMessage({
        message: `Error: ${errorMsg} `,
        isError: true,
      });
    }
  };

  return (
    <div>
      <h1>Add new dairy</h1>
      <Notification message={message} setMessage={setMessage} />
      <AddDiary addDiary={addDiary} />
      {diaries.length !== 0 && <h1>Flight Diaries</h1>}
      <AllDiaries diaries={diaries} />
    </div>
  );
};

export default App;
