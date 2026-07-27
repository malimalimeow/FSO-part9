import type { DiaryFormValues, Message } from "../type";
import { Weather, Visibility } from "../type";
import { useState } from "react";

interface AddDiaryProps {
  addDiary: (newDiary: DiaryFormValues) => Promise<void>;
}
export const AddDiary = ({ addDiary }: AddDiaryProps) => {
  const [date, setDate] = useState<string>("");
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Good);
  const [comment, setComment] = useState<string>("");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newDiary = {
      date: date,
      weather: weather,
      visibility: visibility,
      comment: comment,
    };

    await addDiary(newDiary);

    setDate("");
    setWeather(Weather.Sunny);
    setVisibility(Visibility.Good);
    setComment("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>date: </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            autoFocus
          />
        </div>

        <div>
          <label>weather:</label>
          <select
            name="weather"
            id="weather"
            onChange={(e) => setWeather(e.target.value as Weather)}
          >
            {Object.values(Weather).map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>visibility:</label>
          <select
            name="visibility"
            id="visibility"
            onChange={(e) => setVisibility(e.target.value as Visibility)}
          >
            {Object.values(Visibility).map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>comment:</label>
          <input
            type="text"
            value={comment}
            placeholder="Any comment"
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add diary</button>
      </form>
    </div>
  );
};
