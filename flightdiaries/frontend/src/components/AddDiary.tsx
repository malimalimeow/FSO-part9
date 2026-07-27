import type { DiaryFormValues } from "../type";
import { Weather, Visibility } from "../type";
import { useState } from "react";

interface AddDiaryProps {
  addDiary: (newDiary: DiaryFormValues) => Promise<void>;
}
export const AddDiary = ({ addDiary }: AddDiaryProps) => {
  const [date, setDate] = useState<string>("");
  const [weather, setWeather] = useState<Weather | undefined>(undefined);
  const [visibility, setVisibility] = useState<Visibility | undefined>(
    undefined,
  );
  const [comment, setComment] = useState<string>("");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newDiary = {
      date: date,
      weather: weather as Weather,
      visibility: visibility as Visibility,
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

          <fieldset>
            {Object.values(Weather).map((w) => (
              <span key={w}>
                <input
                  type="radio"
                  id={w}
                  name="weather"
                  value={w}
                  onChange={(e) => setWeather(e.target.value as Weather)}
                  required
                />
                <label>{w}</label>
              </span>
            ))}
          </fieldset>
        </div>

        <div>
          <label>Visibility:</label>

          <fieldset>
            {Object.values(Visibility).map((v) => (
              <span key={v}>
                <input
                  type="radio"
                  id={v}
                  name="visibility"
                  value={v}
                  onChange={(e) => setVisibility(e.target.value as Visibility)}
                  required
                />
                <label>{v}</label>
              </span>
            ))}
          </fieldset>
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
